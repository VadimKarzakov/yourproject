import React, { useState } from "react";
import { createEvent } from "../../api";

const AddEventForm = ({ onSubmitSuccess }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [type, setType] = useState("MEETING");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createEvent({ title, description, location, startTime, endTime, type });
            setTitle(""); setDescription(""); setLocation(""); setStartTime(""); setEndTime(""); setType("MEETING");
            onSubmitSuccess?.();
        } catch (err) {
            console.error("Ошибка при создании мероприятия:", err);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={formStyle}>
            <h3 style={{ marginBottom: "0.5rem" }}>Создание мероприятия</h3>
            <input placeholder="Название" value={title} onChange={e => setTitle(e.target.value)} style={input} />
            <input placeholder="Место проведения" value={location} onChange={e => setLocation(e.target.value)} style={input} />
            <input placeholder="Описание" value={description} onChange={e => setDescription(e.target.value)} style={input} />
            <input type="datetime-local" value={startTime} onChange={e => setStartTime(e.target.value)} style={input} />
            <input type="datetime-local" value={endTime} onChange={e => setEndTime(e.target.value)} style={input} />
            <select value={type} onChange={e => setType(e.target.value)} style={input}>
                <option value="MEETING">Встреча</option>
                <option value="LECTURE">Лекция</option>
                <option value="WORKSHOP">Мастер-класс</option>
                <option value="CELEBRATION">Праздник</option>
            </select>
            <button type="submit" style={button}>Добавить</button>
        </form>
    );
};

const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    padding: "1rem",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    minWidth: "260px"
};

const input = {
    padding: "0.5rem",
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "4px"
};

const button = {
    marginTop: "0.5rem",
    backgroundColor: "#003366",
    color: "#fff",
    border: "none",
    padding: "0.5rem",
    borderRadius: "4px",
    cursor: "pointer"
};

export default AddEventForm;
