import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";
import styles from './Dialog.module.css';

// Define el componente funcional Dialog que acepta props para controlar su visibilidad, título, contenido y función de cierre
const Dialog = ({ open, title, children, onClose }) => {
    const dialog = useRef<HTMLDialogElement>(null);
    console.log('dialog');

    useEffect(() => {
         // Usa el hook useEffect para mostrar o cerrar el diálogo cuando cambie la prop "open"
        if (open) {
            dialog.current.showModal();
        } else {
            dialog.current.close();
        }
    }, [open]);

    // Renderiza el componente en un portal, que permite renderizar contenido en un nodo DOM diferente al nodo padre
    return createPortal(
        <dialog className={styles.dialog} ref={dialog} onClose={onClose}>
            <div className={styles.dialogHeader}>
                <h2>{title}</h2>
                <button className={styles.closeButton} onClick={onClose}>×</button>
            </div>
            <div className={styles.dialogContent}>
                {children} 
            </div>
        </dialog>,
        document.getElementById("dialogs")  // El portal se renderiza en el elemento con id "dialogs" en el DOM
    );
}

export default Dialog;