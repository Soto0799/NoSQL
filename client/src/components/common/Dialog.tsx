import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";
import styles from './Dialog.module.css';

const Dialog = ({ open, title, children, onClose }) => {
    const dialog = useRef<HTMLDialogElement>(null);
    console.log('dialog');

    useEffect(() => {
        if (open) {
            dialog.current.showModal();
        } else {
            dialog.current.close();
        }
    }, [open]);

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
        document.getElementById("dialogs")
    );
}

export default Dialog;