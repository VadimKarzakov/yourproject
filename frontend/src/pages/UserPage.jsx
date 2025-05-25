import React, { useEffect, useState } from "react";
import { fetchUsers } from "../api";
import Layout from "../components/Layout";
import "./UserPage.css";

function UserPage() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchUsers()
            .then(setUsers)
            .catch(() => setError("Ошибка загрузки пользователей"));
    }, []);

    return (
        <Layout>
            <div className="user-container">
                <h2 className="user-title">Пользователи системы</h2>

                {error && <div className="user-error">{error}</div>}

                <ul className="user-list">
                    {users.map((user, index) => (
                        <li key={user.id} className="user-card fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                            <p><strong>ID:</strong> {user.id}</p>
                            <p><strong>Имя:</strong> {user.username}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Роль:</strong> {user.role}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </Layout>
    );
}

export default UserPage;
