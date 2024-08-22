
import { collection } from './database.js';


// Función para obtener todos los usuarios
export const fetchUsuarios = async () => {
    const usuarios = await collection('usuarios');
    const results = usuarios.find().toArray();
    console.log(results);
    return results;
}

// Función para crear un nuevo usuario
export const createUsuario = async (usuario) => {
    const usuarios = await collection('usuarios');
    const result = await usuarios.insertOne(usuario);
    return result;
}

// Función para obtener un usuario por su nombre de usuario
export const fetchUsuario = async (username = '') => {
    const usuarios = await collection('usuarios');
    const result = await usuarios.findOne({ username: { $eq: username } });
    return result;
}

// Función para actualizar un usuario por su nombre de usuario
export const updateUsuario = async (username, usuario) => {
    const usuarios = await collection('usuarios');
    const result = await usuarios.updateOne(
        { username: username },
        { $set: usuario }
    );
    return result;
}

// Función para eliminar un usuario por su nombre de usuario
export const removeUsuario = async (username) => {
    const usuarios = await collection('usuarios');
    const result = await usuarios.deleteOne({ username: { $eq: username } });
    return result;
}

