// Importamos las funciones necesarias desde el repositorio de tokens
import { createToken } from '../repositories/tokensRepository.js';

// Controlador para crear un nuevo token
export const postToken = async (token) => {
    //Crea el token usando la función createToken del repositorio
    const result = await createToken(token);
    //Devuelve el ID del token insertado si existe
    return result && result.insertedId;
}