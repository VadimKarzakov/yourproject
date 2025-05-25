
import React, { useState } from "react";
import { authorizedFetch } from "../../api";

const AddStaffForm = ({ onSubmitSuccess }) => {
    const [staff, setStaff] = useState({
        fullName: "", position: "", email: "", phone: ""
    });
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await authorizedFetch("http://localhost:8080/api/staff", {
                method: "POST",
                body: JSON.stringify(staff)
            });
            onSubmitSuccess?.();
            setStaff({ fullName: "", position: "", email: "", phone: "" });
            setError("");
            alert("Сотрудник добавлен");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <h3 style={styles.heading}>Добавить персонал</h3>
            <input
                placeholder="ФИО"
                value={staff.fullName}
                onChange={e => setStaff({ ...staff, fullName: e.target.value })}
                style={styles.input}
            />
            <input
                placeholder="Должность"
                value={staff.position}
                onChange={e => setStaff({ ...staff, position: e.target.value })}
                style={styles.input}
            />
            <input
                placeholder="Email"
                value={staff.email}
                onChange={e => setStaff({ ...staff, email: e.target.value })}
                style={styles.input}
            />
            <input
                placeholder="Телефон"
                value={staff.phone}
                onChange={e => setStaff({ ...staff, phone: e.target.value })}
                style={styles.input}
            />
            <button type="submit" style={styles.button}>Добавить</button>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
    );
};

const styles = {
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        padding: "1rem",
        backgroundColor: "#fff",
        border: "1px solid #ddd",
        borderRadius: "8px",
        minWidth: "220px"
    },
    heading: {
        margin: 0,
        marginBottom: "8px",
        color: "#003366",
        fontWeight: "bold",
        fontSize: "16px"
    },
    input: {
        padding: "8px",
        border: "1px solid #ccc",
        borderRadius: "4px"
    },
    button: {
        padding: "10px",
        backgroundColor: "#003366",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontWeight: "bold"
    }
};

export default AddStaffForm;
