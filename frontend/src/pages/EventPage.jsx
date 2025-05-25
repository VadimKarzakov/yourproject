import React, { useEffect, useState } from "react";
import { fetchEvents } from "../api";
import Layout from "../components/Layout";

const demoEvents = [
    {
        id: "demo1",
        title: "День саморазвития",
        type: "WORKSHOP",
        startTime: "2025-04-10T10:00:00",
        endTime: "2025-04-10T15:00:00",
        location: "Аудитория 101",
        description: "Практикумы по личной эффективности, медитации и тайм-менеджменту.",
        image: "/images/event_selfgrowth.jpg"
    },
    {
        id: "demo2",
        title: "День книги",
        type: "LECTURE",
        startTime: "2025-04-15T12:00:00",
        endTime: "2025-04-15T17:00:00",
        location: "Библиотека, зал 2",
        description: "Литературные чтения, буккроссинг, встречи с писателями.",
        image: "/images/event_books.jpg"
    },
    {
        id: "demo3",
        title: "День робототехники",
        type: "CELEBRATION",
        startTime: "2025-04-20T09:00:00",
        endTime: "2025-04-20T18:00:00",
        location: "Главный холл",
        description: "Выставка роботов, мастер-классы по Arduino и Raspberry Pi.",
        image: "/images/event_robotics.jpg"
    }
];

const EventPage = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetchEvents().then(apiEvents => {
            setEvents([...demoEvents, ...apiEvents]);
        });
    }, []);

    return (
        <Layout>
            <div style={styles.container}>
                <h2 style={styles.title}>Мероприятия</h2>
                {events.length === 0 ? (
                    <p style={styles.empty}>Нет запланированных мероприятий.</p>
                ) : (
                    <div style={styles.grid}>
                        {events.map((event) => (
                            <div key={event.id} style={styles.card}>
                                <h3 style={styles.cardTitle}>{event.title}</h3>
                                {event.image && (
                                    <img src={event.image} alt={event.title} style={styles.image} />
                                )}
                                <p style={styles.type}><strong>Тип:</strong> {translateType(event.type)}</p>
                                <p><strong>Начало:</strong> {formatDate(event.startTime)}</p>
                                <p><strong>Окончание:</strong> {formatDate(event.endTime)}</p>
                                <p><strong>Место:</strong> {event.location}</p>
                                {event.description && (
                                    <p><strong>Описание:</strong> {event.description}</p>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
};

// Утилиты
const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
};

const translateType = (type) => {
    switch (type) {
        case "MEETING": return "Встреча";
        case "LECTURE": return "Лекция";
        case "WORKSHOP": return "Мастер-класс";
        case "CELEBRATION": return "Праздник";
        default: return type;
    }
};

// Стили
const styles = {
    container: {
        padding: "2rem",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f5f7fa",
    },
    title: {
        fontSize: "28px",
        color: "#003366",
        marginBottom: "1.5rem",
    },
    empty: {
        fontSize: "18px",
        color: "#666",
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
        gap: "1.5rem",
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: "10px",
        padding: "1.5rem",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.05)",
    },
    cardTitle: {
        fontSize: "22px",
        color: "#003366",
        marginBottom: "0.75rem",
    },
    type: {
        color: "#555",
        marginBottom: "0.5rem",
    },
    image: {
        width: "100%",
        height: "180px",
        objectFit: "cover",
        borderRadius: "8px",
        marginBottom: "1rem",
    }
};

export default EventPage;
