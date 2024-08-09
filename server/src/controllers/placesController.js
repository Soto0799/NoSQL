import { fetchPlaces, createPlace, fetchPlace, updatePlace, removePlace } from '../repositories/placesRepository.js';
import crypto from 'crypto-js';

export const getPlaces = async () => {
    return await fetchPlaces();
}

//Función para crear un nuevo lugar
export const postPlace = async (place) => {

    if (!place.name) {
        throw new Error('El nombre del lugar es requerido');
    }

    if (!place.location || !place.location.lat || !place.location.lon || !place.location.image) {
        throw new Error('Todos los espacios de la ubicación del lugar es requerida');
    }

    if (!place.timestamp) {
        throw new Error('El tiempo es requerido');
    }

    const existingPlace = await fetchPlace(place.name);
    if (existingPlace) {
        throw new Error('El nombre del lugar ya existe'); // Error si el lugar ya existe
    }

    const createdPlace = await createPlace(place);
    const result = {
        'id': createdPlace.insertedId//Retorna el id del lugar creado
    };
    return result;
}

export const getPlace = async (name) => {
    return await fetchPlace(name);
}

export const putPlace = async (name, place) => {
    if (!name) {
        throw new Error('El nombre es requerido');
    }
    if (!place) {
        throw new Error('Los datos del lugar son requeridos');
    }

    const updatedPlace = await updatePlace(name, place);
    return updatedPlace;
}

export const deletePlace = async (name) => {
    if (!name) {
        throw new Error('El nombre es requerido');
    }

    const deletedPlace = await removePlace(name);
    return deletedPlace;
}