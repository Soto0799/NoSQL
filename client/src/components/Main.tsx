import React, { useState, useEffect } from 'react';
import styles from './Main.module.css';
import ListaLugares from './lugares/ListaLugares';
import ListaFavoritos from './lugares/ListaFavoritos';

interface MainProps {
    isLoggedIn: boolean;
}

// Ubicación quemada (fija) para calcular la distancia
const userLocation = { lat: 19.432608, lon: -99.133209 }; // Ciudad de México, por ejemplo

const Main: React.FC<MainProps> = ({ isLoggedIn }) => {
    const [lugares, setLugares] = useState<any[]>([]);
    const [favoritos, setFavoritos] = useState<any[]>([]);

    useEffect(() => {
        const fetchLugares = async () => {
            try {
                const response = await fetch('http://127.0.0.1:3443/places');
                const data = await response.json();

                // Calcular la distancia para cada lugar
                const lugaresConDistancia = data.map(lugar => {
                    lugar.distancia = calcularDistancia(userLocation.lat, userLocation.lon, lugar.lat, lugar.lon);
                    return lugar;
                });

                // Ordenar los lugares por distancia
                const lugaresOrdenados = ordenarPorDistancia(lugaresConDistancia);

                setLugares(lugaresOrdenados);
            } catch (error) {
                console.error('Error al cargar los lugares:', error);
            }
        };

        if (isLoggedIn) {
            fetchLugares();
        }
    }, [isLoggedIn]);

    const calcularDistancia = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
        const R = 6371; // Radio de la Tierra en kilómetros
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Devuelve la distancia en kilómetros
    };

    // Ordena los lugares según la distancia desde la ubicación del usuario
    const ordenarPorDistancia = (lista: any[]) => {
        return lista.sort((a, b) => a.distancia - b.distancia);
    };

    const actualizarSeleccionCount = async (lugar) => {
        try {
            const response = await fetch(`http://127.0.0.1:3443/places/${lugar.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    seleccionCount: lugar.seleccionCount, // Solo se manda el campo que se va a actualizar
                }),
            });

            if (!response.ok) {
                throw new Error('Error al actualizar el seleccionCount en la base de datos');
            }

            console.log('SeleccionCount actualizado en la base de datos');
        } catch (error) {
            console.error('Error al actualizar seleccionCount en la base de datos:', error);
        }
    };

    const onFavoritoToggle = async (id: string) => {
        setLugares((prevLugares) => {
            const lugarEnLugares = prevLugares.find(l => l.id === id);
            if (lugarEnLugares) {
                lugarEnLugares.esFavorito = true;
                lugarEnLugares.seleccionCount += 1;
                actualizarSeleccionCount(lugarEnLugares); // Llamada sin await para no bloquear la UI
                setFavoritos((prevFavoritos) => ordenarPorDistancia([...prevFavoritos, lugarEnLugares])); // Ordenar favoritos por distancia
                return ordenarPorDistancia(prevLugares.filter(l => l.id !== id));  // Reordenar después de modificar la lista
            }
            return prevLugares;
        });

        setFavoritos((prevFavoritos) => {
            const lugarEnFavoritos = prevFavoritos.find(f => f.id === id);
            if (lugarEnFavoritos) {
                lugarEnFavoritos.esFavorito = false;
                setLugares((prevLugares) => ordenarPorDistancia([...prevLugares, lugarEnFavoritos]));  // Reordenar después de modificar la lista
                return ordenarPorDistancia(prevFavoritos.filter(f => f.id !== id)); // Ordenar favoritos por distancia
            }
            return prevFavoritos;
        });
    };

    return (
        <div className={styles.container}>
            {isLoggedIn ? (
                <>
                    <h2>Favoritos</h2>
                    <div className={styles.listaFavoritos}>
                        <ListaFavoritos
                            favoritos={favoritos}
                            onFavoritoToggle={onFavoritoToggle}
                            isLoggedIn={isLoggedIn}
                        />
                    </div>

                    <h2>Lista de Lugares</h2>
                    <div className={styles.listaLugares}>
                        <ListaLugares
                            lugares={lugares}
                            onFavoritoToggle={onFavoritoToggle}
                            isLoggedIn={isLoggedIn}
                        />
                    </div>
                </>
            ) : (
                <p>Por favor, inicia sesión para ver los lugares y favoritos.</p>
            )}
        </div>
    );
};

export default Main;
