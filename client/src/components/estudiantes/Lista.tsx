import { ReactNode, useState, useEffect } from 'react';
import { Elemento } from './Elemento';

export const Lista = (): ReactNode => {
    const [estudiantes, setEstudiantes] = useState([]);
    useEffect((): void => {

        const getEstudiantes = (token: string): void => {
            const getData = async (): void => {
                const url: string = 'http://127.0.0.1:3443/estudiantes';
                const response: Response = await fetch(url, {
                    mode: 'cors',
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Authorization': 'Bearer ' + token
                    }
                });

                if (!response.ok) {
                    throw new Error('La lista de Estudiantes no pudo ser leída desde el servidor');
                }
                const data = await response.json();
                setEstudiantes(data);

            }
            getData();
        }

        const token: string | undefined = localStorage.getItem('token');
        if (token) {
            try {
                getEstudiantes(token);
            } catch (error) {
                return (<p>error.message</p>);
            }
        }

    }, []);

    return (
        <ul>
            {estudiantes.map((estudiante) => {
                const { uniqueKey } = estudiante.cedula ?? estudiante.identificacion;
                return (
                    <Elemento
                        key={uniqueKey}
                        estudiante={estudiante}
                    />
                )
            })}
        </ul>
    );
}