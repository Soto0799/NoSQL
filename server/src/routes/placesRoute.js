import express from 'express';
import { getPlaces, postPlace, getPlace, putPlace, deletePlace,getPlacesUpdward } from '../controllers/placesController.js';

const router = express.Router();

// Ruta GET para obtener todos los lugares
router.get('/', async (req, res, next) => {
    try {
        const places = await getPlaces();
        res.json(places);
    } catch (error) {
        next(error);
    }
});

// Ruta POST para crear un nuevo lugar
router.post('/', async (req, res, next) => {
    try {
        const place = await postPlace(req.body);
        res.json(place);
    } catch (error) {
        next(error);
    }
});

// Ruta GET para obtener todos los lugares ordenados por seleccionCount en orden descendente
router.get('/upward', async (req, res, next) => {

try{

    const places = await getPlacesUpdward();
    res.json(places);

}catch(error){
    next(error);

}


});
// Ruta GET para obtener un lugar específico por ID
router.get('/:id', async (req, res, next) => {
    try {
        const place = await getPlace(req.params.id);
        res.json(place);
    } catch (error) {
        next(error);
    }
});

// Ruta PUT para actualizar un lugar específico por ID
router.put('/:id', async (req, res, next) => {
    try {
        const place = await putPlace(req.params.id, req.body);
        res.json(place);
    } catch (error) {
        next(error);
    }
});

// Ruta DELETE para eliminar un lugar específico por ID
router.delete('/:id', async (req, res, next) => {
    try {
        const place = await deletePlace(req.params.id);
        res.json(place);
    } catch (error) {
        next(error);
    }
});

export default router;
