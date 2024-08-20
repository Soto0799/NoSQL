import React from 'react';
import Elemento from './Elemento';
import styles from './ListaLugares.module.css';

const ListaFavoritos = ({ favoritos, onFavoritoToggle, isLoggedIn }) => {
    return (
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
