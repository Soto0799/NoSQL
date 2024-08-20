import { useEffect, useState } from "react";
import styles from './ReportesUsuarios.module.css';

const ReporteUsuarios: React.FC = () => {
  const [usuarios, setUsuarios] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await fetch("http://127.0.0.1:3443/usuarios/");

        if (!response.ok) {
          throw new Error("Error al obtener los datos");
        }

        const data = await response.json();

        setUsuarios(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsuarios();
  }, []);

  return (
    <div className={styles.list}>
    <h2 className={styles.title}>Listado Usuarios</h2>
    <div className={styles.userscontainer}>
      {usuarios.length === 0 ? (
        <p className={styles.nousers}>No hay lugares favoritos disponibles</p>
      ) : (
        usuarios.map((usuario) => (
          <div key={usuario.id} className={styles.usercard}>
            <div className={styles.userinfo}>
              <span className={styles.infotitle}>Email:</span>
              <span className={styles.infovalue}>{usuario.email}</span>
            </div>
            <div className={styles.userinfo}>
              <span className={styles.infotitle}>Password:</span>
              <span className={styles.infovalue}>{usuario.hashPassword}</span>
            </div>
            <div className={styles.userinfo}>
              <span className={styles.infotitle}>Username:</span>
              <span className={styles.infovalue}>{usuario.username}</span>
            </div>
            <div className={styles.userinfo}>
              <span className={styles.infotitle}>Rol:</span>
              <span className={styles.infovalue}>{usuario.rol}</span>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
  

  );
};


export default ReporteUsuarios;
