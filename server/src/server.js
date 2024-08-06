import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import estudiantesRoute from './routes/estudiantesRoute.js';
import usuariosRoute from './routes/usuariosRoute.js';
import adminsRoute from './routes/adminsRoute.js';
import placesRoute from './routes/placesRoute.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { config } from 'dotenv';
import { validateToken, validateCredentials } from './middlewares/jwtHandler.js';

config();

//const express = require ('express');
//const estudiantesRoute = require('./routes/estudiantesRoute');

const PORT = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (request, response) => {
    response.send('Alive!');
});

app.post('/login', validateCredentials);

app.use('/estudiantes', validateToken, estudiantesRoute);

app.use('/places', placesRoute);

app.use('/usuarios', usuariosRoute);

app.use('/admin', adminsRoute);

//Se agregó esta ruta para manejar las funciones de la tabla usuarios
app.use('/register', usuariosRoute);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log('Api listening on port', PORT);
});

export default app;