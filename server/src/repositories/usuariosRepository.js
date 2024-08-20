
import { collection } from './database.js';



export const fetchUsuarios = async () => {
    const usuarios = await collection('usuarios');
    const results = usuarios.find().toArray();
    console.log(results);
    return results;
}


export const createUsuario = async (usuario) => {
    const usuarios = await collection('usuarios');
    const result = await usuarios.insertOne(usuario);
    return result;
}

export const fetchUsuario = async (username = '') => {
    const usuarios = await collection('usuarios');
    const result = await usuarios.findOne({ username: { $eq: username } });
    return result;
}


export const updateUsuario = async (username, usuario) => {
    const usuarios = await collection('usuarios');
    const result = await usuarios.updateOne(
        { username: username },
        { $set: usuario }
    );
    return result;
}

export const removeUsuario = async (username) => {
    const usuarios = await collection('usuarios');
    const result = await usuarios.deleteOne({ username: { $eq: username } });
    return result;
}

