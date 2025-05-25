import React, { useState } from "react";
import Layout from "../components/Layout";
import Slider from "react-slick";
import Modal from "react-modal";

const modalStyles = {
    content: {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#fff',
        borderRadius: '10px',
        padding: '1rem',
        maxWidth: '90vw',
        maxHeight: '90vh',
        overflow: 'auto',
        boxShadow: '0 4px 12px rgba(0,0,0,0.25)'
    }
};

const rooms = [
    {
        id: 1,
        name: "Комната 1",
        capacity: 6,
        description: "Современная переговорная с проектором и белой доской.",
        images: ["/images/room1_1.jpg", "/images/room1_2.jpg"]
    },
    {
        id: 2,
        name: "Комната 2",
        capacity: 10,
        description: "Коворкинг с удобными креслами и зоной отдыха.",
        images: ["/images/room2_1.jpg", "/images/room2_2.jpg"]
    },
    {
        id: 3,
        name: "Комната 3",
        capacity: 8,
        description: "Просторная переговорная, оснащённая экраном и микрофонами.",
        images: ["/images/room3_1.jpg", "/images/room3_2.jpg"]
    }
];

const RoomCard = ({ room }) => {
    const [expanded, setExpanded] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalImage, setModalImage] = useState("");

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 400,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true
    };

    const openModal = (src) => {
        setModalImage(src);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <>
            <div style={{
                ...styles.card,
                transform: expanded ? "scale(1.01)" : "scale(1)",
                transition: "transform 0.3s ease"
            }}>
                <div style={styles.cardHeader} onClick={() => setExpanded(!expanded)}>
                    <h3 style={styles.cardTitle}>{room.name}</h3>
                    <span style={styles.arrow}>{expanded ? "▲" : "▼"}</span>
                </div>

                <div style={{
                    ...styles.cardBody,
                    maxHeight: expanded ? "1000px" : "0",
                    opacity: expanded ? 1 : 0,
                    paddingTop: expanded ? "1rem" : "0",
                    overflow: "hidden",
                    transition: "all 0.4s ease"
                }}>
                    <p style={styles.text}><strong>Вместимость:</strong> {room.capacity} человек</p>
                    <p style={styles.text}>{room.description}</p>

                    <Slider {...sliderSettings}>
                        {room.images.map((src, idx) => (
                            <div key={idx}>
                                <img
                                    src={src}
                                    alt={`Комната ${room.id} снимок ${idx + 1}`}
                                    style={styles.image}
                                    onClick={() => openModal(src)}
                                />
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>

            <Modal
                isOpen={modalOpen}
                onRequestClose={closeModal}
                contentLabel="Просмотр изображения"
                style={modalStyles}
                ariaHideApp={false}
            >
                <img src={modalImage} alt="Просмотр" style={{ width: "100%", height: "auto", borderRadius: "8px" }} />
                <button onClick={closeModal} style={styles.modalClose}>Закрыть</button>
            </Modal>
        </>
    );
};

const AboutPage = () => {
    return (
        <Layout>
            <div style={styles.pageContainer}>
                <div style={styles.introSection}>
                    <h1 style={styles.title}>О нас</h1>
                    <p style={styles.description}>
                        Добро пожаловать в систему бронирования РУТ (МИИТ)! Наша платформа позволяет легко бронировать переговорные комнаты и коворкинги.
                    </p>
                    <h3 style={styles.subtitle}>Контакты:</h3>
                    <ul style={styles.list}>
                        <li>Email: <strong>support@miit.ru</strong></li>
                        <li>Телефон: <strong>+7 (495) 123-45-67</strong></li>
                        <li>Адрес: <strong>г. Москва, Новосущевский переулок, д. 22</strong></li>
                    </ul>
                </div>

                <h2 style={styles.sectionTitle}>Доступные комнаты</h2>
                <div style={styles.cardsContainer}>
                    {rooms.map(room => (
                        <RoomCard key={room.id} room={room} />
                    ))}
                </div>
            </div>
        </Layout>
    );
};

const styles = {
    pageContainer: {
        padding: "2rem",
        backgroundColor: "#f0f4f8",
        fontFamily: "'Segoe UI', Arial, sans-serif",
    },
    introSection: {
        backgroundColor: "#fff",
        padding: "2rem",
        borderRadius: "10px",
        marginBottom: "2rem",
        boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
    },
    title: {
        fontSize: "36px",
        color: "#003366",
        marginBottom: "1rem",
    },
    description: {
        fontSize: "18px",
        color: "#333",
        lineHeight: "1.8",
        marginBottom: "1.5rem",
    },
    subtitle: {
        fontSize: "22px",
        color: "#003366",
        marginBottom: "0.5rem",
    },
    list: {
        paddingLeft: "1.5rem",
        fontSize: "18px",
        lineHeight: "1.8",
        color: "#333",
    },
    sectionTitle: {
        fontSize: "28px",
        color: "#003366",
        margin: "2rem 0 1rem 0",
    },
    cardsContainer: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
        gap: "1.5rem",
        alignItems: "start",
    },
    card: {
        backgroundColor: "#fff",
        padding: "1.5rem",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        cursor: "pointer",
        transition: "transform 0.2s",
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        minHeight: "250px",
        overflow: "hidden",
    },
    cardHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        cursor: "pointer",
    },
    cardTitle: {
        fontSize: "22px",
        color: "#003366",
        margin: 0,
    },
    arrow: {
        fontSize: "22px",
        color: "#003366",
        userSelect: "none",
    },
    cardBody: {
        fontSize: "17px",
        color: "#333",
    },
    text: {
        fontSize: "17px",
        margin: "0.5rem 0",
    },
    image: {
        width: "100%",
        height: "280px",
        objectFit: "cover",
        borderRadius: "8px",
        border: "1px solid #ccc",
        cursor: "pointer"
    },
    modalClose: {
        marginTop: "1rem",
        padding: "0.5rem 1rem",
        backgroundColor: "#003366",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        fontSize: "16px",
        display: "block",
        marginLeft: "auto",
        marginRight: "auto"
    }
};

export default AboutPage;
