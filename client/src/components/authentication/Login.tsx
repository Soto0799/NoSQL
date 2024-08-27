import { ChangeEvent, ReactNode, useState, useRef, MouseEvent } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Login.module.css';
import {setRol} from '../util/storage';

//Login que maneja el inicio de sesión de usuarios
const Login = ({ onLogin, ...props }): ReactNode => {
    //Referencia para el campo de contraseña
    const password = useRef<HTMLInputElement | null>(null);
    // Estado para almacenar el nombre de usuario
    const [username, setUsername] = useState("");
   
    // Función que maneja el cambio en el campo de nombre de usuario
    const onUsernameHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        const input: HTMLInputElement = e.target as HTMLInputElement;
        setUsername(input.value);
    };

    // Función que maneja el clic en el botón de login
    const onClickHandler = async (e: MouseEvent): Promise<void> => {
        const passwordInput: HTMLInputElement = password.current as HTMLInputElement;
        const passwordValue: string = passwordInput.value;
    
        // Credenciales que se enviarán al servidor
        const credentials = {
            username,
            password: passwordValue
        };
    
        try {// Enviar solicitud POST para autenticar al usuario
            const response: Response = await fetch('http://127.0.0.1:3443/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });
    
            // Verificar si la respuesta fue exitosa
            if (!response.ok) {
                console.log('Failed to login');
                toast.error('Error: No se pudo iniciar sesión'); // Notificación de error
                return;
            }
    
            const data = await response.json();
    
            // Agarro el user rol 
            const userRol = data.data.rol;
    
            // Lo mandamos al storage
            setRol(userRol);
    
            if (!data.success) {
                console.log(data.message);
                toast.error(`Error: ${data.message}`); // Notificación de error con mensaje del servidor
                window.location.reload();
                return;
            }
    
            const token = data.data.token;
            if (token) {
                // Guarda el token en localStorage
                localStorage.setItem('token', token);
    
                // Llama a la función onLogin con el token
                onLogin(token);
    
                toast.success('¡Inicio de sesión exitoso!'); // Notificación de éxito
                window.location.reload();
            }
        } catch (error) {
            console.error('Error during login:', error);
            toast.error('Error: Ocurrió un problema al intentar iniciar sesión');
        }
    };

    return (
        <>
            <div {...props} className={styles.loginContainer}>
                <div className={styles.loginBox}>
                    <h2 className={styles.loginTitle}>Iniciar sesión</h2>
                    <p className={styles.loginSubtitle}>
                        ¿Es tu primera vez? <a href="/register" className={styles.registerLink}>Regístrate</a>
                    </p>
                    <input type="text"
                        placeholder="User Name"
                        id="username"
                        name="username"
                        value={username}
                        onChange={onUsernameHandler}
                        required
                    />

                    <input type="password"
                        placeholder="Password"
                        id="password"
                        name="password"
                        ref={password}
                        required
                    />

                    <button type="button" onClick={onClickHandler}>
                        Login
                    </button>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={3000} // Cierra automáticamente en 3 segundos
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    );
};

export default Login;