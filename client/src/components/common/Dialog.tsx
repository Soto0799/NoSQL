import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";
import styles from './Dialog.module.css';

// Componente Dialog que renderiza un diálogo modal
const Dialog = ({ open, title, children, onClose }) => {
    // Referencia al elemento <dialog> HTML
    const dialog = useRef<HTMLDialogElement>(null);
    console.log('dialog');

    // Efecto que se ejecuta cuando el estado de "open" cambia
    useEffect(() => {
        if (open) {
            // Mostrar el diálogo modal si "open" es verdadero
            dialog.current.showModal();
        } else {
            // Cerrar el diálogo modal si "open" es falso
            dialog.current.close();
        }
    }, [open]);

    return createPortal(
        // Renderizar el diálogo dentro del portal
        <dialog className={styles.dialog} ref={dialog} onClose={onClose}>
            <div className={styles.dialogHeader}>
                <h2>{title}</h2>
                <button className={styles.closeButton} onClick={onClose}>×</button>
            </div>
            <div className={styles.dialogContent}>
                {children}
            </div>
        </dialog>,
        // El portal se monta en un contenedor con id "dialogs"
        document.getElementById("dialogs")
    );
}

export default Dialog;