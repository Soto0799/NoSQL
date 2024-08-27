// Importamos las funciones necesarias desde el repositorio de lugares
import { fetchPlaces, createPlace, fetchPlace, updatePlace, removePlace,fetchPlacesUpward } from '../repositories/placesRepository.js';

// Controlador para obtener todos los lugares
export const getPlaces = async () => {
    return await fetchPlaces();
}

// Controlador para crear un nuevo lugar.
export const postPlace = async (place) => {
    // Verifica si el ID del lugar fue proporcionado
    if (!place.id) throw new Error('El ID del lugar es requerido');

    // Verifica si el lugar ya existe con el mismo ID
    const existingPlace = await fetchPlace(place.id);
    if (existingPlace) throw new Error('El ID del lugar ya existe');

    // Si todo es válido, crea el nuevo lugar
    return await createPlace(place);
};

// Controlador para obtener un lugar en específico basado en su ID
export const getPlace = async (id) => {
    //Obtiene el lugar basado en el ID proporcionado
    return await fetchPlace(id);
}

// Controlador para actualizar un lugar basado en su ID
export const putPlace = async (id, place) => {
    //Actualiza el lugar con la información proporcionada
    return await updatePlace(id, place);
}

// Controlador para eliminar un lugar basado en su ID
export const deletePlace = async (id) => {
    //Elimina el lugar con el ID proporcionado
    return await removePlace(id);
}

// Controlador para obtener lugares en orden ascendente o con un criterio específico de búsqueda
export const getPlacesUpdward = async ()  =>{
    // Llamando a la función fetchPlacesUpward del repositorio
    return await fetchPlacesUpward();

}
