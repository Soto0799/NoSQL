import { fetchPlaces, createPlace, fetchPlace, updatePlace, removePlace,fetchPlacesUpward } from '../repositories/placesRepository.js';

export const getPlaces = async () => {
    return await fetchPlaces();
}

export const postPlace = async (place) => {
    if (!place.id) throw new Error('El ID del lugar es requerido');

    const existingPlace = await fetchPlace(place.id);
    if (existingPlace) throw new Error('El ID del lugar ya existe');

    return await createPlace(place);
}

// Cambiado de name a id
export const getPlace = async (id) => {
    return await fetchPlace(id);
}

// Cambiado de name a id
export const putPlace = async (id, place) => {
    return await updatePlace(id, place);
}

// Cambiado de name a id
export const deletePlace = async (id) => {
    return await removePlace(id);
}


export const getPlacesUpdward = async ()  =>{


    return await fetchPlacesUpward();

}
