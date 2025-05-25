import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import rutLogo from "../assets/1.png";
import "./LoginPage.css"; // добавлен импорт стилей

const LoginPage = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const { login, loading } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const success = await login(form.email, form.password);
            if (success) {
                navigate("/");
            } else {
                setError("Не удалось войти. Проверьте данные.");
            }
        } catch (err) {
            setError("Ошибка авторизации.");
        }
    };

    return (
        <div className="login-container">
            <div className="login-box fade-in">
                <img src={rutLogo} alt="РУТ (МИИТ)" className="login-logo" />
                <h2 className="login-title">Авторизация</h2>
                <form onSubmit={handleSubmit} className="login-form">
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="login-input"
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Пароль"
                        value={form.password}
                        onChange={handleChange}
                        required
                        className="login-input"
                    />
                    <button type="submit" className="login-button" disabled={loading}>
                        {loading ? "Загрузка..." : "Войти"}
                    </button>
                    {error && <p className="login-error">{error}</p>}
                    <p className="login-switch">
                        Нет аккаунта?{" "}
                        <Link to="/register" className="login-link">
                            Зарегистрироваться
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
