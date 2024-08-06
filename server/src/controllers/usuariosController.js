
import { fetchUsuario, createUsuario, updateUsuario, removeUsuario } from '../repositories/usuariosRepository.js';
import crypto from 'crypto-js';



export const getUsuarios = async () => {
    return await fetchUsuario();
}

//Nuevo usuario
export const postUsuario = async (usuario) => {

    //vienen verificaciones de inputs llenados

    if (!usuario.username) {
        throw new Error('El nombre del usuario no fue ingresado');}
    

    if (!usuario.password) {
        throw new Error('La contraseña no fue ingresada');}
    


    // viene encriptación de contraseñas
    usuario.hashPassword = crypto.MD5(usuario.password).toString();
    delete usuario.password;

    const existingUsuario = await fetchUsuario(usuario.username);
    if (existingUsuario) {
        throw new Error('El usuario ingresado no esta disponible');}
    



    const createdUsuario = await createUsuario(usuario);
    const result = {
        'id': createdUsuario.insertedId
    };

    return result;
}



export const getUsuario = async (username) => {

    return await fetchUsuario(username); }



export const putUsuario = async (username, usuario) => {
    if (!username) {
        throw new Error('El nombre de usuario no fue ingresado');}
    
    if (usuario.password) {
        usuario.hashPassword = crypto.MD5(usuario.password).toString();
        delete usuario.password;}
    

    const updatedUsuario = await updateUsuario(username, usuario);

    return updatedUsuario;
}

export const deleteUsuario = async (username) => {
    if (!username) {
        throw new Error('El nombre de usuario es requerido');}
    const deletedUsuario = await removeUsuario(username);
    
    return deletedUsuario;
}