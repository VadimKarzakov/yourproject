
import React, { useEffect, useState } from "react";
import { fetchBookings } from "../api";
import Layout from "../components/Layout";

function BookingsPage() {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        fetchBookings().then(setBookings);
    }, []);

    return (
        <Layout>
            <div className="container" style={styles.container}>
                <h2 style={styles.title}>Список бронирований</h2>
                <ul style={styles.list}>
                    {bookings.map((b, index) => (
                        <li
                            key={b.id}
                            style={{
                                ...styles.card,
                                animation: `fadeInUp 0.4s ease ${index * 0.1}s forwards`,
                                opacity: 0,
                                transform: "translateY(10px)"
                            }}
                        >
                            <strong>Пользователь ID:</strong> {b.userId}<br />
                            <strong>Комната ID:</strong> {b.roomId}<br />
                            <strong>Период:</strong> {new Date(b.startTime).toLocaleString()} — {new Date(b.endTime).toLocaleString()}<br />
                            <strong>Статус:</strong> {b.status}
                        </li>
                    ))}
                </ul>

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
}

const styles = {
    container: {
        padding: "2rem",
        fontFamily: "Arial, sans-serif",
    },
    title: {
        color: "#003366",
        fontSize: "26px",
        marginBottom: "1.5rem"
    },
    list: {
        listStyle: "none",
        padding: 0,
        display: "flex",
        flexDirection: "column",
        gap: "1rem"
    },
    card: {
        background: "#f0f4f8",
        padding: "1rem",
        border: "1px solid #ccc",
        borderRadius: "8px",
        lineHeight: "1.6",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
    }
};

export default BookingsPage;
