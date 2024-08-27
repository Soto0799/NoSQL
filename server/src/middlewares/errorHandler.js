import { StatusCodes } from 'http-status-codes';

//Middleware global para manejo de errores
export const errorHandler = (error, request, response, next) => {
    // Se encarga de establecer el código de estado HTTP, predeterminado a "Internal Server Error" si no está definido
    const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;

    // Establece el mensaje de error predeterminado.
    const message = error.message || 'Something went wrong';

     // Proporciona la pila de errores solo en modo desarrollo
    const stack = process.env.NODE_ENV === 'development'
        ? error.stack
        : {};

    // Responde con el código de estado y el mensaje de error
    response.status(statusCode).json({
        success: false,
        status: statusCode,
        message,
        stack

    });

};