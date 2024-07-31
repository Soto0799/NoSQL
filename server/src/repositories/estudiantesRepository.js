import { collection } from './database.js';


export const fetchEstudiantes = async () => {
    const estudiantes = await collection('estudiantes');
    const results = estudiantes.find().toArray();
    return results;
}

export const createEstudiante = async (estudiante) => {
    const estudiantes = await collection('estudiantes');
    const result = await estudiantes.insertOne(estudiante);
    return result;
} 



//Indicaciones del profe

//20 puntos.
//Buscar por cedula ó identificacion (OR)

//Codigo del profe para buscar cedula:
/*export const fetchEstudiante = async (cedula = '') => {
    const estudiantes = await collection('estudiantes');
    const results = await estudiantes.findOne({'cedula': {$eq: cedula}});
    return results;
}*/



//Puntos del examen resueltos 



// Buscar por cédula o identificación (OR)
export const fetchEstudiante = async (cedulaOrIdentificacion = '') => {
    const estudiantes = await collection('estudiantes');
    const results = await estudiantes.findOne({
        $or: [
            { 'cedula': cedulaOrIdentificacion },
            { 'identificacion': cedulaOrIdentificacion }
        ]
    });
    return results;
}



// Función para actualizar un estudiante
export const updateEstudiante = async (id, estudiante) => {
    const estudiantes = await collection('estudiantes');
    const result = await estudiantes.updateOne({
        $or: [
            { 'cedula': id },
            { 'identificacion': id }
        ]
    },
        { $set: estudiante }
    );
    return result;
}



// Función para eliminar un estudiante
export const removeEstudiante = async (id) => {
    const estudiantes = await collection('estudiantes');
    const result = await estudiantes.deleteOne({
        $or: [
            { 'cedula': id },
            { 'identificacion': id }
        ]
    });
    return result;
}

