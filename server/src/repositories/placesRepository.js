import { collection } from './database.js';

export const fetchPlaces = async () => {
    const places = await collection('places');
    const results = places.find().toArray();
    return results;
}

export const createPlace = async (place) => {
    const places = await collection('places');
    const result = await places.insertOne(place);
    return result;
}

export const fetchPlace = async (name = '') => {
    const places = await collection('places');
    const results = await places.findOne({ 'name': name });
    return results;
}

export const updatePlace = async (name, place) => {
    const places = await collection('places');
    const result = await places.updateOne({ 'name': name }, { $set: place});
    return result;
}

export const removePlace = async (name) => {
    const places = await collection('places');
    const result = await places.deleteOne({ 'name': name });
    return result;
}