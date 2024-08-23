import React, { ChangeEvent, useState, MouseEvent} from 'react';


const AddPlace = ({ ...props }): React.ReactElement => {
    const [id, setId] = useState('');
    const [nombre, setNombre] = useState('');
    const [distancia, setDistancia] = useState<number | string>(''); 
    const [esFavorito, setEsFavorito] = useState<boolean>(true);
    const [lat, setLat] = useState<number | string>(''); 
    const [lon, setLon] = useState<number | string>(''); 
    const [imagen, setImagen] = useState('');
    const [isAdded, setIsAdded] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null); // Nuevo estado para el mensaje de éxito

    const handleChange = (setter: React.Dispatch<React.SetStateAction<any>>) => (
        e: ChangeEvent<HTMLInputElement>
    ) => {
        setter(e.target.value);
    };

    const handleNumberChange = (setter: React.Dispatch<React.SetStateAction<number | string>>) => (
        e: ChangeEvent<HTMLInputElement>
    ) => {
        const value = e.target.value;
        setter(value === '' ? '' : parseFloat(value)); 
    };

    // Manejador para el clic en el botón de agregar
    const onClickHandler = async (e: MouseEvent<HTMLButtonElement>): Promise<void> => {
        e.preventDefault();
        setErrorMessage(null);
        setSuccessMessage(null); // Limpiar el mensaje de éxito cuando se hace clic en agregar

        if (id === '' || nombre === '' || distancia === '' || lat === '' || lon === '' || imagen === '') {
            setErrorMessage('Todos los campos son obligatorios.');
            return;
        }

        const placeData = {
            id,
            nombre,
            distancia: parseFloat(distancia.toString()), 
            esFavorito,
            lat: parseFloat(lat.toString()), 
            lon: parseFloat(lon.toString()), 
            seleccionCount: 0, 
            imagen,
        };

        try {
            const response = await fetch('http://127.0.0.1:3443/places', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(placeData),
            });

            if (!response.ok) {
                const errorText = await response.text();
                setErrorMessage(`Error: ${errorText}`);
                console.log('Failed to add place', errorText);
                return;
            }

            const data = await response.json();
            if (data.success) {
                setIsAdded(true);
                setSuccessMessage('Lugar agregado exitosamente!'); // Mostrar mensaje de éxito
                console.log('Place added successfully:', data);
            } else {
                setErrorMessage(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Error durante la creación del lugar:', error);
            setErrorMessage('Error durante la creación del lugar.');
        }
    };
    return (
        <div>
            <form>
                <label htmlFor="id">ID</label>
                <input
                    type="text"
                    id="id"
                    name="id"
                    value={id}
                    onChange={handleChange(setId)}
                    required
                />
                <label htmlFor="nombre">Nombre</label>
                <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={nombre}
                    onChange={handleChange(setNombre)}
                    required
                />

                <label htmlFor="distancia">Distancia</label>
                <input
                    type="number"
                    id="distancia"
                    name="distancia"
                    value={distancia}
                    onChange={handleNumberChange(setDistancia)}
                    required
                />

                <label htmlFor="lat">Latitud</label>
                <input
                    type="number"
                    id="lat"
                    name="lat"
                    value={lat}
                    onChange={handleNumberChange(setLat)}
                    required
                />

                <label htmlFor="lon">Longitud</label>
                <input
                    type="number"
                    id="lon"
                    name="lon"
                    value={lon}
                    onChange={handleNumberChange(setLon)}
                    required
                />

                <label htmlFor="imagen">URL de la Imagen</label>
                <input
                    type="text"
                    id="imagen"
                    name="imagen"
                    value={imagen}
                    onChange={handleChange(setImagen)}
                    required
                />

                <button type="button" onClick={onClickHandler}>
                    Agregar Lugar
                </button>
            </form>
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    );
};

export default AddPlace;