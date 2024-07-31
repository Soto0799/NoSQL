import {collection} from './database.js';


// Obtener todos los usuarios
export const fetchAdmins = async () => {
    const admins = await collection('admin');
    const results = admins.find().toArray();
    console.log(results);
    return results;
}

// Crear un nuevo usuario
export const createAdmin = async (admin) => {
    const admins = await collection('admin');
    const result = await admins.insertOne(admin);
    return result;
}

// Buscar un usuario por nombre de usuario
export const fetchAdmin = async (email = '') => {
    const admins = await collection('admin');
    const result = await admins.findOne({ email: { $eq: email } });
    return result;
}

// Actualizar un usuario
export const updateAdmin = async (email, admin) => {
    const admins = await collection('admin');
    const result = await admins.updateOne(
        { email: email },
        { $set: admin }
    );
    return result;
}

// Eliminar un usuario
export const removeAdmin = async (email) => {
    const admins = await collection('admin');
    const result = await admins.deleteOne({ email: { $eq: email } });
    return result;
}