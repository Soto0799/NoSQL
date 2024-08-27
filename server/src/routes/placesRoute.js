import express from 'express';
import { getPlaces, postPlace, getPlace, putPlace, deletePlace,getPlacesUpdward } from '../controllers/placesController.js';

const router = express.Router();

// Ruta para obtener todos los lugares
router.get('/', async (req, res, next) => {
    try {
        const places = await getPlaces();// Llama al controlador para obtener todos los lugares
        res.json(places);// Responde con la lista de lugares en formato JSON
    } catch (error) {
        next(error);// Pasa el error al middleware de manejo de errores
    }
});

// Ruta para crear un nuevo lugar
router.post('/', async (req, res, next) => {
    try {
        const place = await postPlace(req.body);// Llama al controlador para crear un nuevo lugar
        res.status(201).json({ success: true, data: place });// Responde con el lugar creado y un código de estado 201
    } catch (error) {
        next(error);
    }
});

// Ruta para obtener los lugares ordenados por `seleccionCount` en orden descendente
router.get('/upward', async (req, res, next) => {

try{

    const places = await getPlacesUpdward();// Llama al controlador para obtener los lugares ordenados
    res.json(places);// Responde con la lista de lugares en formato JSON

}catch(error){
    next(error);

}


});

// Ruta para obtener un lugar específico por su `id`
router.get('/:id', async (req, res, next) => {
    try {
        const place = await getPlace(req.params.id);// Llama al controlador para obtener un lugar específico
        res.json(place);// Responde con los detalles del lugar
    } catch (error) {
        next(error);
    }
});

// Ruta para actualizar un lugar por su `id`
router.put('/:id', async (req, res, next) => {
    try {
        const place = await putPlace(req.params.id, req.body);// Llama al controlador para actualizar el lugar
        res.json(place);// Responde con los detalles actualizados del lugar
    } catch (error) {
        next(error);
    }
});

// Ruta para eliminar un lugar por su `id`
router.delete('/:id', async (req, res, next) => {
    try {
        const place = await deletePlace(req.params.id);// Llama al controlador para eliminar el lugar
        res.json(place);// Responde con el lugar eliminado
    } catch (error) {
        next(error);
    }
});

export default router;
