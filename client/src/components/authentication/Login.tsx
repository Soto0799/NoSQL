import { ChangeEvent, ReactNode, useState, useRef, MouseEvent, useEffect } from 'react';
import { getToken } from '../../util/storage';
import styles from './Login.module.css';

const Login = ({ ...props }): ReactNode => {
    const password = useRef<HTMLInputElement | null>(null);
    const [username, setUsername] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    let token: string | null = getToken();

    useEffect(() => {
        const hasToken = token !== null;
        console.log('hasToken=', hasToken);
        setIsLoggedIn(hasToken);
    }, [token]);

    const onUsernameHandler = (e: ChangeEvent): void => {
        const input: HTMLInputElement = e.target as HTMLInputElement;
        setUsername(input.value);
    };

    const onClickHandler = async (e: MouseEvent): void => {
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

        if (!response.ok) {
            console.log('Failed to login');
            return;
        }

        const data = await response.json();
        if (!data.success) {
            console.log(data.message);
            return;
        }

        token = data.data.token;
        if (token) {
            localStorage.setItem("token", token as string);
            setIsLoggedIn(true);
        }

    };

    return (
        <>
            {!isLoggedIn && (
                <div {...props} className={styles.loginContainer}>
                    <label htmlFor="username">{username}</label>
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
            )}
        </>
    );

};

export default Login;