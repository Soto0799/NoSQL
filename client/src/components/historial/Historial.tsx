import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface FavoritePlace {
    id: string;
    nombre: string;
    distancia: number;
    lat: number;
    lon: number;
    imagen: string;
}

const Historial: React.FC = () => {
    const [favorites, setFavorites] = useState<FavoritePlace[]>([]);
    const [username, setUsername] = useState<string>(''); // Puedes usar un valor fijo para pruebas o integrarlo con el estado de autenticación

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await axios.get(`/usuarios/${username}/favorites`);
                setFavorites(response.data);
            } catch (error) {
                console.error('Error fetching favorites:', error);
            }
        };

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
