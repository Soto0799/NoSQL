import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { config } from 'dotenv';
import { getUsuario } from '../controllers/usuariosController.js';
import { postToken } from '../controllers/tokensController.js';

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
        const username = request.body.username;
        const password = request.body.password;
        const token = await getToken(username, password);
        response.status(StatusCodes.OK).json({ success: true, data: { token } });
    } catch (error) {
        next(error);
    }
}

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

