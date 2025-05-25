import React, { useEffect, useState } from "react";
import { fetchRooms } from "../api";
import Layout from "../components/Layout";
import "./RoomPage.css";

function RoomPage() {
    const [rooms, setRooms] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchRooms()
            .then(setRooms)
            .catch(() => setError("Ошибка загрузки комнат"));
    }, []);

    return (
        <Layout>
            <div className="room-container">
                <h2 className="room-title">Доступные комнаты</h2>

                {error && <div className="room-error">{error}</div>}

                <ul className="room-list">
                    {rooms.map((room, index) => (
                        <li key={room.id} className="room-card fadeIn" style={{ animationDelay: `${index * 0.1}s` }}>
                            <h3 className="room-name">{room.name}</h3>
                            <p><strong>Описание:</strong> {room.description}</p>
                            <p><strong>Вместимость:</strong> {room.capacity}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </Layout>
    );
}

export default RoomPage;
