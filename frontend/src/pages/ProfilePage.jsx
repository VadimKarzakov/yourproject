import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchBookingsByUser } from "../api";
import Layout from "../components/Layout";
import "./ProfilePage.css";

const ProfilePage = () => {
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        if (user?.id) {
            fetchBookingsByUser(user.id).then(setBookings);
        }
    }, [user]);

    if (!user) {
        return <Layout><p className="loading">Загрузка профиля...</p></Layout>;
    }

    return (
        <Layout>
            <div className="profile-container">
                <h2 className="profile-title">👤 Личный кабинет</h2>

                <section className="profile-section fadeIn">
                    <h3 className="section-heading">Основная информация</h3>
                    <p><strong>Имя пользователя:</strong> {user.username}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Роль:</strong> {user.role}</p>
                </section>

                <section className="profile-section fadeIn" style={{ animationDelay: "0.2s" }}>
                    <h3 className="section-heading">Мои бронирования</h3>
                    {bookings.length === 0 ? (
                        <p>У вас нет бронирований.</p>
                    ) : (
                        <ul className="booking-list">
                            {bookings.map((b, idx) => (
                                <li key={b.id} className="booking-card fadeIn" style={{ animationDelay: `${0.3 + idx * 0.1}s` }}>
                                    <strong>Комната:</strong> {b.roomId}<br />
                                    <strong>Период:</strong> {new Date(b.startTime).toLocaleString()} — {new Date(b.endTime).toLocaleString()}<br />
                                    <strong>Статус:</strong> {translateStatus(b.status)}
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
            </div>
        </Layout>
    );
};

const translateStatus = (status) => {
    switch (status) {
        case "CONFIRMED": return "Подтверждено";
        case "PENDING": return "Ожидает";
        case "CANCELLED": return "Отменено";
        case "FINISHED": return "Завершено";
        default: return status;
    }
};

export default ProfilePage;
