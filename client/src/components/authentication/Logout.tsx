import { removeToken } from '../../util/storage';

const Logout = () => {

    // Manejador para el clic en el botón de cierre de sesión
    const onLogoutClickHandler = (): void => {
       
        removeToken();
        window.location.reload(); // Recarga la página para reflejar el cambio
    };

    return (
        <button onClick={onLogoutClickHandler}>Logout</button>
    );
};

export default Logout;