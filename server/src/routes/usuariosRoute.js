
import express from 'express';
import { getUsuarios, postUsuario, getUsuario, putUsuario, deleteUsuario } from '../controllers/usuariosController.js';
const router = express.Router();
// Ruta GET para obtener todos los usuarios
router.get('/', async (request, response, next) => {
    try {
        const results = await getUsuarios();
        if (results.length === 0) {
            const error = new Error('No data found.');
            error.statusCode = StatusCode.NOT_FOUND;
            next(error);
        }
        response.json(results);
    } catch (error) {
        next(error);
    }
}
);
// Ruta POST para crear un nuevo usuario
router.post('/', async (request, response) => {
    const json = request.body;
    const result = await postUsuario(json);
    response.json(result);
}
);
// Ruta GET para obtener un usuario específico por nombre de usuario
router.get('/:username', async (request, response) => {
    const username = request.params.username;
    const result = await getUsuario(username);
    response.json(result);
}
);
// Ruta PUT para actualizar un usuario específico por nombre de usuario
router.put('/:username', async (request, response) => {
    const username = request.params.username;
    const json = request.body;
    const result = await putUsuario(username, json);
    response.json(result);
}
);

// Ruta DELETE para eliminar un usuario específico por nombre de usuario
router.delete('/:username', async (request, response) => {
    const username = request.params.username;
    const result = await deleteUsuario(username);
    response.json(result);
}
);



export default router;