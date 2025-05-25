import React, { useState } from "react";
import { authorizedFetch } from "../../api";

const AddUserForm = ({ onSubmitSuccess }) => {
    const [user, setUser] = useState({ username: "", email: "", password: "", role: "USER" });
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user.username || !user.email || !user.password) {
            setError("Все поля обязательны.");
            return;
        }

        try {
            await authorizedFetch("http://localhost:8080/api/users/users", {
                method: "POST",
                body: JSON.stringify(user),
            });
            alert("Пользователь добавлен");
            setUser({ username: "", email: "", password: "", role: "USER" });
            setError("");
            onSubmitSuccess?.();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <h3 style={styles.title}>Добавить пользователя</h3>
            <input
                type="text"
                placeholder="Имя пользователя"
                value={user.username}
                onChange={e => setUser({ ...user, username: e.target.value })}
                style={styles.input}
            />
            <input
                type="email"
                placeholder="Email"
                value={user.email}
                onChange={e => setUser({ ...user, email: e.target.value })}
                style={styles.input}
            />
            <input
                type="password"
                placeholder="Пароль"
                value={user.password}
                onChange={e => setUser({ ...user, password: e.target.value })}
                style={styles.input}
            />
            <select
                value={user.role}
                onChange={e => setUser({ ...user, role: e.target.value })}
                style={styles.input}
            >
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
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

export default AddUserForm;
