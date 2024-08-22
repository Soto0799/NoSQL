import { StatusCodes } from 'http-status-codes';

// Middleware para manejar errores en la aplicación
export const errorHandler = (error, request, response, next) => {
    const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;

    const message = error.message || 'Something went wrong';
    const stack = process.env.NODE_ENV === 'development'
        ? error.stack
        : {};
    response.status(statusCode).json({
        success: false,
        status: statusCode,
        message,
        stack

    });

};