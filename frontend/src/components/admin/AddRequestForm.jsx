import React, { useState } from "react";
import { createRequest } from "../../api";

const AddRequestForm = ({ onSubmitSuccess }) => {
    const [type, setType] = useState("SUPPLY_PENS");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createRequest({ type, description });
            setType("SUPPLY_PENS");
            setDescription("");
            onSubmitSuccess();
        } catch (err) {
            console.error("Ошибка при создании заявки:", err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={formStyle}>
            <h3>Добавить заявку</h3>
            <select value={type} onChange={e => setType(e.target.value)} style={selectStyle}>
                <option value="SUPPLY_PENS">Ручки</option>
                <option value="SUPPLY_PENCILS">Карандаши</option>
                <option value="SUPPLY_CANVASES">Холсты</option>
                <option value="TRASH_REMOVAL">Вынос мусора</option>
                <option value="CLEANING">Уборка</option>
            </select>
            <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Описание"
                style={textareaStyle}
            />
            <button type="submit" style={buttonStyle}>Создать</button>
        </form>
    );
};

const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    background: "#fff",
    padding: "1rem",
    border: "1px solid #ddd",
    borderRadius: "6px",
    width: "250px"
};

const selectStyle = {
    padding: "0.5rem",
    fontSize: "14px"
};

const textareaStyle = {
    padding: "0.5rem",
    minHeight: "60px",
    resize: "vertical",
    fontSize: "14px"
};

const buttonStyle = {
    backgroundColor: "#003366",
    color: "#fff",
    padding: "0.5rem",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer"
};

export default AddRequestForm;
