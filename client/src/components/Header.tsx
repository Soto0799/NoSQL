import { useRef, useState, useEffect } from 'react';
import { getToken } from '../util/storage.tsx'; // Para obtener el token de autenticación
import Login from './authentication/Login.tsx'; // Componente para el login
import Register from './authentication/Register.tsx'; // Componente para el registro
import AddStudent from './estudiantes/AddStudent.tsx'; // Componente para añadir un estudiante
import Logout from './authentication/Logout.tsx'; // Componente para el logout
import Dialog from './common/Dialog.tsx'; // Componente de diálogo
import styles from './Header.module.css'; // Estilos para el header

function Header() {
    // Estados para saber si los modales están abiertos o cerrados
    const [isLoginOpened, setIsLoginOpened] = useState(false);
    const [openRegisterModal, setOpenRegisterModal] = useState(false);
    const [openAddStudentModal, setOpenAddStudentModal] = useState(false); // Estado para añadir un estudiante
    const [openLogoutModal, setOpenLogoutModal] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Referencias para los modales, para poder manejarlos fácilmente
    const login = useRef<HTMLDivElement>(null);
    const register = useRef<HTMLDivElement>(null); // Referencia para el modal de registro
    const addStudent = useRef<HTMLDivElement>(null);
    const logout = useRef<HTMLDivElement>(null);

    let token: string | null = getToken();

    useEffect(() => {
        if (token && token.toString().trim().length > 0) {
            setIsLoggedIn(true);
        }
    }, [token]);

    // Funciones para abrir los modales
    const onLoginOpenHandler = () => {
        console.log('onLoginOpenHandler');
        setIsLoginOpened(true);
    }

    const onRegisterHandler = () => {
        console.log('Abriendo modal de registro');
        setOpenRegisterModal(true); // Abrimos el modal de registro
    };

    const onAddStudentHandler = () => {
        console.log('Abriendo modal para añadir estudiante');
        setOpenAddStudentModal(true); // Abrimos el modal para añadir estudiante
    };

    const onLogoutHandler = () => {
        console.log('Abriendo modal para cerrar sesión');
        setOpenLogoutModal(true); // Abrimos el modal para cerrar sesión    
    };

    // Funciones para cerrar los modales
    const onLoginCloseHandler = () => {
        console.log('onLoinCloseHandler');
        setIsLoginOpened(false);
    }
    const onCloseRegisterHandler = () => {
        console.log('Cerrando modal de registro');
        setOpenRegisterModal(false); // Cerramos el modal de registro
    };

    const onCloseAddStudentHandler = () => {
        console.log('Cerrando modal para añadir estudiante');
        setOpenAddStudentModal(false); // Cerramos el modal para añadir estudiante
    };

    const onCloseLogoutHandler = () => {
        console.log('Cerrando modal para cerrar sesión');
        setOpenLogoutModal(false); // Cerramos el modal para cerrar sesión
    };

    const onLogin = (value: string): void => {
        token = value;
        localStorage.setItem('token', token as string);
    }
    return (
        <header className={styles.headerContainer}>
            <div className={styles.overlay}>
                <div className={styles.headerContent}>
                    <h1 className={styles.title}>Encuentra tu próximo viaje</h1>
                    <p className={styles.subtitle}>Bienvenido </p>
                    <div className={styles.buttonContainer}>
                        {token ? (
                            <>
                                <button className={styles.button} onClick={onAddStudentHandler}>Añadir destino</button>
                                <Dialog title="Añadir estudiante" open={openAddStudentModal} onClose={onCloseAddStudentHandler}>
                                    <AddStudent />
                                </Dialog>
                                <button className={styles.button} onClick={onLogoutHandler}>Cerrar sesión</button>
                                <Dialog title="Cerrar sesión" open={openLogoutModal} onClose={onCloseLogoutHandler}>
                                    <Logout />
                                </Dialog>
                            </>
                        ) : (
                            <>
                                <button className={styles.button} onClick={onRegisterHandler}>Registrarse</button>
                                <Dialog title="Registrarse" open={openRegisterModal} onClose={onCloseRegisterHandler}>
                                    <Register />
                                </Dialog>
                                <button className={styles.button} onClick={onLoginOpenHandler}>Iniciar Sesion</button>
                                <Dialog title="Login" open={isLoginOpened} onClose={onLoginCloseHandler}>
                                    <Login onLogin={onLogin} />
                                </Dialog>

                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;