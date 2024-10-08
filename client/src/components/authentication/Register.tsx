import { ChangeEvent, ReactNode, useState, useRef, MouseEvent } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Register.module.css';

// Componente de Registro que maneja el registro de nuevos usuarios
const Usuarios = ({ ...props }): ReactNode => {
    // Referencias para los campos del formulario
    const usernameRef = useRef<HTMLInputElement | null>(null);
    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const confirmPasswordRef = useRef<HTMLInputElement | null>(null);

    // Estados para almacenar los valores de los campos
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isRegistered, setIsRegistered] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(true);

     // Funciones para manejar el cambio en los campos del formulario
    const onUsernameHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        const input: HTMLInputElement = e.target as HTMLInputElement;
        setUsername(input.value);
    };

    const onEmailHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        const input: HTMLInputElement = e.target as HTMLInputElement;
        setEmail(input.value);
    };

    const onPasswordHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        const input: HTMLInputElement = e.target as HTMLInputElement;
        setPassword(input.value);
    };

    const onConfirmPasswordHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        const input: HTMLInputElement = e.target as HTMLInputElement;
        setConfirmPassword(input.value);
    };

    // Manejador para el clic en el botón de registro
    const onClickHandler = async (e: MouseEvent): Promise<void> => {
        try {
            // Verificar si las contraseñas coinciden
            if (password !== confirmPassword) {
                setPasswordsMatch(false);
                return;
            }

            setPasswordsMatch(true);

            // Credenciales que se enviarán al servidor
            const credentials = {
                username,
                email,
                password,
                active: true,
                rol:'cliente'
            };

            // Enviar solicitud POST para registrar al usuario
            const response: Response = await fetch('http://127.0.0.1:3443/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });

            // Verificar si la respuesta fue exitosa
            if (!response.ok) {
                console.log('Failed to register');
                toast.error('Error: No se pudo registrar al usuario'); // Notificación de error
                return;
            }

            const data = await response.json();
            if (data.success === false) {
                console.log(data.message);
                toast.error(`Error: ${data.message}`); // Notificación de error con mensaje del servidor
                return;
            }

            setIsRegistered(true);
            toast.success('¡Usuario registrado correctamente!'); // Notificación de éxito
            window.location.reload();
        } catch (error) {
            console.error('Unexpected error:', error);
            toast.error('Error inesperado al registrar el usuario.');
        }
    };

    return (
        <>
            {!isRegistered && (
                <div {...props} className={styles.registerContainer}>
                    <h2 className={styles.registerTitle}>Registrarse</h2>
                    <div className={styles.registerForm}>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            placeholder="User Name"
                            id="username"
                            name="username"
                            ref={usernameRef}
                            onChange={onUsernameHandler}
                            required
                        />

                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            placeholder="Email"
                            id="email"
                            name="email"
                            ref={emailRef}
                            onChange={onEmailHandler}
                            required
                        />

                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            placeholder="Password"
                            id="password"
                            name="password"
                            ref={passwordRef}
                            onChange={onPasswordHandler}
                            required
                        />

                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            id="confirmPassword"
                            name="confirmPassword"
                            ref={confirmPasswordRef}
                            onChange={onConfirmPasswordHandler}
                            required
                        />

                        {!passwordsMatch && (
                            <p style={{ color: 'red' }}>Las contraseñas no coinciden</p>
                        )}

                        <button type="button" onClick={onClickHandler} className={styles.registerButton}>
                            Register
                        </button>
                    </div>
                </div>
            )}
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

export default Usuarios;
