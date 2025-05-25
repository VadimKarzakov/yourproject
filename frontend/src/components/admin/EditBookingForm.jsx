import React, { useState } from "react";

const EditBookingForm = ({ booking, onSubmitSuccess, onCancel }) => {
    const [formData, setFormData] = useState({ ...booking });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`http://localhost:8080/api/bookings/${booking.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (!res.ok) throw new Error("Ошибка при обновлении бронирования");
            alert("Бронирование обновлено");
            onSubmitSuccess?.();
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "8px", border: "1px solid gray", padding: "1rem" }}>
            <h3>Редактировать бронирование #{booking.id}</h3>
            <input type="number" placeholder="User ID" value={formData.userId} onChange={(e) => setFormData({ ...formData, userId: +e.target.value })} />
            <input type="number" placeholder="Room ID" value={formData.roomId} onChange={(e) => setFormData({ ...formData, roomId: +e.target.value })} />
            <input type="datetime-local" value={formData.startTime} onChange={(e) => setFormData({ ...formData, startTime: e.target.value })} />
            <input type="datetime-local" value={formData.endTime} onChange={(e) => setFormData({ ...formData, endTime: e.target.value })} />
            <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                <option value="CONFIRMED">CONFIRMED</option>
                <option value="PENDING">PENDING</option>
                <option value="CANCELLED">CANCELLED</option>
                <option value="FINISHED">FINISHED</option>
            </select>
            <button type="submit">Сохранить</button>
            <button type="button" onClick={onCancel}>Отмена</button>
        </form>
    );
};

export default EditBookingForm;
