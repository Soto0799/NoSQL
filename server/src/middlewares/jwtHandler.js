import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { config } from 'dotenv';
import { getUsuario } from '../controllers/usuariosController.js';
import { postToken } from '../controllers/tokensController.js';
import { getPlace } from '../controllers/placesController.js';	

config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const getToken = async (username, password) => {
    if (!username || !password) {
        const error = new Error('Username and password are required.');
        error.StatusCode = StatusCodes.BAD_REQUEST;
        throw error;
    }


    const error = new Error('Authentcation failed.');
    error.StatusCode = StatusCodes.UNAUTHORIZED;

    // Ir a las base de datos y validar las credenciales
    const usuario = await getUsuario(username, password);

    if (!usuario) {
        throw error;
    }

    const id = uuidv4();

    const hours = 1;
    const token = {
        id,
        username,
        creationDate: new Date(Date.now()),
        expirationDate: new Date(Date.now() + (hours * 60 * 60 * 1000)),

    };

    console.log(token);//Prueba

    if (!await postToken(token)) {
        throw error;

    }

    const jwtToken = jwt.sign({ id }, JWT_SECRET_KEY,
        { expiresIn: hours.toString() + 'h' });
    return jwtToken;
}

const verifyToken = async (token) => {
    if (!token) {
        const error = new Error('Token is missing or not provided.');
        error.StatusCode = StatusCodes.UNAUTHORIZED;
        throw error;
    }

    token = token.split(' ')[1];

    try {
        const payload = jwt.verify(token, JWT_SECRET_KEY);
        return payload.id;
    } catch (error) {
        error.StatusCode = StatusCodes.FORBIDDEN;
        throw error;
    }
}

export const validateCredentials = async (request, response, next) => {
    try {
        const { username, password } = request.body;

        // Obtener el usuario directamente de la base de datos
        const usuario = await getUsuario(username, password);

        // Si el usuario no existe, lanzamos un error
        if (!usuario) {
            const error = new Error('Authentication failed.');
            error.StatusCode = StatusCodes.UNAUTHORIZED;
            throw error;
        }

        // Generar el token con el usuario encontrado
        const token = await getToken(username,password);

        // Obtener el rol del usuario
        const rol = usuario.rol;

        // Devolver el token y el rol en la respuesta
        response.status(StatusCodes.OK).json({ success: true, data: { token,rol } });

    } catch (error) {
        next(error);
    }
};

export const validateToken = async (request, response, next) => {
    try {
        const token = request.headers.authorization;
        const id = await verifyToken(token);
        request.id = id;
        next();
    } catch (error) {
        next(error);
    }
}

export const createPlace = async (request, response, next) => {
    try {
        const placeData = req.body;
        const { id, nombre, distancia, esFavorito, lat, lon, seleccionCount, imagen } = placeData;


        if (!id || !nombre || !distancia || !lat || !lon || !imagen) {
            const error = new Error('All fields are required.');
            error.status = StatusCodes.BAD_REQUEST;
            throw error;
        }
        // Procesa placeData, por ejemplo, guarda en la base de datos
        // Suponiendo que `createPlace` es una función que guarda el lugar
        const result = await createPlace(placeData);
        response.status(StatusCodes.OK).json({ success: true, data: { token } });

        res.status(StatusCodes.CREATED).json({ success: true, data: result });
    } catch (error) {
        next(error);
    }
}