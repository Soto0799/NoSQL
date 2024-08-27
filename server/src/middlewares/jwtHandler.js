import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { config } from 'dotenv';
import { getUsuario } from '../controllers/usuariosController.js';
import { postToken } from '../controllers/tokensController.js';
import { createPlace as createPlaceInRepo } from '../repositories/placesRepository.js';

config(); // Carga las variables de entorno desde el archivo .env

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY; // Recupera la clave secreta para firmar los JWT desde el archivo .env

// Función para generar un token para un usuario autenticado
const getTokenForUser = async (username, password) => {
    if (!username || !password) {// Verifica si se proporcionaron el nombre de usuario y la contraseña
        const error = new Error('Username and password are required.');
        error.StatusCode = StatusCodes.BAD_REQUEST;
        throw error;
    }

    // Error de autenticación fallida
    const error = new Error('Authentication failed.');
    error.StatusCode = StatusCodes.UNAUTHORIZED;

    // Recupera el usuario desde la base de datos
    const usuario = await getUsuario(username, password);

    if (!usuario) {
        throw error; // Si el usuario no existe, lanza un error
    }

    //Crea un token de sesión único y con una expiración de una hora    
    const id = uuidv4();
    const hours = 1;
    const token = {
        id,
        username,
        creationDate: new Date(Date.now()),
        expirationDate: new Date(Date.now() + (hours * 60 * 60 * 1000)),
    };

    console.log('Token data:', token);

    // Almacena el token en la base de datos, si falla lanza un error
    if (!await postToken(token)) {
        throw error;
    }

    // Genera un JWT para el usuario con el ID del token y lo devuelve
    const jwtToken = jwt.sign({ id }, JWT_SECRET_KEY, { expiresIn: `${hours}h` });
    return jwtToken;
};

//Para validar las credenciales de un usuario
export const validateCredentials = async (request, response, next) => {
    try {
        const { username, password } = request.body;

        // Verifica que el usuario exista
        const usuario = await getUsuario(username, password);

        if (!usuario) {
            const error = new Error('Authentication failed.');
            error.StatusCode = StatusCodes.UNAUTHORIZED;
            throw error;
        }

        //Crea un token JWT para el usuario autenticado
        const token = await getTokenForUser(username, password);
        const rol = usuario.rol;
        
        console.log('Token generated successfully:', token);


        // Devuelve el token y el rol del usuario
        response.status(StatusCodes.OK).json({ success: true, data: { token, rol } });
    } catch (error) {
        next(error);
    }
};


//Para validar el token JWT de un usuario
export const validateToken = async (request, response, next) => {
    try {
        const token = request.headers.authorization;// Recupera el token de la petición
        if (!token) {
            throw new Error('Authorization header missing');// Si no hay token, lanza un error
        }
        const id = await verifyToken(token);// Verifica el token
        request.id = id;// Almacena el ID del usuario en la solicitud
        next();
    } catch (error) {
        next(error);
    }
};

//Para crear un nuevo lugar
export const createPlace = async (request, response, next) => {
    try {
        const placeData = request.body;// Recupera los datos del lugar de la solicitud
        const { id, nombre, distancia, esFavorito, lat, lon, seleccionCount, imagen } = placeData;

         // Verifica que todos los campos obligatorios estén
        if (!id || !nombre || !distancia || !lat || !lon || !imagen) {
            const error = new Error('All fields are required.');
            error.status = StatusCodes.BAD_REQUEST;
            throw error;// Si falta algún campo, lanza un error
        }

         // Crea el nuevo lugar en el repositorio
        const result = await createPlaceInRepo(placeData);

        // Devuelve una respuesta exitosa si el lugar se creó correctamente
        response.status(StatusCodes.CREATED).json({ success: true, message: 'Place created successfully', data: result });
    } catch (error) {
        next(error);// Pasa cualquier error al manejador de errores
    }
};
