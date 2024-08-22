import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { config } from 'dotenv';
import { getUsuario } from '../controllers/usuariosController.js';
import { postToken } from '../controllers/tokensController.js';

config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

// Función para obtener un token JWT
const getToken = async (username, password) => {
    if (!username || !password) {
        const error = new Error('Username and password are required.');
        error.StatusCode = StatusCodes.BAD_REQUEST;
        throw error;// Lanza un error si faltan username o password
    }


    const error = new Error('Authentcation failed.');
    error.StatusCode = StatusCodes.UNAUTHORIZED;

    // Ir a las base de datos y validar las credenciales
    const usuario = await getUsuario(username, password);

    if (!usuario) {
        throw error;
    }

    // Genera un identificador único para el token
    const id = uuidv4();

    // Establece la duración del token en horas
    const hours = 1;

    // Crea un objeto de token con datos del usuario y fechas de creación y expiración
    const token = {
        id,
        username,
        creationDate: new Date(Date.now()),
        expirationDate: new Date(Date.now() + (hours * 60 * 60 * 1000)),

    };

    console.log(token);//Prueba

     // Guarda el token en la base de datos
    if (!await postToken(token)) {
        throw error;

    }

    // Firma el token con JWT y lo configura para que expire en las horas especificadas
    const jwtToken = jwt.sign({ id }, JWT_SECRET_KEY,
        { expiresIn: hours.toString() + 'h' });
    return jwtToken;
}

// Función para verificar el token JWT
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
// Middleware para validar las credenciales del usuario
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

