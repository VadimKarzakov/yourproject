import React, { useState } from "react";
import Layout from "../components/Layout";
import "./MomentsPage.css";

const moments = [
    {
        id: 1,
        title: "Открытие фотостудии",
        image: "/images/moment_photostudio.jpg",
        caption: "Теперь каждый может устроить стильную фотосессию прямо в кампусе!",
        details: "Вы можете забронировать время заранее и воспользоваться профессиональным оборудованием и фонами."
    },
    {
        id: 2,
        title: "Запуск лектория",
        image: "/images/moment_lectorium.jpg",
        caption: "Уютное пространство для открытых лекций, встреч и совместного развития.",
        details: "В лектории проходят мероприятия каждый вторник и четверг. Следите за расписанием!"
    },
    {
        id: 3,
        title: "Пополнение библиотеки",
        image: "/images/moment_bookshelf.jpg",
        caption: "Добавлены новинки литературы по психологии, технологиям и саморазвитию.",
        details: "Теперь доступны более 500 новых книг и журналов, включая редкие зарубежные издания."
    },
    {
        id: 4,
        title: "Комната 1 — зона мини-игр",
        image: "/images/moment_games.jpg",
        caption: "Теперь в комнате 1 можно сыграть в настольные игры и отвлечься от учёбы.",
        details: "В наличии: шахматы, монополия, UNO, Jenga и многое другое для отдыха и общения."
    },
    {
        id: 5,
        title: "Арт-пространство",
        image: "/images/room3_1.jpg",
        caption: "Творческая мастерская с материалами для рисования и моделирования.",
        details: "Доступно всем зарегистрированным участникам — приходите и творите!"
    },
    {
        id: 6,
        title: "Коворкинг 2.0",
        image: "/images/room1_1.jpg",
        caption: "Улучшенное пространство с новыми креслами, кофе-машиной и быстрым Wi-Fi.",
        details: "Теперь здесь еще комфортнее учиться, работать и проводить встречи."
    }
];

const MomentsPage = () => {
    const [expandedId, setExpandedId] = useState(null);

    const toggleExpand = (id) => {
        setExpandedId(prev => (prev === id ? null : id));
    };

    return (
        <Layout>
            <div className="moments-container">
                <h2 className="moments-title">✨ Яркие новинки и уютные изменения</h2>
                <div className="moments-grid">
                    {moments.map((moment, idx) => (
                        <div
                            key={moment.id}
                            className={`moment-card fade-in ${expandedId === moment.id ? "expanded" : ""}`}
                            style={{ animationDelay: `${0.1 * idx}s` }}
                            onClick={() => toggleExpand(moment.id)}
                        >
                            <img src={moment.image} alt={moment.title} className="moment-image" />
                            <div className="moment-info">
                                <h3 className="moment-title">{moment.title}</h3>
                                <p className="moment-caption">{moment.caption}</p>
                                {expandedId === moment.id && (
                                    <p className="moment-details">{moment.details}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default MomentsPage;
