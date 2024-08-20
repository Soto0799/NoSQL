import React, { useState, useEffect } from 'react';
import Header from './components/Header'
import { Aside } from './components/Aside';
import Main from './components/Main';
import { Footer } from './components/Footer';
import { getToken, removeToken } from './util/storage';
import styles from './App.module.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Reportes from './components/reportes/Reportes';



const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = getToken();
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogout = () => {
        removeToken();
        setIsLoggedIn(false);
    };

    return (
        <Router>
            <div className={styles.wrapper}>
                <Header
                    isLoggedIn={isLoggedIn}
                    //role={role}
                    onLogout={handleLogout}
                    onLogin={() => setIsLoggedIn(true)}
                />
                <Aside />
                <main className={styles.mainContent}>
                    <Routes>
                        {/* Ruta para el contenido principal */}
                        <Route path="/" element={<Main isLoggedIn={isLoggedIn} />} />
                        
                        {/* Ruta para reportes, pero manteniendo el mismo layout */}
                        <Route path="/reportes" element={<Reportes />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
};

export default App;