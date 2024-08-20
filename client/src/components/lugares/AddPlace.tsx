import React, { useState } from 'react';
import { getToken } from '../../util/storage';

const AddPlace = () => {
    // Estado local para almacenar el nombre y la ubicación del lugar
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');

    // Obtiene el token de autenticación del almacenamiento
    const token = getToken();

    // Maneja el evento de envío del formulario
    const onSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault(); // Evita la recarga de la página

        // Verifica que los campos obligatorios no estén vacíos
        if (!name || !location) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        // Prepara los datos del lugar para enviar al backend
        const placeData = {
            name,
            location: {
                lat: 0, // Se deben obtener las coordenadas reales
                lon: 0, // Se deben obtener las coordenadas reales
                image: "", // URL de la imagen del lugar
            },
            timestamp: new Date().toISOString(), // Marca temporal de la creación
        };

        try {
            // Envía los datos del lugar al backend
            const response = await fetch('http://127.0.0.1:3443/places', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Incluye el token de autenticación
                },
                body: JSON.stringify(placeData),
            });

            // Maneja la respuesta del backend
            if (!response.ok) {
                alert('Error al agregar el lugar turístico');
                return;
            }

            alert('Lugar turístico agregado con éxito');
        } catch (error) {
            // Manejo de errores en caso de fallo en la solicitud
            alert('Error al conectar con el servidor');
        }
    };

    return (
        <form onSubmit={onSubmitHandler}>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nombre del lugar"
                required
            />
            <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Ubicación (latitud, longitud)"
                required
            />
            <button type="submit">Agregar Lugar</button>
        </form>
    );
}

export default AddPlace;
