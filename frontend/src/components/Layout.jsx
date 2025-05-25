import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/rut-logo.png';
import './Layout.css';

const Layout = ({ children }) => {
    return (
        <div className="layout-root">
            <header className="layout-header slide-down">
                <div className="layout-logo-title">
                    <img src={logo} alt="РУТ (МИИТ)" className="layout-logo" />
                    <h1 className="layout-title">Система Бронирования РУТ</h1>
                </div>
                <Link to="/" className="layout-back-button">← На главную</Link>
            </header>

            <main className="layout-content">
                {children}
            </main>
        </div>
    );
};

export default Layout;
