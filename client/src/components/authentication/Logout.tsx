import { removeToken ,removeRol} from '../util/storage';

//Logout, maneja el cierre de sesión de usuarios
const Logout = () => {

    // Manejador para el clic en el botón de cierre de sesión
    const onLogoutClickHandler = (): void => {
        // Eliminar el token y el rol del usuario del almacenamiento local
        removeToken();
        removeRol();

    };

    return (
        <button onClick={onLogoutClickHandler}>Logout</button>
    );

};

export default Logout;