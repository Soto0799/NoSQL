import { ChangeEvent, ReactNode, useState, useRef, MouseEvent } from 'react';
import styles from './Register.module.css';

const usuarios = ({ ...props }): ReactNode => {
    // Referencias para los campos del formulario
    const usernameRef = useRef<HTMLInputElement | null>(null);
    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const confirmPasswordRef = useRef<HTMLInputElement | null>(null);

    // Estados para gestionar los valores de los campos y el estado de registro
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isRegistered, setIsRegistered] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(true); // Estado para verificar coincidencia de contraseñas

    // Función que maneja el cambio en el campo de nombre de usuario
    const onUsernameHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        const input: HTMLInputElement = e.target as HTMLInputElement; // Obtiene el campo de nombre de usuario del evento
        setUsername(input.value); // Actualiza el estado con el valor del campo
    };

    // Función que maneja el cambio en el campo de correo electrónico
    const onEmailHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        const input: HTMLInputElement = e.target as HTMLInputElement; // Obtiene el campo de correo electrónico del evento
        setEmail(input.value); // Actualiza el estado con el valor del campo
    };

    // Función que maneja el cambio en el campo de contraseña
    const onPasswordHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        const input: HTMLInputElement = e.target as HTMLInputElement; // Obtiene el campo de contraseña del evento
        setPassword(input.value); // Actualiza el estado con el valor del campo
    };

    // Función que maneja el cambio en el campo de confirmación de contraseña
    const onConfirmPasswordHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        const input: HTMLInputElement = e.target as HTMLInputElement; // Obtiene el campo de confirmación de contraseña del evento
        setConfirmPassword(input.value); // Actualiza el estado con el valor del campo
    };

    // Función que maneja el clic en el botón de registro
    const onClickHandler = async (e: MouseEvent): void => {
        // Verifica si las contraseñas coinciden
        if (password !== confirmPassword) {
            setPasswordsMatch(false); // Establece el estado a falso si las contraseñas no coinciden
            return; // Sale de la función si las contraseñas no coinciden
        }

        // Establece el estado a verdadero si las contraseñas coinciden
        setPasswordsMatch(true);

        const credentials = {
            username,
            email,
            password,
            active: true
        };

        // Envia una solicitud POST al servidor para registrar al usuario
        const response: Response = await fetch('http://127.0.0.1:3443/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials) // Envía las credenciales en el cuerpo de la solicitud
        });

        if (!response.ok) {
            console.log('Failed to register'); // Mensaje de error si la solicitud falla
            return;
        }

        const data = await response.json(); // Obtiene la respuesta JSON del servidor
        if (!data.success) {
            console.log(data.message); // Mensaje de error si la respuesta del servidor indica fallo
            return;
        }

        setIsRegistered(true); // Establece el estado a verdadero si el registro es exitoso
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
                            ref={usernameRef} // Asigna la referencia al campo de nombre de usuario
                            onChange={onUsernameHandler} // Maneja el cambio en el campo de nombre de usuario
                            required
                        />

                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            placeholder="Email"
                            id="email"
                            name="email"
                            ref={emailRef} // Asigna la referencia al campo de correo electrónico
                            onChange={onEmailHandler} // Maneja el cambio en el campo de correo electrónico
                            required
                        />

                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            placeholder="Password"
                            id="password"
                            name="password"
                            ref={passwordRef} // Asigna la referencia al campo de contraseña
                            onChange={onPasswordHandler} // Maneja el cambio en el campo de contraseña
                            required
                        />

                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            id="confirmPassword"
                            name="confirmPassword"
                            ref={confirmPasswordRef} // Asigna la referencia al campo de confirmación de contraseña
                            onChange={onConfirmPasswordHandler} // Maneja el cambio en el campo de confirmación de contraseña
                            required
                        />

                        {!passwordsMatch && (
                            <p style={{ color: 'red' }}>Las contraseñas no coinciden</p> // Mensaje de advertencia si las contraseñas no coinciden
                        )}

                        <button type="button" onClick={onClickHandler} className={styles.registerButton}>
                            Register
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default usuarios;