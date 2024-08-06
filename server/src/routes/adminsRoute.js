import express from 'express';
import { getAdmins, postAdmin, getAdmin, putAdmin, deleteAdmin } from '../controllers/adminsController.js';

const router = express.Router();

// Ruta para obtener todos los Admins
router.get('/', async (request, response, next) => {
    try {
        const results = await getAdmins();
        if (results.length === 0) {
            const error = new Error('No data found.');
            error.statusCode = StatusCode.NOT_FOUND;
            next(error);
        }
        response.json(results);
    } catch (error) {
        next(error);
    }
});

// Ruta para crear un nuevo Admin
router.post('/', async (request, response) => {
    const json = request.body;
    const result = await postAdmin(json);
    response.json(result);
});

// Ruta para obtener un Admin por username
router.get('/:email', async (request, response) => {
    const email = request.params.email;
    const result = await getAdmin(email);
    response.json(result);
});

// Ruta para actualizar un Admin por username
router.put('/:email', async (request, response) => {
    const email = request.params.email;
    const json = request.body;
    const result = await putAdmin(email, json);
    response.json(result);
});

// Ruta para eliminar un Admin por username
router.delete('/:email', async (request, response) => {
    const email = request.params.email;
    const result = await deleteAdmin(email);
    response.json(result);
});

export default router;