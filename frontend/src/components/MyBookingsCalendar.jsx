

import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import ruLocale from "@fullcalendar/core/locales/ru";
import {
    fetchBookingsByUser,
    fetchRooms,
    deleteBooking,
    updateBooking,
    createBooking
} from "../api";
import { useAuth } from "../context/AuthContext";
import "./MyBookingsCalendar.css";

const MyBookingsCalendar = () => {
    const { user } = useAuth();
    const [events, setEvents] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [formVisible, setFormVisible] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        userId: "",
        roomId: "",
        startTime: "",
        endTime: "",
        status: "CONFIRMED"
    });

    useEffect(() => {
        if (user?.id && formData.userId !== user.id) {
            setFormData(prev => ({ ...prev, userId: user.id }));
            fetchRooms().then(setRooms);
            loadBookings(user.id);
        }
    }, [user, formData.userId]);

    const loadBookings = async (userId) => {
        try {
            const data = await fetchBookingsByUser(userId);
            const transformed = data.map(booking => ({
                id: booking.id,
                title: `${booking.status} (Комната ${booking.roomId})`,
                start: booking.startTime,
                end: booking.endTime,
                extendedProps: {
                    roomId: booking.roomId,
                    status: booking.status
                }
            }));
            setEvents(transformed);
        } catch (err) {
            console.error("Ошибка загрузки бронирований:", err);
        }
    };

    const handleEventClick = async (clickInfo) => {
        if (window.confirm("Удалить это бронирование?")) {
            await deleteBooking(clickInfo.event.id);
            loadBookings(formData.userId);
        }
    };

    const handleEventChange = async (changeInfo) => {
        const updated = {
            id: changeInfo.event.id,
            userId: +formData.userId,
            roomId: changeInfo.event.extendedProps.roomId,
            startTime: changeInfo.event.startStr,
            endTime: changeInfo.event.endStr,
            status: changeInfo.event.extendedProps.status
        };

        try {
            await updateBooking(updated.id, updated);
            setError("");
            loadBookings(formData.userId);
        } catch (err) {
            alert("Ошибка при обновлении: " + err.message);
            loadBookings(formData.userId);
        }
    };

    const handleBookingSubmit = async (e) => {
        e.preventDefault();

        const newBooking = {
            userId: +formData.userId,
            roomId: +formData.roomId,
            startTime: formData.startTime,
            endTime: formData.endTime,
            status: formData.status
        };

        try {
            await createBooking(newBooking);
            loadBookings(formData.userId);
            setError("");
            setFormVisible(false);
            setFormData(prev => ({
                ...prev,
                roomId: "",
                startTime: "",
                endTime: "",
                status: "CONFIRMED"
            }));
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="calendar-container fadeIn">
            <button
                onClick={() => setFormVisible(!formVisible)}
                className="calendar-button"
            >
                + Создать бронь
            </button>

            {formVisible && (
                <form onSubmit={handleBookingSubmit} className="calendar-form fadeIn">
                    <h3>Создать бронирование</h3>
                    <select value={formData.roomId} onChange={e => setFormData({ ...formData, roomId: e.target.value })}>
                        <option value="">-- Выберите комнату --</option>
                        {rooms.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                    </select>
                    <input type="datetime-local" value={formData.startTime} onChange={e => setFormData({ ...formData, startTime: e.target.value })} />
                    <input type="datetime-local" value={formData.endTime} onChange={e => setFormData({ ...formData, endTime: e.target.value })} />
                    <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                        <option value="CONFIRMED">CONFIRMED</option>
                        <option value="PENDING">PENDING</option>
                        <option value="CANCELLED">CANCELLED</option>
                        <option value="FINISHED">FINISHED</option>
                    </select>
                    <button type="submit">Сохранить</button>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                </form>
            )}

            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="timeGridWeek"
                events={events}
                height="auto"
                editable={true}
                locale={ruLocale}
                buttonText={{
                    today: 'Сегодня',
                    month: 'Месяц',
                    week: 'Неделя',
                    day: 'День'
                }}
                eventClick={handleEventClick}
                eventChange={handleEventChange}
                headerToolbar={{
                    start: "prev,next today",
                    center: "title",
                    end: "dayGridMonth,timeGridWeek,timeGridDay"
                }}
            />

            <hr style={{ margin: "2rem 0" }} />

            <h3>📋 Список всех комнат:</h3>
            <ul className="fadeIn">
                {rooms.length > 0 ? (
                    rooms.map(room => (
                        <li key={room.id}>
                            <strong>{room.name}</strong> — вместимость: {room.capacity}, описание: {room.description}
                        </li>
                    ))
                ) : (
                    <li>Нет доступных комнат.</li>
                )}
            </ul>
        </div>
    );
};

export default MyBookingsCalendar;
