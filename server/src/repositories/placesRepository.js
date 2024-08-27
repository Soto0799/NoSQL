import { collection } from './database.js';

// Función para recuperar todos los lugares desde la colección "places"
export const fetchPlaces = async () => {
    const places = await collection('places');
    return places.find().toArray();// Devuelve todos los documentos como un array
}

// Función para crear un nuevo lugar en la colección "places"
export const createPlace = async (place) => {
    const places = await collection('places');
    const result = await places.insertOne(place);// Inserta un nuevo documento en la colección

    console.log('Insert result:', result); // Log para ver el resultado de la inserción

    if (!result || !result.ops || result.ops.length === 0) {
        throw new Error('Failed to insert place into database');// Error si la inserción falla
    }

    return result.ops[0];// Devuelve el documento insertado
};
// Recupera un lugar específico por su `id`
export const fetchPlace = async (id) => {
    const places = await collection('places');
    return await places.findOne({ id });// Busca un lugar con el id proporcionado
}

// Actualiza un lugar existente por su `id`
export const updatePlace = async (id, place) => {
    const places = await collection('places');
    return await places.updateOne({ id }, { $set: place });// Actualiza los datos del lugar
}

// Elimina un lugar por su `id`
export const removePlace = async (id) => {
    const places = await collection('places');
    return await places.deleteOne({ id });// Elimina un documento con el id proporcionado
}

//Recupera todos los lugares ordenados por el campo `seleccionCount` en orden descendente
export const fetchPlacesUpward = async () =>{

    const places = await collection('places');
    return await places.find().sort({seleccionCount:-1}).toArray();// Ordena los resultados y los devuelve como array

}


