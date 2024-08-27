import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Interfaz que define la estructura de un lugar favorito
interface FavoritePlace {
    id: string;
    nombre: string;
    distancia: number;
    lat: number;
    lon: number;
    imagen: string;
}

const Historial: React.FC = () => {
    // Estado para almacenar la lista de lugares favoritos
    const [favorites, setFavorites] = useState<FavoritePlace[]>([]);
    // Estado para almacenar el nombre de usuario
    const [username, setUsername] = useState<string>(''); // Puedes usar un valor fijo para pruebas o integrarlo con el estado de autenticación


    // Hook useEffect que se ejecuta cuando el estado de username cambia
    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                // Llamada a la API para obtener los lugares favoritos del usuario
                const response = await axios.get(`/usuarios/${username}/favorites`);
                setFavorites(response.data);// Actualiza el estado con la lista de favoritos
            } catch (error) {
                console.error('Error fetching favorites:', error);
            }
        };
        // Solo se ejecuta la función fetchFavorites si username no está vacío
        if (username) {
            fetchFavorites();
        }
    }, [username]);

    return (
        <div>
            <h1>Historial de Favoritos</h1>
            <ul>
                {favorites.map((place) => (
                    <li key={place.id}>
                        <h2>{place.nombre}</h2>
                        <img src={place.imagen} alt={place.nombre} />
                        <p>Distancia: {place.distancia} km</p>
                    </li>
                ))}
            </ul>
        </div>
        
    );
};

export default Historial;
