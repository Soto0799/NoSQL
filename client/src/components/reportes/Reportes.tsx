import React, { useEffect, useState } from 'react';
import styles from './Reportes.module.css'; 

const Reportes: React.FC = () => {
    const [listaPlaces, setListaPlaces] = useState<any[]>([]); 

    useEffect(() => {
        const fetchReportes = async () => {
            try {
                // Realiza una solicitud a la API para obtener los datos
                const response = await fetch('http://127.0.0.1:3443/places/upward');

                // Verifica si la respuesta es exitosa
                if (!response.ok) {
                    throw new Error('Error al obtener los datos');
                }

                // Convierte la respuesta en formato JSON
                const data = await response.json();
                // Actualiza el estado con los datos obtenidos
                setListaPlaces(data);
            } catch (error) {
                // Manejo de errores en caso de fallo en la solicitud
                console.error('Error al cargar los reportes:', error);
            }
        };

        // Llama a la función para obtener los reportes
        fetchReportes();
    }, []); 

    return (
        <div className={styles.container}>
            <h2>Top Click Places</h2>
            <div className={styles.tarjeta}>
                {listaPlaces.length === 0 ? (
                    <p className={styles.noplaces}>No hay lugares favoritos disponibles</p>
                ) : (
                    listaPlaces.map((lugar) => (
                        <div key={lugar.id} style={{ width: '400px' }}>
                            <h1 className={styles.titulo}>{lugar.nombre}</h1>
                           <div className={styles.cuerpo}>
                            <img 
                                src={lugar.imagen} 
                                alt={lugar.nombre} 
                                
                                style={{ width: '100%', borderRadius: '8px' }} 
                            />
                            </div>
                            <p className={styles.pie}>Cantidad de Clicks: {lugar.seleccionCount}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    
    );
};

export default Reportes;
