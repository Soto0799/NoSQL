import { ChangeEvent, ReactNode, useState, useRef, MouseEvent} from 'react';


const AddPlace = ({ ...props }): ReactNode => {
    // Referencias para acceder a los elementos del formulario
    const idRef = useRef<HTMLInputElement | null>(null);
    const nombreRef = useRef<HTMLInputElement | null>(null);
    const distanciaRef = useRef<HTMLInputElement | null>(null);
    const esFavoritoRef = useRef<HTMLInputElement | null>(null); 
    const latRef = useRef<HTMLInputElement | null>(null);
    const lonRef = useRef<HTMLInputElement | null>(null);
    const seleccionCountRef = useRef<HTMLInputElement | null>(null);
    const imagenRef = useRef<HTMLInputElement | null>(null);

    // Estados para manejar los valores del formulario
    const [id, setId] = useState('');
    const [nombre, setNombre] = useState('');
    const [distancia, setDistancia] = useState<number>(0);
    const [esFavorito, setEsFavorito] = useState<boolean>(true);
    const [lat, setLat] = useState<number>(0);
    const [lon, setLon] = useState<number>(0);
    const [imagen, setImagen] = useState('');
    const [isAdded, setIsAdded] = useState(false);

    // Manejadores de eventos para actualizar el estado cuando cambian los campos del formulario
    const onIdHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        setId(e.target.value);
    };

    const onNombreHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        setNombre(e.target.value);
    };

    const onDistanciaHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        setDistancia(parseFloat(e.target.value));
    };

    const onLatHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        setLat(parseFloat(e.target.value));
    };

    const onLonHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        setLon(parseFloat(e.target.value));
    };

    const onImagenHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        setImagen(e.target.value);
    };

    // Manejador para el clic en el botón de agregar
    const onClickHandler = async (e: MouseEvent<HTMLButtonElement>): Promise<void> => {
        // Obtener los valores de los campos del formulario usando las referencias
        const idValue: string = idRef.current?.value || '';
        const nombreValue: string = nombreRef.current?.value || '';
        const distanciaValue: number = parseFloat(distanciaRef.current?.value || '0');
        const esFavoritoValue: boolean = esFavoritoRef.current?.checked || true;
        const latValue: number = parseFloat(latRef.current?.value || '0');
        const lonValue: number = parseFloat(lonRef.current?.value || '0');
        const imagenValue: string = imagenRef.current?.value || '';
        const seleccionCountValue: number = 0; // Valor inicial de 0 para seleccionCount

        // Crear el objeto con los datos del lugar
        const placeData = {
            id: idValue,
            nombre: nombreValue,
            distancia: distanciaValue,
            esFavorito: esFavoritoValue,
            lat: latValue,
            lon: lonValue,
            seleccionCount: seleccionCountValue, // Se establece en 0 por defecto
            imagen: imagenValue
        };

        // Intentar enviar los datos al servidor
        try {
            const response: Response = await fetch('http://127.0.0.1:3443/places', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(placeData)
            });
            console.log(response);
            // Verificar si la respuesta fue exitosa
            if (!response.ok) {
                console.log('Failed to add place');
                return;
            }

            const data = await response.json();
            if (!data.success) {
                console.log(data.message);
                return;
            }

            // Actualizar el estado a agregado si todo salió bien
            setIsAdded(true);
        } catch (error) {
            console.error('Error durante el registro:', error);
        }
    };

    return (
        <>
            {/* Mostrar el formulario solo si el usuario está autenticado y no está agregado */}
            <div {...props}>
                <label htmlFor="id">ID</label>
                <input
                    type="text"
                    placeholder="ID del lugar"
                    id="id"
                    name="id"
                    ref={idRef}
                    onChange={onIdHandler}
                    required
                />
                <label htmlFor="nombre">Nombre</label>
                <input
                    type="text"
                    placeholder="Nombre del lugar"
                    id="nombre"
                    name="nombre"
                    ref={nombreRef}
                    onChange={onNombreHandler}
                    required
                />

                <label htmlFor="distancia">Distancia</label>
                <input
                    type="number"
                    placeholder="Distancia"
                    id="distancia"
                    name="distancia"
                    ref={distanciaRef}
                    onChange={onDistanciaHandler}
                    required
                />

                {/* Campo oculto para esFavorito */}
                <input
                    type="hidden"
                    id="esFavorito"
                    name="esFavorito"
                    value="true" 
                    ref={esFavoritoRef}
                />

                <label htmlFor="lat">Latitud</label>
                <input
                    type="number"
                    placeholder="Latitud"
                    id="lat"
                    name="lat"
                    ref={latRef}
                    onChange={onLatHandler}
                    required
                />

                <label htmlFor="lon">Longitud</label>
                <input
                    type="number"
                    placeholder="Longitud"
                    id="lon"
                    name="lon"
                    ref={lonRef}
                    onChange={onLonHandler}
                    required
                />

                {/* Campo oculto para seleccionCount */}
                <input
                    type="hidden"
                    id="seleccionCount"
                    name="seleccionCount"
                    value={0} // Valor fijo de 0
                    ref={seleccionCountRef}
                />

                <label htmlFor="imagen">URL de la Imagen</label>
                <input
                    type="text"
                    placeholder="URL de la imagen"
                    id="imagen"
                    name="imagen"
                    ref={imagenRef}
                    onChange={onImagenHandler}
                    required
                />

                <button type="button" onClick={onClickHandler}>
                    Agregar Lugar
                </button>
            </div>
        </>
    );
};

export default AddPlace;