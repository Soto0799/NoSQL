import { collection } from './database.js';

// Obtener todos los usuarios
export const fetchUsuarios = async () => {
    const usuarios = await collection('usuarios');
    const results = usuarios.find().toArray();
    return results;
}

// Crear un nuevo usuario
export const createUsuario = async (usuario) => {
    const usuarios = await collection('usuarios');
    const result = await usuarios.insertOne(usuario);
    return result;
}

// Buscar un usuario por nombre de usuario
export const fetchUsuario = async (username = '') => {
    const usuarios = await collection('usuarios');
    const result = await usuarios.findOne({ username: { $eq: username } });
    return result;
}

// Actualizar un usuario
export const updateUsuario = async (username, usuario) => {
    const usuarios = await collection('usuarios');
    const result = await usuarios.updateOne(
        { username: username },
        { $set: usuario }
    );
    return result;
}

// Eliminar un usuario
export const removeUsuario = async (username) => {
    const usuarios = await collection('usuarios');
    const result = await usuarios.deleteOne({ username: { $eq: username } });
    return result;
}