import { ChangeEvent, ReactNode, useState, useRef, MouseEvent } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Login.module.css';
import {setRol} from '../../util/storage';

// Define el componente funcional Login que acepta props y una función onLogin
const Login = ({ onLogin, ...props }): ReactNode => {
    const password = useRef<HTMLInputElement | null>(null);
    const [username, setUsername] = useState("");

// Maneja el cambio en el campo de nombre de usuario   
    const onUsernameHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        const input: HTMLInputElement = e.target as HTMLInputElement;
        setUsername(input.value);
    };
// Maneja el clic en el botón de inicio de sesión
    const onClickHandler = async (e: MouseEvent): Promise<void> => {
        const passwordInput: HTMLInputElement =
            password.current as HTMLInputElement;
        const passwordValue: string = passwordInput.value;

        const credentials = {
            username,
            password: passwordValue
        };

        const response: Response = await fetch('http://127.0.0.1:3443/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });


// Si la respuesta no es exitosa, muestra un mensaje de error
        if (!response.ok) {
            console.log('Failed to login');
            toast.error('Error: No se pudo iniciar sesión'); // Notificación de error
            return;
        }else{

            console.log(response);

        }

        const data = await response.json();

        

        //Agarro el user rol 
        const userRol = data.data.rol;
       
        //lo mandamos a el storage
        setRol(userRol);
        
        
 // Si la respuesta indica que no fue exitosa, muestra un mensaje de error
        if (!data.success) {
            console.log(data.message);
            toast.error(`Error: ${data.message}`); // Notificación de error con mensaje del servidor
            window.location.reload();
            return;
        }
// Si hay un token en la respuesta, llama a la función onLogin y muestra una notificación de éxito
        const token = data.data.token;
        if (token) {
            onLogin(token);
            toast.success('¡Inicio de sesión exitoso!'); // Notificación de éxito
            window.location.reload();

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
