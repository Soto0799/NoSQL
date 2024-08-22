import React from 'react';
import Elemento from './Elemento';
import styles from './ListaLugares.module.css';

// Define el componente funcional ListaFavoritos que acepta props: favoritos, onFavoritoToggle e isLoggedIn
const ListaFavoritos = ({ favoritos, onFavoritoToggle, isLoggedIn }) => {
    return (
        <div className={styles.listaLugares}>
            {favoritos.map(favorito => (
                <Elemento
                key={favorito.id} // Utiliza el ID del favorito como clave única para cada componente Elemento
                lugar={favorito} // Pasa el objeto favorito como prop "lugar" al componente Elemento
                onFavoritoToggle={onFavoritoToggle} // Pasa la función onFavoritoToggle como prop para manejar el cambio de favorito
                isLoggedIn={isLoggedIn} // Pasa el estado de autenticación como prop para condicionar la visualización
            />
            ))}
        </div>
    );
};

export default ListaFavoritos;
