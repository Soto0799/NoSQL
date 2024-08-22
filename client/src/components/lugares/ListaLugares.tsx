import React from 'react';
import Elemento from './Elemento';
import styles from './ListaLugares.module.css';

// Define el componente funcional ListaLugares que acepta props: lugares, onFavoritoToggle e isLoggedIn
const ListaLugares = ({ lugares, onFavoritoToggle, isLoggedIn }) => {
    return (
        <div className={styles.listaLugares}>
            {lugares.map(lugar => (
                <Elemento
                key={lugar.id} // Utiliza el ID del lugar como clave única para cada componente Elemento
                lugar={lugar} // Pasa el objeto lugar como prop "lugar" al componente Elemento
                onFavoritoToggle={onFavoritoToggle} // Pasa la función onFavoritoToggle como prop para manejar el cambio de favorito
                isLoggedIn={isLoggedIn} // Pasa el estado de autenticación como prop para condicionar la visualización
            />
            ))}
        </div>
    );
};

export default ListaLugares;
