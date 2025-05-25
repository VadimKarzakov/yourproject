import React, { useState } from "react";
import { createBooking } from "../../api";

const AddBookingForm = ({ onSubmitSuccess }) => {
    const [booking, setBooking] = useState({
        userId: "",
        roomId: "",
        startTime: "",
        endTime: "",
        status: "CONFIRMED",
    });
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!booking.userId || !booking.roomId || !booking.startTime || !booking.endTime) {
            setError("Все поля обязательны");
            return;
        }

        try {
            await createBooking(booking);
            alert("Бронирование добавлено");
            setBooking({
                userId: "",
                roomId: "",
                startTime: "",
                endTime: "",
                status: "CONFIRMED"
            });
            setError("");
            onSubmitSuccess?.();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <h3 style={styles.title}> Добавить бронирование</h3>
            <input
                type="number"
                placeholder="ID пользователя"
                value={booking.userId}
                onChange={e => setBooking({ ...booking, userId: +e.target.value })}
                style={styles.input}
            />
            <input
                type="number"
                placeholder="ID комнаты"
                value={booking.roomId}
                onChange={e => setBooking({ ...booking, roomId: +e.target.value })}
                style={styles.input}
            />
            <input
                type="datetime-local"
                value={booking.startTime}
                onChange={e => setBooking({ ...booking, startTime: e.target.value })}
                style={styles.input}
            />
            <input
                type="datetime-local"
                value={booking.endTime}
                onChange={e => setBooking({ ...booking, endTime: e.target.value })}
                style={styles.input}
            />
            <select
                value={booking.status}
                onChange={e => setBooking({ ...booking, status: e.target.value })}
                style={styles.select}
            >
                <option value="CONFIRMED">CONFIRMED</option>
                <option value="PENDING">PENDING</option>
                <option value="CANCELLED">CANCELLED</option>
                <option value="FINISHED">FINISHED</option>
            </select>
            <button type="submit" style={styles.button}>Создать</button>
            {error && <p style={styles.error}>{error}</p>}
        </form>
    );
};

const styles = {
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        backgroundColor: "#ffffff",
        padding: "16px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        minWidth: "250px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
    },
    title: {
        margin: "0 0 8px 0",
        color: "#003366",
        fontWeight: "bold",
        fontSize: "18px"
    },
    input: {
        padding: "10px",
        borderRadius: "4px",
        border: "1px solid #ccc",
        fontSize: "14px"
    },
    select: {
        padding: "10px",
        borderRadius: "4px",
        border: "1px solid #ccc",
        backgroundColor: "#f0f4f8",
        fontSize: "14px"
    },
    button: {
        backgroundColor: "#003366",
        color: "#fff",
        padding: "10px",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontWeight: "bold"
    },
    error: {
        color: "#cc0000",
        fontWeight: "bold",
        marginTop: "4px"
    }
};

export default AddBookingForm;
