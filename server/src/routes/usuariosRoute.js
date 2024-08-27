
import express from 'express';
import { getUsuarios, postUsuario, getUsuario, putUsuario, deleteUsuario } from '../controllers/usuariosController.js';
const router = express.Router();

// Ruta para obtener todos los usuarios
router.get('/', async (request, response, next) => {
    try {
        const results = await getUsuarios();// Llama al controlador para obtener todos los usuarios
        if (results.length === 0) {
            const error = new Error('No data found.');
            error.statusCode = StatusCode.NOT_FOUND;// Error si no se encuentran usuarios
            next(error);
        }
        response.json(results);// Responde con la lista de usuarios en formato JSON
    } catch (error) {
        next(error);
    }
}
);

// Ruta para crear un nuevo usuario
router.post('/', async (request, response) => {
    const json = request.body;
    const result = await postUsuario(json);// Llama al controlador para crear un nuevo usuario
    response.json(result);// Responde con el usuario creado
}
);

// Ruta para obtener un usuario específico por su `username`
router.get('/:username', async (request, response) => {
    const username = request.params.username;
    const result = await getUsuario(username);// Llama al controlador para obtener un usuario específico
    response.json(result);// Responde con los detalles del usuario
}
);

// Ruta para actualizar un usuario por su `username`
router.put('/:username', async (request, response) => {
    const username = request.params.username;
    const json = request.body;
    const result = await putUsuario(username, json);// Llama al controlador para actualizar el usuario
    response.json(result);// Responde con los detalles actualizados del usuario
}
);

// Ruta para eliminar un usuario por su `username`
router.delete('/:username', async (request, response) => {
    const username = request.params.username;
    const result = await deleteUsuario(username);// Llama al controlador para eliminar el usuario
    response.json(result);// Responde con el usuario eliminado
}
);

// Ruta para obtener los lugares favoritos de un usuario por su `username`
router.get('/:username/favorites', async (request, response, next) => {
    try {
        const username = request.params.username;
        const favorites = await getUserFavorites(username);// Llama al controlador para obtener los favoritos del usuario
        response.json(favorites);// Responde con la lista de lugares favoritos del usuario
    } catch (error) {
        next(error);
    }
});


export default router;