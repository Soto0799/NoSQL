
import express from 'express';
import { getUsuarios, postUsuario, getUsuario, putUsuario, deleteUsuario } from '../controllers/usuariosController.js';
const router = express.Router();

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

router.post('/', async (request, response) => {
    const json = request.body;
    const result = await postUsuario(json);
    response.json(result);
}
);

router.get('/:username', async (request, response) => {
    const username = request.params.username;
    const result = await getUsuario(username);
    response.json(result);
}
);

router.put('/:username', async (request, response) => {
    const username = request.params.username;
    const json = request.body;
    const result = await putUsuario(username, json);
    response.json(result);
}
);

router.delete('/:username', async (request, response) => {
    const username = request.params.username;
    const result = await deleteUsuario(username);
    response.json(result);
}
);



export default router;