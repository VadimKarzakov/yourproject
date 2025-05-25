import React from "react";
import MyBookingsCalendar from "../components/MyBookingsCalendar";
import Layout from "../components/Layout";
import "./CalendarPage.css"; // Подключаем стили

const CalendarPage = () => {
    return (
        <Layout>
            <div className="calendar-page-container fade-in">
                <h2 className="calendar-page-title">🗓 Мой календарь бронирований</h2>
                <MyBookingsCalendar />
            </div>
        </Layout>
    );
};

export default CalendarPage;
