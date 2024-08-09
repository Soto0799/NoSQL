import express from 'express';
import { getPlaces, postPlace, getPlace, putPlace, deletePlace } from '../controllers/placesController.js';

const router = express.Router();

router.get('/', async (request, response, next) => {
    try {
        const results = await getPlaces();
        if (results.length === 0) {
            const error = new Error('No data found.');
            error.statusCode = StatusCode.NOT_FOUND;;
            next(error);
        }
        response.json(results);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (request, response, next) => {
    try {
        const json = request.body;
        const result = await postPlace(json);
        response.json(result);
    } catch (error) {
        next(error);
    }
});

router.get('/:name', async (request, response, next) => {
    const name = request.params.name;
    const result = await getPlace(name);
    response.json(result);
});

router.put('/:name', async (request, response, next) => {
    try {
        const name = request.params.name;
        const json = request.body;
        const result = await putPlace(name, json);
        response.json(result);
    } catch (error) {
        next(error);
    }
});

router.delete('/:name', async (request, response, next) => {
    try {
        const name = request.params.name;
        const result = await deletePlace(name);
        response.json(result);
    } catch (error) {
        next(error);
    }
});

export default router;