
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import usuariosRoute from './routes/usuariosRoute.js';
import placesRoute from './routes/placesRoute.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { config } from 'dotenv';
import { validateToken, validateCredentials, createPlace } from './middlewares/jwtHandler.js';

config();

const PORT = process.env.PORT || 8443;
const app = express();

app.use(express.json());
app.use(cors());
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

app.listen(PORT, () => {
    console.log(`API listening on port ${PORT}`);
});

export default app;
