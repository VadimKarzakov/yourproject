import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import rutLogo from "../assets/1.png";
import "./RegisterPage.css";

const RegisterPage = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch("http://localhost:8080/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        if (res.ok) {
            alert("Регистрация успешна");
            navigate("/login");
        } else {
            alert("Ошибка регистрации");
        }
    };

    return (
        <div className="register-container">
            <div className="register-box fade-in">
                <img src={rutLogo} alt="РУТ (МИИТ)" className="register-logo" />
                <h2 className="register-title">Регистрация</h2>
                <form onSubmit={handleSubmit} className="register-form">
                    <input
                        type="text"
                        name="username"
                        placeholder="Имя пользователя"
                        value={form.username}
                        onChange={handleChange}
                        required
                        className="register-input"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="register-input"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Пароль"
                        value={form.password}
                        onChange={handleChange}
                        required
                        className="register-input"
                    />
                    <button type="submit" className="register-button">Зарегистрироваться</button>
                    <p className="register-switch">
                        Уже есть аккаунт?{" "}
                        <Link to="/login" className="register-link">Войти</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
