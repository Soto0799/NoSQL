import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { config } from 'dotenv';
import { getUsuario } from '../controllers/usuariosController.js';
import { postToken } from '../controllers/tokensController.js';
import { createPlace as createPlaceInRepo } from '../repositories/placesRepository.js';

config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const getTokenForUser = async (username, password) => {
    if (!username || !password) {
        const error = new Error('Username and password are required.');
        error.StatusCode = StatusCodes.BAD_REQUEST;
        throw error;
    }

    const error = new Error('Authentication failed.');
    error.StatusCode = StatusCodes.UNAUTHORIZED;

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

    console.log('Token data:', token);

    if (!await postToken(token)) {
        throw error;
    }

    const jwtToken = jwt.sign({ id }, JWT_SECRET_KEY, { expiresIn: `${hours}h` });
    return jwtToken;
};

export const validateCredentials = async (request, response, next) => {
    try {
        const { username, password } = request.body;

        const usuario = await getUsuario(username, password);

        if (!usuario) {
            const error = new Error('Authentication failed.');
            error.StatusCode = StatusCodes.UNAUTHORIZED;
            throw error;
        }

        const token = await getTokenForUser(username, password);
        const rol = usuario.rol;

        console.log('Token generated successfully:', token);

        response.status(StatusCodes.OK).json({ success: true, data: { token, rol } });
    } catch (error) {
        next(error);
    }
};

export const validateToken = async (request, response, next) => {
    try {
        const token = request.headers.authorization;
        if (!token) {
            throw new Error('Authorization header missing');
        }
        const id = await verifyToken(token);
        request.id = id;
        next();
    } catch (error) {
        next(error);
    }
};

export const createPlace = async (request, response, next) => {
    try {
        const placeData = request.body;
        const { id, nombre, distancia, esFavorito, lat, lon, seleccionCount, imagen } = placeData;

        if (!id || !nombre || !distancia || !lat || !lon || !imagen) {
            const error = new Error('All fields are required.');
            error.status = StatusCodes.BAD_REQUEST;
            throw error;
        }

        const result = await createPlaceInRepo(placeData);

        response.status(StatusCodes.CREATED).json({ success: true, message: 'Place created successfully', data: result });
    } catch (error) {
        next(error);
    }
};
