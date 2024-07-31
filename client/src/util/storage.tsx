export const getToken = (): string | null => {
    const token: string | null = localStorage.getItem('token');

    if (token && token.length < 1) {
        return null;
    }
    return token;
}

// Función para eliminar el token del almacenamiento local
export const removeToken = (): void => {
    localStorage.removeItem('token');
};