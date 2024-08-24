import express from 'express';
import { getPlaces, postPlace, getPlace, putPlace, deletePlace,getPlacesUpdward } from '../controllers/placesController.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const places = await getPlaces();
        res.json(places);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const place = await postPlace(req.body);
        res.status(201).json({ success: true, data: place });
    } catch (error) {
        next(error);
    }
});

router.get('/upward', async (req, res, next) => {

try{

    const places = await getPlacesUpdward();
    res.json(places);

}catch(error){
    next(error);

}


});
// Cambiado de :name a :id
router.get('/:id', async (req, res, next) => {
    try {
        const place = await getPlace(req.params.id);
        res.json(place);
    } catch (error) {
        next(error);
    }
});

// Cambiado de :name a :id
router.put('/:id', async (req, res, next) => {
    try {
        const place = await putPlace(req.params.id, req.body);
        res.json(place);
    } catch (error) {
        next(error);
    }
});

// Cambiado de :name a :id
router.delete('/:id', async (req, res, next) => {
    try {
        const place = await deletePlace(req.params.id);
        res.json(place);
    } catch (error) {
        next(error);
    }
});

export default router;
