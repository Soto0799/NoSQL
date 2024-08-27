import React from 'react';
import Elemento from './Elemento';
import styles from './ListaLugares.module.css';

// Componente para mostrar una lista de lugares favoritos
const ListaFavoritos = ({ favoritos, onFavoritoToggle, isLoggedIn }) => {
    return (
        //Mapea los lugares favoritos y renderiza un componente Elemento para cada uno
        <div className={styles.listaLugares}>
            {favoritos.map(favorito => (
                <Elemento
                    key={favorito.id}
                    lugar={favorito}
                    onFavoritoToggle={onFavoritoToggle}
                    isLoggedIn={isLoggedIn}
                />
            ))}
        </div>
    );
};

export default ListaFavoritos;
