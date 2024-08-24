import React from 'react';
import Elemento from './Elemento';
import styles from './ListaLugares.module.css';

const ListaLugares = ({ lugares, onFavoritoToggle, isLoggedIn }) => {
    return (
        <div className={styles.listaLugares}>
            {lugares.map(lugar => (
                <Elemento
                    key={lugar.id}
                    lugar={lugar}
                    onFavoritoToggle={onFavoritoToggle}
                    isLoggedIn={isLoggedIn}
                />
            ))}
        </div>
    );
};

export default ListaLugares;
