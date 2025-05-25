import React, { useEffect, useState } from "react";

const API_BOOKINGS = "http://localhost:8080/api/bookings";
const API_USERS = "http://localhost:8080/api/users";
const API_ROOMS = "http://localhost:8080/api/rooms";

const BookingForm = () => {
    const [formData, setFormData] = useState({
        userId: "",
        roomId: "",
        startTime: "",
        endTime: "",
    });

    const [users, setUsers] = useState([]);
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        fetch(API_USERS).then(res => res.json()).then(setUsers);
        fetch(API_ROOMS).then(res => res.json()).then(setRooms);
    }, []);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(API_BOOKINGS, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        })
            .then((res) => {
                if (res.ok) {
                    alert("Бронирование создано");
                    setFormData({ userId: "", roomId: "", startTime: "", endTime: "" });
                } else {
                    alert("Ошибка при создании");
                }
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Новое бронирование</h2>

            <label>Пользователь:</label>
            <select name="userId" value={formData.userId} onChange={handleChange} required>
                <option value="">Выберите</option>
                {users.map((user) => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                ))}
            </select>

            <br />

            <label>Комната:</label>
            <select name="roomId" value={formData.roomId} onChange={handleChange} required>
                <option value="">Выберите</option>
                {rooms.map((room) => (
                    <option key={room.id} value={room.id}>{room.name}</option>
                ))}
            </select>

            <br />

            <label>Начало:</label>
            <input type="datetime-local" name="startTime" value={formData.startTime} onChange={handleChange} required />
            <br />

            <label>Окончание:</label>
            <input type="datetime-local" name="endTime" value={formData.endTime} onChange={handleChange} required />
            <br />

            <button type="submit">Создать</button>
        </form>
    );
};

export default BookingForm;
