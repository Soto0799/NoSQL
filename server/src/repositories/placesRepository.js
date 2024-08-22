import { collection } from './database.js';

export const fetchPlaces = async () => {
    const places = await collection('places');
    return places.find().toArray();
}

// Función para crear un nuevo lugar
export const createPlace = async (place) => {
    const places = await collection('places');
    return await places.insertOne(place);
}

// Función para obtener un lugar por su id
export const fetchPlace = async (id) => {
    const places = await collection('places');
    return await places.findOne({ id });
}

// Función para actualizar un lugar por su id
export const updatePlace = async (id, place) => {
    const places = await collection('places');
    return await places.updateOne({ id }, { $set: place });
}

// Función para eliminar un lugar por su id
export const removePlace = async (id) => {
    const places = await collection('places');
    return await places.deleteOne({ id });
}


export const fetchPlacesUpward = async () =>{

    const places = await collection('places');
    return await places.find().sort({seleccionCount:-1}).toArray();

}


