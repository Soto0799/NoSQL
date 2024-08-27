import { collection } from "./database.js";

// Inserta un nuevo token en la colección "tokens"
export const createToken = async (token) => {
    //{
    //  id: string
    //  username: string
    //  creationDate: date
    //  expirationDate: date
    //}
    const tokens = await collection("tokens");// Inserta el token en la base de datos
    const result = await tokens.insertOne(token);
    return result;
}

// Recupera un token por su `id`
export const fetchToken = async (id) => {
    const tokens = await collection("tokens");
    const result = await tokens.findOne({ id: id });// Busca un token con el id proporcionado
    return result;// Devuelve el token encontrado
}