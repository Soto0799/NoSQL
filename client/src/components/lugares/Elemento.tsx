import React from 'react'; 
import styles from './Elemento.module.css'; // Importa los estilos CSS

const Elemento = ({ lugar, onFavoritoToggle, isLoggedIn }) => {
    return (
        <div
            // Aplica estilos al elemento. Si el lugar es favorito, añade una clase CSS adicional.
            className={`${styles.elemento} ${lugar.esFavorito ? styles.favorito : ''}`}
            // Define un evento onClick que llama a la función onFavoritoToggle con el id del lugar.
            onClick={() => onFavoritoToggle(lugar.id)}
        >
            {isLoggedIn && lugar.imagen && (
                // Si el usuario está conectado y el lugar tiene una imagen, muestra la imagen.
                <img src={lugar.imagen} alt={lugar.nombre} className={styles.imagen} />
            )}
            <h3>{lugar.nombre}</h3> {/* Muestra el nombre del lugar en un encabezado h3. */}
            <p>{lugar.descripcion}</p> {/* Muestra la descripción del lugar en un párrafo. */}
            <p>Seleccionado {lugar.seleccionCount} veces</p> {/* Muestra cuántas veces ha sido seleccionado el lugar. */}
        </div>
    );
};

export default Elemento;
