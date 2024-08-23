import { collection } from './database.js';

export const fetchPlaces = async () => {
    const places = await collection('places');
    return places.find().toArray();
}

export const createPlace = async (place) => {
    const places = await collection('places');
    const result = await places.insertOne(place);

    console.log('Insert result:', result); // Log para ver el resultado de la inserción

    if (!result || !result.ops || result.ops.length === 0) {
        throw new Error('Failed to insert place into database');
    }

    return result.ops[0];
}

// Cambiado de name a id
export const fetchPlace = async (id) => {
    const places = await collection('places');
    return await places.findOne({ id });
}

// Cambiado de name a id
export const updatePlace = async (id, place) => {
    const places = await collection('places');
    return await places.updateOne({ id }, { $set: place });
}

// Cambiado de name a id
export const removePlace = async (id) => {
    const places = await collection('places');
    return await places.deleteOne({ id });
}


export const fetchPlacesUpward = async () =>{

    const places = await collection('places');
    return await places.find().sort({seleccionCount:-1}).toArray();

}


