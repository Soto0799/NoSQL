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

// Almacena el rol del usuario en localStorage
export function setRol(rol: string | undefined) {
    if (rol) {
      localStorage.setItem('userRol', rol);
    } else {
      console.error("El rol no es válido:", rol);
    }
  }

// Recupera el rol del usuario desde localStorage
export function getRol():string | null {

return localStorage.getItem('userRol');


}

// Elimina el rol del usuario de localStorage
export function removeRol(){


localStorage.removeItem('userRol');

}