import { useState, useEffect } from 'react';
import { getToken, setToken, removeToken, getRol } from './util/storage.tsx';
import Login from './authentication/Login';
import Register from './authentication/Register';
import AddPlace from './lugares/AddPlace.tsx';
import Dialog from './common/Dialog';
import styles from './Header.module.css';
import { Link, useNavigate } from 'react-router-dom';


function Header() {
    // Estado para manejar la visibilidad del modal de inicio de sesión
    const [isLoginOpened, setIsLoginOpened] = useState(false);
    // Estado para manejar la visibilidad del modal de registro
    const [openRegisterModal, setOpenRegisterModal] = useState(false);
    // Estado para manejar la visibilidad del modal para añadir un lugar
    const [openAddPlaceModal, setOpenAddPlaceModal] = useState(false); // Estado para añadir un lugar
    // const [openReportModal, setOpenReportModal] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // Estado para almacenar el rol del usuario
    const [userRole, setUserRole] = useState<string | null>(null);
    // Hook para redireccionar a diferentes rutas
    const navigate = useNavigate();


    // Función para manejar el inicio de sesión
    const handleLogin = (authToken: string) => {
        setToken(authToken);
        setIsLoggedIn(true);
        setIsLoginOpened(false);
        const rol = getRol();
        setUserRole(rol);
    };

    // Hook para verificar el token al cargar el componente
    useEffect(() => {
        const token = getToken();
        if (token) {
            setIsLoggedIn(true);
            const rol = getRol();
            setUserRole(rol);
        } else {
            // Si no hay token, redirige a la página de inicio
            navigate('/');

        }

    }, [navigate]);
    // Función para manejar el cierre de sesión
    const handleLogout = () => {
        removeToken();
        setIsLoggedIn(false);
        setUserRole(null);
    };

    // Función para abrir el modal de añadir lugar
    const onAddPlaceHandler = () => {
        console.log('Abriendo modal para añadir destino');
        setOpenAddPlaceModal(true); // Abrimos el modal para añadir lugar
    };

    // Función para cerrar el modal de añadir lugar
    const onCloseAddPlaceHandler = () => {
        setOpenAddPlaceModal(false);
    };


    return (

        <header className={styles.headerContainer}>
            <div className={styles.overlay}>
                <div className={styles.headerContent}>
                    <h1 className={styles.title}>Encuentra tu próximo viaje</h1>
                    <p className={styles.subtitle}>Bienvenido</p>
                    <div className={styles.buttonContainer}>
                        {isLoggedIn ? (
                            <>
                        
                                <button className={styles.button} onClick={handleLogout}>Cerrar sesión</button>
                                {userRole !== 'cliente' && (


                                    <button className={styles.button} ><Link to="/reportes" className={styles.button}>Reportes de Lugares</Link></button>


                                )}

                                {userRole !== 'cliente' && (

                                    <button className={styles.button} ><Link to="/usuarios" className={styles.button}>Reporte de Usuarios</Link></button>


                                )}

                                {userRole !== 'cliente' && (
                                    <>
                                        <button className={styles.button} onClick={onAddPlaceHandler}>Añadir destino</button>
                                        <Dialog title="Añadir destino" open={openAddPlaceModal} onClose={onCloseAddPlaceHandler}>
                                            <AddPlace />
                                        </Dialog>
                                    </>
                                )}
                                
                                <button className={styles.button}><Link to="/" className={styles.button}>Inicio</Link></button>

                            </>
                        ) : (
                            <>
                                <button className={styles.button} onClick={() => setIsLoginOpened(true)}>Iniciar sesión</button>
                                <Dialog title="Iniciar sesión" open={isLoginOpened} onClose={() => setIsLoginOpened(false)}>
                                    <Login onLogin={handleLogin} />
                                </Dialog>
                                <button className={styles.button} onClick={() => setOpenRegisterModal(true)}>Registrarse</button>
                                <Dialog title="Registrarse" open={openRegisterModal} onClose={() => setOpenRegisterModal(false)}>
                                    <Register />
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