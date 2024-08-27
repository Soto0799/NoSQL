
import { collection } from './database.js';


// Recupera todos los usuarios desde la colección "usuarios"
export const fetchUsuarios = async () => {
    const usuarios = await collection('usuarios');
    const results = usuarios.find().toArray();// Devuelve todos los documentos como array
    console.log(results);// Log para depuración
    return results;
}


// Inserta un nuevo usuario en la colección "usuarios"
export const createUsuario = async (usuario) => {
    const usuarios = await collection('usuarios');
    const result = await usuarios.insertOne(usuario);// Inserta un nuevo documento en la colección
    return result;
}

// Recupera un usuario por su `username`
export const fetchUsuario = async (username = '') => {
    const usuarios = await collection('usuarios');
    const result = await usuarios.findOne({ username: { $eq: username } });// Busca un usuario con el username proporcionado
    return result;// Devuelve el usuario encontrado
}

// Actualiza un usuario por su `username`
export const updateUsuario = async (username, usuario) => {
    const usuarios = await collection('usuarios');
    const result = await usuarios.updateOne(
        { username: username },// Busca el usuario con el username proporcionado
        { $set: usuario }// Actualiza los datos del usuario
    );
    return result;
}

// Elimina un usuario por su `username`
export const removeUsuario = async (username) => {
    const usuarios = await collection('usuarios');
    const result = await usuarios.deleteOne({ username: { $eq: username } });// Elimina un documento con el username proporcionado
    return result;
}

// Recupera los lugares favoritos de un usuario por su `username`
export const fetchUserFavorites = async (username) => {
    const usuarios = await collection('usuarios');
    const user = await usuarios.findOne({ username });// Busca el usuario por su username
    if (!user) {
        throw new Error("Usuario no encontrado");// Error si el usuario no existe
    }
    return user.favorites || [];// Devuelve los favoritos del usuario o un array vacío
};


