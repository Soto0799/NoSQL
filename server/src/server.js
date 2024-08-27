import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import usuariosRoute from './routes/usuariosRoute.js';
import placesRoute from './routes/placesRoute.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { config } from 'dotenv';
import { validateToken, validateCredentials, createPlace } from './middlewares/jwtHandler.js';

config(); // Carga las variables de entorno desde el archivo .env

const PORT = process.env.PORT || 8443; // Puerto que se va a usar
const app = express(); // Crea la aplicación de Express

app.use(express.json());// Permite que Express comprenda JSON en las partes de body de las solicitudes
app.use(cors());// Habilita CORS para permitir solicitudes de diferentes dominios
app.use(bodyParser.json());

app.get('/', (request, response) => {
    response.send('Alive!');
});

// Ruta para el login
app.post('/login', validateCredentials, usuariosRoute);

// Ruta para crear un nuevo lugar (con middleware de autenticación)
app.post('/places', createPlace);

// Rutas para manejar otros métodos en /places
app.use('/places', placesRoute);

// Rutas para manejar usuarios
app.use('/usuarios', usuariosRoute);

// Ruta para el historial de favoritos
app.use('/historial', usuariosRoute);

// Middleware para manejar errores
app.use(errorHandler);

// Inicia el servidor y escucha en el puerto especificado
app.listen(PORT, () => {
    console.log(`API listening on port ${PORT}`);
});

export default app;
