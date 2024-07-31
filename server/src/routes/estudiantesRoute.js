import express, { request, response } from 'express';
import { getEstudiantes, postEstudiante, getEstudiante, putEstudiante, deleteEstudiante } from '../controllers/estudiantesController.js';



//const express = require('express');
//const { getEstudiantes } =requiere('../controllers/estudiantesController.js');

const router = express.Router();

router.get('/', async (request, response, next) => {
    try {
        const results = await getEstudiantes();
        if (results.length === 0) {
            const error = new Error('No data foud.');
            error.statusCode = StatusCode.NOT_FOUND;
            next(error);
        }
        response.json(results);
    }
    catch (error) {
        next(error);
    }
});

router.post('/', async (request, response) => {
    const json = request.body;
    const result = await postEstudiante(json);
    response.json(result);
});



/*Router.get del profe para buscar cedula:

router.get('/:cedula', async (request, response) => {
    const cedula = request.params.cedula;
    const result = await getEstudiante(cedula);
    response.json(result);
});*/



//Indicaciones del profe

/*// 20 puntos.
//Crear el putEstudiante en controller y el updateEstudiante en repository.
router.put('/:id', async (request, response) => {
    const id = request.params.id;
    const json = request.body;
});



// 10 puntos.
//Crear el deleteEstudiante en controller y el removeEstudiante en Repository.
router.delete('/:id', async (request, response) => {
    const id = request.params.id;
});*/



//Puntos del examen resueltos

router.get('/:cedulaOrIdentificacion', async (request, response) => {
    const cedulaOrIdentificacion = request.params.cedulaOrIdentificacion;
    const result = await getEstudiante(cedulaOrIdentificacion);
    response.json(result);
});

router.put('/:id', async (request, response) => {
    const id = request.params.id;
    const json = request.body;
    const result = await putEstudiante(id, json);
    response.json(result);
});



router.delete('/:id', async (request, response) => {
    const id = request.params.id;
    const result = await deleteEstudiante(id);
    response.json(result);
});

export default router;