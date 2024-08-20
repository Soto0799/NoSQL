import React, { useState, useEffect } from 'react';
import { getToken, setToken, removeToken ,getRol} from '../util/storage';
import Login from './authentication/Login';
import Register from './authentication/Register';
import Dialog from './common/Dialog';
import styles from './Header.module.css';
import {Link ,useNavigate} from 'react-router-dom';


function Header() {
    const [isLoginOpened, setIsLoginOpened] = useState(false);
    const [openRegisterModal, setOpenRegisterModal] = useState(false);
   // const [openReportModal, setOpenReportModal] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState<string | null>(null);
    const navigate = useNavigate();


    const handleLogin = (authToken: string) => {
        setToken(authToken);
        setIsLoggedIn(true);
        setIsLoginOpened(false);
        const rol = getRol();
        setUserRole(rol);
    };

    useEffect(() => {
        const token = getToken();
        if (token) {
            setIsLoggedIn(true);
            const rol = getRol();
            setUserRole(rol);
        }else{

            navigate('/');

        }
    
    }, [navigate]);

    const handleLogout = () => {
        removeToken();
        setIsLoggedIn(false);
        setUserRole(null);
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

                                    <button  className={styles.button} ><Link to="/reportes"  className={styles.button}>Reportes de Lugares</Link></button>
                                    

                                )}

                                {userRole !== 'cliente' && (

                                    <button  className={styles.button} ><Link to="/usuarios"  className={styles.button}>Reporte de Usuarios</Link></button>


                                )}
                                <button  className={styles.button} ><Link to="/historial"  className={styles.button}>Historial</Link></button>                           
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