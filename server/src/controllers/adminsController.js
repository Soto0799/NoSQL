import {
  fetchAdmins,
  fetchAdmin,
  createAdmin,updateAdmin,removeAdmin
} from "../repositories/adminsRepository.js";

//Trer todos los admins creados
export const getAdmins = async () => {
  return await fetchAdmins();
};

//Traer admin en especifico
export const getAdmin = async (email) => {
  return await fetchAdmin(email);
};

//Borrar admins por email
export const deleteAdmin = async (admin) => {
  if (!admin) {
    throw new Error("email is required");
  }
  const deletedAdmins = await removeAdmin(admin);
  return deletedAdmins;
};

//Crear un nuevo admin
export const postAdmin = async (admin) => {
  if (!admin.email) {
    throw new Error("email is required");
  }

  const createdAdmin = await createAdmin(admin);
  return createdAdmin;
};

//Actualizar un admin por email
export const putAdmin = async (email,admin) => {
  if (!email) {

    throw new Error("email is required");

  }

  const updatedAdmin = await updateAdmin(email,admin);
  return updatedAdmin;
};
