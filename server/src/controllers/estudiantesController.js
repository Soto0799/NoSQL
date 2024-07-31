import { fetchEstudiantes, createEstudiante, fetchEstudiante, updateEstudiante, removeEstudiante } from '../repositories/estudiantesRepository.js';

//const fetchEstudiantes = requiere('../repositories/estudiantesRepository.js');
//get => fetch
//post => create
//put => update 
//delete => remove

export const getEstudiantes = async () => {
    return await fetchEstudiantes();
}

export const postEstudiante = async (estudiante) => {

    if (!estudiante.identificacion) {
        throw new Error('La identificación es requerida');
    }

    const createdEstudiante = await createEstudiante(estudiante);
    const result = {
        'id': createdEstudiante.insertedId
    };
    return result;
}



/*Get del profe para buscar cedula:

export const getEstudiante = async(cedula) => {
    return await fetchEstudiante(cedula);
}*/



//Puntos del Examen resuelto

export const getEstudiante = async (cedulaOrIdentificacion) => {
    return await fetchEstudiante(cedulaOrIdentificacion);
}



// Función para actualizar un estudiante
export const putEstudiante = async (id, estudiante) => {
    if (!id) {
        throw new Error('El ID es requerido');
    }

    const updatedEstudiante = await updateEstudiante(id, estudiante);
    return updatedEstudiante;
}



// Función para eliminar un estudiante
export const deleteEstudiante = async (id) => {
    if (!id) {
        throw new Error('El ID es requerido');
    }

    const deletedEstudiante = await removeEstudiante(id);
    return deletedEstudiante;
}