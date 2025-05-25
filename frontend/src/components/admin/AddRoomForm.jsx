import React, { useState } from "react";
import { authorizedFetch } from "../../api";

const AddRoomForm = ({ onSubmitSuccess }) => {
    const [room, setRoom] = useState({ name: "", description: "", capacity: 0 });
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!room.name || room.capacity <= 0) {
            setError("Название и вместимость обязательны.");
            return;
        }

        try {
            await authorizedFetch("http://localhost:8080/api/rooms", {
                method: "POST",
                body: JSON.stringify(room),
            });
            alert("Комната добавлена");
            setRoom({ name: "", description: "", capacity: 0 });
            setError("");
            onSubmitSuccess?.();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <h3 style={styles.title}> Добавить комнату</h3>
            <input
                type="text"
                placeholder="Название"
                value={room.name}
                onChange={e => setRoom({ ...room, name: e.target.value })}
                style={styles.input}
            />
            <input
                type="text"
                placeholder="Описание"
                value={room.description}
                onChange={e => setRoom({ ...room, description: e.target.value })}
                style={styles.input}
            />
            <input
                type="number"
                placeholder="Вместимость"
                min={1}
                value={room.capacity}
                onChange={e => setRoom({ ...room, capacity: +e.target.value })}
                style={styles.input}
            />
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

export default AddRoomForm;
