
import { fetchUsuarios, fetchUsuario, createUsuario, updateUsuario, removeUsuario, fetchUserFavorites } from "../repositories/usuariosRepository.js";
import { fetchPlace } from '../repositories/placesRepository.js';

import crypto from 'crypto-js'; // Importamos la biblioteca crypto para la encriptación

// Controlador para obtener todos los usuarios
export const getUsuarios = async () => {
  return await fetchUsuarios();
};

// Controlador para obtener un usuario específico basado en su nombre de usuario
export const getUsuario = async (username) => {
  return await fetchUsuario(username);
};

// Controlador para eliminar un usuario
export const deleteUsuario = async (usuario) => {
  if (!usuario) {// Verifica que se proporcione el nombre de usuario
    throw new Error("username is required");
  }
  const deletedUsuarios = await removeUsuario(usuario);// Llama a la función removeUsuario para eliminar al usuario
  return deletedUsuarios;
};

//Nuevo usuario
export const postUsuario = async (usuario) => {

  //vienen verificaciones de inputs llenados
  if (!usuario.username) {
    throw new Error('El nombre del usuario no fue ingresado');
  }

  if (!usuario.password) {
    throw new Error('La contraseña no fue ingresada');
  }
  
  if (!usuario.rol) {
    throw new Error('Rol no fue ingresado');
  }

  // viene encriptación de contraseñas
  usuario.hashPassword = crypto.MD5(usuario.password).toString();
  delete usuario.password;// Se elimina la contraseña original para almacenar solo el hash

  const createdUsuario = await createUsuario(usuario);// Se crea el nuevo usuario

  return createdUsuario;
};

// Controlador para actualizar un usuario basado en su nombre de usuario
export const putUsuario = async (username, usuario) => {
  if (!username) {

    throw new Error("username is required");

  }

  const updatedUsuario = await updateUsuario(username, usuario);// Actualiza la información del usuario
  return updatedUsuario;
};

// Controlador para obtener los favoritos de un usuario específico
export const getUserFavorites = async (username) => {
    if (!username) {// Verifica que se proporcione el nombre de usuario
        throw new Error("El username es requerido");
    }
    return await fetchUserFavorites(username);// Recupera la lista de favoritos del usuario
};






