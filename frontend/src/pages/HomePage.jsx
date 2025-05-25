
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
    const { user } = useAuth();

    return (
        <Layout>
            <div style={styles.wrapper}>
                <h2 style={styles.title}>Добро пожаловать в систему бронирования РУТ (МИИТ)!</h2>
                <p style={styles.subtitle}>Выберите нужный раздел ниже:</p>

                <nav style={styles.nav}>
                    {navLinks(user).map((item, index) => (
                        <div
                            key={index}
                            style={{
                                ...styles.linkWrapper,
                                animation: `fadeInUp 0.5s ease ${index * 0.1}s forwards`,
                                opacity: 0,
                                transform: "translateY(10px)"
                            }}
                        >
                            {item}
                        </div>
                    ))}
                </nav>

                <style>{`
                    @keyframes fadeInUp {
                        from {
                            opacity: 0;
                            transform: translateY(20px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                `}</style>
            </div>
        </Layout>
    );
};

const navLinks = (user) => {
    const common = [
        <Link to="/bookings" style={styles.link}>Просмотр бронирований</Link>,
        <Link to="/rooms" style={styles.link}>Список комнат</Link>,
        <Link to="/calendar" style={styles.link}>Мой календарь</Link>,
        <Link to="/events" style={styles.link}>Мероприятия</Link>,
        <Link to="/profile" style={styles.link}>Личный кабинет</Link>,
        <Link to="/about" style={styles.link}>О нас</Link>,
        <Link to="/request" style={styles.link}>Оставить заявку (расходники, уборка)</Link>,
        <Link to="/moments" style={styles.link}>Яркие моменты</Link>
    ];

    const admin = user?.role === "ADMIN"
        ? [
            <Link to="/users" style={styles.link}>Пользователи</Link>,
            <Link to="/admin"><button style={styles.button}>Админ-панель</button></Link>
        ]
        : [];

    const auth = !user
        ? [
            <Link to="/register"><button style={styles.button}>Зарегистрироваться</button></Link>,
            <Link to="/login"><button style={styles.button}>Войти</button></Link>
        ]
        : [];

    return [...common, ...admin, ...auth];
};

const styles = {
    wrapper: {
        maxWidth: "600px",
        margin: "0 auto",
        padding: "2rem",
        fontFamily: "Arial, sans-serif"
    },
    title: {
        color: "#003366",
        fontSize: "28px",
        textAlign: "center"
    },
    subtitle: {
        textAlign: "center",
        marginTop: "0.5rem",
        color: "#444"
    },
    nav: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        marginTop: '2rem'
    },
    linkWrapper: {
        transition: "all 0.3s ease"
    },
    link: {
        display: 'block',
        padding: '10px 15px',
        backgroundColor: '#e3e9f2',
        borderRadius: '4px',
        color: '#003366',
        textDecoration: 'none',
        fontWeight: 'bold'
    },
    button: {
        padding: '10px 15px',
        backgroundColor: '#003366',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold',
        width: '100%'
    }
};

export default HomePage;
