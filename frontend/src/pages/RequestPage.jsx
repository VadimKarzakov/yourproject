import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
    const { user } = useAuth();

    return (
        <Layout>
            <div style={{ maxWidth: "600px", margin: "0 auto" }}>
                <h2 style={{ color: '#003366' }}>Добро пожаловать в систему бронирования РУТ (МИИТ)!</h2>
                <p>Выберите нужный раздел ниже:</p>

                <nav style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    marginTop: '2rem'
                }}>
                    <Link to="/bookings" style={linkStyle}>Просмотр бронирований</Link>
                    <Link to="/rooms" style={linkStyle}>Список комнат</Link>
                    <Link to="/calendar" style={linkStyle}>Мой календарь</Link>
                    <Link to="/events" style={linkStyle}>Мероприятия</Link>
                    <Link to="/profile" style={linkStyle}>Личный кабинет</Link>
                    <Link to="/about" style={linkStyle}>О нас</Link>
                    <Link to="/request" style={linkStyle}>Оставить заявку (расходники, уборка)</Link>

                    {user?.role === "ADMIN" && (
                        <>
                            <Link to="/users" style={linkStyle}>Пользователи</Link>
                            <Link to="/admin">
                                <button style={buttonStyle}>Админ-панель</button>
                            </Link>
                        </>
                    )}

                    {!user && (
                        <>
                            <Link to="/register">
                                <button style={buttonStyle}>Зарегистрироваться</button>
                            </Link>
                            <Link to="/login">
                                <button style={buttonStyle}>Войти</button>
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </Layout>
    );
};

const linkStyle = {
    display: 'block',
    padding: '10px 15px',
    backgroundColor: '#e3e9f2',
    borderRadius: '4px',
    color: '#003366',
    textDecoration: 'none',
    fontWeight: 'bold'
};

const buttonStyle = {
    padding: '10px 15px',
    backgroundColor: '#003366',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    width: '100%'
};

export default HomePage;
