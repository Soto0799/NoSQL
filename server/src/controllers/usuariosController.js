import { fetchUsuario, createUsuario, updateUsuario, removeUsuario } from '../repositories/usuariosRepository.js';
import crypto from 'crypto-js';

// Función para obtener todos los usuarios
export const getUsuarios = async () => {
    return await fetchUsuario(); // Llama a la función para obtener los usuarios desde el repositorio
}

// Función para crear un nuevo usuario
export const postUsuario = async (usuario) => {
    // Verificar si el nombre de usuario está presente
    if (!usuario.username) {
        throw new Error('El nombre de usuario es requerido'); // Error si no hay nombre de usuario
    }

    // Verificar si la contraseña está presente
    if (!usuario.password) {
        throw new Error('La contraseña es requerida'); // Error si no hay contraseña
    }

    // Hashear la contraseña antes de guardarla
    usuario.hashPassword = crypto.MD5(usuario.password).toString();
    delete usuario.password; // Eliminar la contraseña en texto plano

    // Verificar si el usuario ya existe
    const existingUsuario = await fetchUsuario(usuario.username);
    if (existingUsuario) {
        throw new Error('El nombre de usuario ya existe'); // Error si el usuario ya existe
    }

    // Crear el nuevo usuario
    const createdUsuario = await createUsuario(usuario);
    const result = {
        'id': createdUsuario.insertedId // Retorna el ID del usuario creado
    };

    return result;
}

// Función para obtener un usuario por nombre de usuario
export const getUsuario = async (username) => {
    return await fetchUsuario(username); // Llama a la función para obtener el usuario específico desde el repositorio
}

// Función para actualizar un usuario
export const putUsuario = async (username, usuario) => {
    // Verificar si el nombre de usuario está presente
    if (!username) {
        throw new Error('El nombre de usuario es requerido'); // Error si no hay nombre de usuario
    }

    // Hashear la nueva contraseña si está presente
    if (usuario.password) {
        usuario.hashPassword = crypto.MD5(usuario.password).toString();
        delete usuario.password; // Eliminar la contraseña en texto plano
    }

    const updatedUsuario = await updateUsuario(username, usuario); // Llama a la función para actualizar el usuario
    return updatedUsuario;
}

// Función para eliminar un usuario
export const deleteUsuario = async (username) => {
    // Verificar si el nombre de usuario está presente
    if (!username) {
        throw new Error('El nombre de usuario es requerido'); // Error si no hay nombre de usuario
    }

    const deletedUsuario = await removeUsuario(username); // Llama a la función para eliminar el usuario
    return deletedUsuario;
}