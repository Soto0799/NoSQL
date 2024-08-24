// Almacena el token en localStorage
export function setToken(token: string) {
    localStorage.setItem('authToken', token);
}

// Recupera el token desde localStorage
export function getToken(): string | null {
    return localStorage.getItem('authToken');
}

// Elimina el token de localStorage (para cerrar sesión)
export function removeToken() {
    localStorage.removeItem('authToken');
    window.location.reload();

}

export function setRol(rol: string | undefined) {
    if (rol) {
      localStorage.setItem('userRol', rol);
    } else {
      console.error("El rol no es válido:", rol);
    }
  }

export function getRol():string | null {

return localStorage.getItem('userRol');


}

export function removeRol(){


localStorage.removeItem('userRol');

}