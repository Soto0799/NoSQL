import { ReactNode } from "react";

export const Elemento = ({ estudiante }): ReactNode => {
    const { nombre, apellidos } = estudiante.nombreCompleto;
    const uniqueKey: string = estudiante.cedula ?? estudiante.identificacion;
    return (
        <li key={uniqueKey}>
            {nombre} {apellidos}
        </li>
    );
}