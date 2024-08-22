import React from 'react';
import styles from './Elemento.module.css';

// Define el componente funcional Elemento que acepta props: lugar, onFavoritoToggle e isLoggedIn
const Elemento = ({ lugar, onFavoritoToggle, isLoggedIn }) => {
    return (
        <div
            className={`${styles.elemento} ${lugar.esFavorito ? styles.favorito : ''}`}
            onClick={() => onFavoritoToggle(lugar.id)}
        >
            {isLoggedIn && lugar.imagen && (
                <img src={lugar.imagen} alt={lugar.nombre} className={styles.imagen} />
            )}
            <h3>{lugar.nombre}</h3>
            <p>{lugar.descripcion}</p>
            <p>Seleccionado {lugar.seleccionCount} veces</p>
        </div>
    );
};

export default Elemento;
