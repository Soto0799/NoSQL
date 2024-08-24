import { ChangeEvent, ReactNode, useState, useRef, MouseEvent } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Login.module.css';
import {setRol} from '../util/storage';

const Login = ({ onLogin, ...props }): ReactNode => {
    const password = useRef<HTMLInputElement | null>(null);
    const [username, setUsername] = useState("");
   
    const onUsernameHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        const input: HTMLInputElement = e.target as HTMLInputElement;
        setUsername(input.value);
    };

    const onClickHandler = async (e: MouseEvent): Promise<void> => {
        const passwordInput: HTMLInputElement = password.current as HTMLInputElement;
        const passwordValue: string = passwordInput.value;
    
        const credentials = {
            username,
            password: passwordValue
        };
    
        try {
            const response: Response = await fetch('http://127.0.0.1:3443/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });
    
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