import { removeToken ,removeRol} from '../util/storage';

const Logout = () => {

    // Manejador para el clic en el botón de cierre de sesión
    const onLogoutClickHandler = (): void => {

        removeToken();
       removeRol();

    };

    return (
        <button onClick={onLogoutClickHandler}>Logout</button>
    );

};

export default Logout;