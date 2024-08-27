import React from 'react';
import Elemento from './Elemento';
import styles from './ListaLugares.module.css';

// Componente para mostrar una lista de lugares
const ListaLugares = ({ lugares, onFavoritoToggle, isLoggedIn }) => {
    return (
        //Mapea los lugares y renderiza un componente Elemento para cada uno
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
