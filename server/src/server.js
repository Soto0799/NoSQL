import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import usuariosRoute from './routes/usuariosRoute.js';
import placesRoute from './routes/placesRoute.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { config } from 'dotenv';
import { validateToken, validateCredentials, createPlace } from './middlewares/jwtHandler.js';

config();

//const express = require ('express');
//const estudiantesRoute = require('./routes/estudiantesRoute');

const PORT = process.env.PORT || 8080;
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

//Se agregó esta ruta para manejar las funciones de la tabla usuarios
app.use('/register', usuariosRoute);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log('Api listening on port', PORT);
});

export default app;