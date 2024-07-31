import { ChangeEvent, ReactNode, useState, useRef, MouseEvent, useEffect } from 'react';
import { getToken } from '../../util/storage';

// Componente para gestionar la información de los estudiantes
const Estudiantes = ({ ...props }): ReactNode => {
    // Referencias para acceder a los elementos del formulario
    const identificacionRef = useRef<HTMLInputElement | null>(null);
    const nombreRef = useRef<HTMLInputElement | null>(null);
    const apellidosRef = useRef<HTMLInputElement | null>(null);
    const fechaNacimientoRef = useRef<HTMLInputElement | null>(null);
    const telefonoCelularRef = useRef<HTMLInputElement | null>(null);
    const telefonoCasaRef = useRef<HTMLInputElement | null>(null);
    const ciudadRef = useRef<HTMLInputElement | null>(null);
    const distritoRef = useRef<HTMLInputElement | null>(null);
    const provinciaRef = useRef<HTMLInputElement | null>(null);
    const paisRef = useRef<HTMLInputElement | null>(null);

    // Estados para manejar los valores del formulario
    const [identificacion, setIdentificacion] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [telefonoCelular, setTelefonoCelular] = useState('');
    const [telefonoCasa, setTelefonoCasa] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [distrito, setDistrito] = useState('');
    const [provincia, setProvincia] = useState('');
    const [pais, setPais] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Obtener el token de autenticación desde el almacenamiento
    let token: string | null = getToken();

    // Verificar si hay un token y actualizar el estado de autenticación
    useEffect(() => {
        const hasToken = token !== null;
        console.log('hasToken=', hasToken);
        setIsAuthenticated(hasToken);
    }, [token]);

    // Manejadores de eventos para actualizar el estado cuando cambian los campos del formulario
    const onIdentificacionHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        const input: HTMLInputElement = e.target as HTMLInputElement;
        setIdentificacion(input.value);
    };

    const onNombreHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        const input: HTMLInputElement = e.target as HTMLInputElement;
        setNombre(input.value);
    };

    const onApellidosHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        const input: HTMLInputElement = e.target as HTMLInputElement;
        setApellidos(input.value);
    };

    const onFechaNacimientoHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        const input: HTMLInputElement = e.target as HTMLInputElement;
        setFechaNacimiento(input.value);
    };

    const onTelefonoCelularHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        const input: HTMLInputElement = e.target as HTMLInputElement;
        setTelefonoCelular(input.value);
    };

    const onTelefonoCasaHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        const input: HTMLInputElement = e.target as HTMLInputElement;
        setTelefonoCasa(input.value);
    };

    const onCiudadHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        const input: HTMLInputElement = e.target as HTMLInputElement;
        setCiudad(input.value);
    };

    const onDistritoHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        const input: HTMLInputElement = e.target as HTMLInputElement;
        setDistrito(input.value);
    };

    const onProvinciaHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        const input: HTMLInputElement = e.target as HTMLInputElement;
        setProvincia(input.value);
    };

    const onPaisHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        const input: HTMLInputElement = e.target as HTMLInputElement;
        setPais(input.value);
    };

    // Manejador para el clic en el botón de registro
    const onClickHandler = async (e: MouseEvent<HTMLButtonElement>): void => {
        // Verificar si el usuario está autenticado antes de registrar
        if (!isAuthenticated) {
            console.log('No se puede registrar sin autenticación');
            return;
        }

        // Obtener los valores de los campos del formulario usando las referencias
        const identificacionValue: string = identificacionRef.current?.value || '';
        const nombreValue: string = nombreRef.current?.value || '';
        const apellidosValue: string = apellidosRef.current?.value || '';
        const fechaNacimientoValue: string = fechaNacimientoRef.current?.value || '';
        const telefonoCelularValue: string = telefonoCelularRef.current?.value || '';
        const telefonoCasaValue: string = telefonoCasaRef.current?.value || '';
        const ciudadValue: string = ciudadRef.current?.value || '';
        const distritoValue: string = distritoRef.current?.value || '';
        const provinciaValue: string = provinciaRef.current?.value || '';
        const paisValue: string = paisRef.current?.value || '';

        // Crear el objeto con los datos del estudiante
        const studentData = {
            identificacion: identificacionValue,
            nombreCompleto: {
                nombre: nombreValue,
                apellidos: apellidosValue,
            },
            fechaNacimiento: new Date(fechaNacimientoValue).toISOString(),
            telefonos: [
                { numero: telefonoCelularValue, tipo: "celular" },
                { numero: telefonoCasaValue, tipo: "casa" },
            ],
            direccion: {
                ciudad: ciudadValue,
                distrito: distritoValue,
                provincia: provinciaValue,
                pais: paisValue,
            },
            activo: true,
        };

        // Intentar enviar los datos al servidor
        try {
            const response: Response = await fetch('http://127.0.0.1:3443/estudiantes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Incluir el token en el encabezado
                },
                body: JSON.stringify(studentData)
            });

            // Verificar si la respuesta fue exitosa
            if (!response.ok) {
                console.log('Failed to register student');
                return;
            }

            const data = await response.json();
            if (!data.success) {
                console.log(data.message);
                return;
            }

            // Actualizar el estado a registrado si todo salió bien
            setIsRegistered(true);
        } catch (error) {
            console.error('Error durante el registro:', error);
        }
    };

    return (
        <>
            {/* Mostrar el formulario solo si el usuario está autenticado y no está registrado */}
            {isAuthenticated && !isRegistered && (
                <div {...props} style={{ float: 'right' }}>
                    <label htmlFor="identificacion">Identificación</label>
                    <input
                        type="text"
                        placeholder="Identificación"
                        id="identificacion"
                        name="identificacion"
                        ref={identificacionRef}
                        onChange={onIdentificacionHandler}
                        required
                    />

                    <label htmlFor="nombre">Nombre</label>
                    <input
                        type="text"
                        placeholder="Nombre"
                        id="nombre"
                        name="nombre"
                        ref={nombreRef}
                        onChange={onNombreHandler}
                        required
                    />

                    <label htmlFor="apellidos">Apellidos</label>
                    <input
                        type="text"
                        placeholder="Apellidos"
                        id="apellidos"
                        name="apellidos"
                        ref={apellidosRef}
                        onChange={onApellidosHandler}
                        required
                    />

                    <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
                    <input
                        type="date"
                        placeholder="Fecha de Nacimiento"
                        id="fechaNacimiento"
                        name="fechaNacimiento"
                        ref={fechaNacimientoRef}
                        onChange={onFechaNacimientoHandler}
                        required
                    />

                    <label htmlFor="telefonoCelular">Teléfono Celular</label>
                    <input
                        type="text"
                        placeholder="Teléfono Celular"
                        id="telefonoCelular"
                        name="telefonoCelular"
                        ref={telefonoCelularRef}
                        onChange={onTelefonoCelularHandler}
                        required
                    />

                    <label htmlFor="telefonoCasa">Teléfono Casa</label>
                    <input
                        type="text"
                        placeholder="Teléfono Casa"
                        id="telefonoCasa"
                        name="telefonoCasa"
                        ref={telefonoCasaRef}
                        onChange={onTelefonoCasaHandler}
                        required
                    />

                    <label htmlFor="ciudad">Ciudad</label>
                    <input
                        type="text"
                        placeholder="Ciudad"
                        id="ciudad"
                        name="ciudad"
                        ref={ciudadRef}
                        onChange={onCiudadHandler}
                        required
                    />

                    <label htmlFor="distrito">Distrito</label>
                    <input
                        type="text"
                        placeholder="Distrito"
                        id="distrito"
                        name="distrito"
                        ref={distritoRef}
                        onChange={onDistritoHandler}
                        required
                    />

                    <label htmlFor="provincia">Provincia</label>
                    <input
                        type="text"
                        placeholder="Provincia"
                        id="provincia"
                        name="provincia"
                        ref={provinciaRef}
                        onChange={onProvinciaHandler}
                        required
                    />

                    <label htmlFor="pais">País</label>
                    <input
                        type="text"
                        placeholder="País"
                        id="pais"
                        name="pais"
                        ref={paisRef}
                        onChange={onPaisHandler}
                        required
                    />

                    <button type="button" onClick={onClickHandler}>
                        Register
                    </button>
                </div>
            )}
        </>
    );
};

export default Estudiantes;