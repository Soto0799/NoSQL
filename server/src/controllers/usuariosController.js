
import { fetchUsuarios, fetchUsuario, createUsuario, updateUsuario, removeUsuario } from "../repositories/usuariosRepository.js";
import { fetchPlace } from '../repositories/placesRepository.js';
import { fetchUserFavorites } from "../repositories/usuariosRepository.js";

import crypto from 'crypto-js';


export const getUsuarios = async () => {
  return await fetchUsuarios();
};

export const getUsuario = async (username) => {
  return await fetchUsuario(username);
};

export const deleteUsuario = async (usuario) => {
  if (!usuario) {
    throw new Error("username is required");
  }
  const deletedUsuarios = await removeUsuario(usuario);
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
  delete usuario.password;

  const createdUsuario = await createUsuario(usuario);

  return createdUsuario;
};

export const putUsuario = async (username, usuario) => {
  if (!username) {

    throw new Error("username is required");

  }

  const updatedUsuario = await updateUsuario(username, usuario);
  return updatedUsuario;
};

export const getUserFavorites = async (username) => {
    if (!username) {
        throw new Error("El username es requerido");
    }
    return await fetchUserFavorites(username);
};






