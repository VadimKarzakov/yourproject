import React, { useEffect, useState } from "react";
import AddUserForm from "../components/admin/AddUserForm";
import AddRoomForm from "../components/admin/AddRoomForm";
import AddBookingForm from "../components/admin/AddBookingForm";
import EditBookingForm from "../components/admin/EditBookingForm";
import AddStaffForm from "../components/admin/AddStaffForm";
import Layout from "../components/Layout";
import AddRequestForm from "../components/admin/AddRequestForm";
import AddEventForm from "../components/admin/AddEventForm";

import {
    fetchUsers,
    fetchRooms,
    fetchBookings,
    deleteBooking,
    deleteRoom,
    deleteUser,
    fetchStaff,
    deleteStaff,
    fetchRequests,
    deleteRequest
} from "../api";

const AdminPanelPage = () => {
    const [users, setUsers] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [staff, setStaff] = useState([]);
    const [requests, setRequests] = useState([]);
    const [editingBooking, setEditingBooking] = useState(null);

    const [userFilter, setUserFilter] = useState("");
    const [roomFilter, setRoomFilter] = useState("");
    const [bookingFilter, setBookingFilter] = useState("");
    const [staffFilter, setStaffFilter] = useState("");
    const [requestFilter, setRequestFilter] = useState("");

    const fetchAll = async () => {
        try {
            const [u, r, b, s, rq] = await Promise.all([
                fetchUsers(),
                fetchRooms(),
                fetchBookings(),
                fetchStaff(),
                fetchRequests()
            ]);
            setUsers(u);
            setRooms(r);
            setBookings(b);
            setStaff(s);
            setRequests(rq);
        } catch (err) {
            console.error("Ошибка при загрузке данных:", err.message);
        }
    };

    useEffect(() => {
        fetchAll();
    }, []);

    return (
        <Layout>
            <div style={styles.container}>
                <h1 style={styles.heading}>Админ-панель</h1>

                <div style={styles.formRow}>
                    <AddUserForm onSubmitSuccess={fetchAll} />
                    <AddRoomForm onSubmitSuccess={fetchAll} />
                    <AddBookingForm onSubmitSuccess={fetchAll} />
                    <AddStaffForm onSubmitSuccess={fetchAll} />
                    <AddRequestForm onSubmitSuccess={fetchAll} />
                    <AddEventForm onSubmitSuccess={fetchAll} />


                </div>

                {editingBooking && (
                    <EditBookingForm
                        booking={editingBooking}
                        onClose={() => setEditingBooking(null)}
                        onSubmitSuccess={() => {
                            setEditingBooking(null);
                            fetchAll();
                        }}
                    />
                )}

                <AdminSection title="Пользователи" filter={userFilter} setFilter={setUserFilter}>
                    <AdminTable
                        headers={["ID", "Username", "Email", "Role", ""]}
                        rows={users
                            .filter(u =>
                                (u.username ?? "").toLowerCase().includes(userFilter.toLowerCase()) ||
                                (u.email ?? "").toLowerCase().includes(userFilter.toLowerCase())
                            )
                            .map(u => [
                                u.id,
                                u.username,
                                u.email,
                                u.role,
                                <button style={styles.deleteBtn} onClick={() => deleteUser(u.id).then(fetchAll)}>Удалить</button>
                            ])}
                    />
                </AdminSection>

                <AdminSection title="Персонал" filter={staffFilter} setFilter={setStaffFilter}>
                    <AdminTable
                        headers={["ID", "Имя", "Должность", ""]}
                        rows={staff
                            .filter(s =>
                                (s.name ?? "").toLowerCase().includes(staffFilter.toLowerCase()) ||
                                (s.position ?? "").toLowerCase().includes(staffFilter.toLowerCase())
                            )
                            .map(s => [
                                s.id,
                                s.fullName,
                                s.position,
                                <button style={styles.deleteBtn} onClick={() => deleteStaff(s.id).then(fetchAll)}>Удалить</button>
                            ])}
                    />
                </AdminSection>

                <AdminSection title="Комнаты" filter={roomFilter} setFilter={setRoomFilter}>
                    <AdminTable
                        headers={["ID", "Название", "Описание", "Вместимость", ""]}
                        rows={rooms
                            .filter(r => (r.name ?? "").toLowerCase().includes(roomFilter.toLowerCase()))
                            .map(r => [
                                r.id,
                                r.name,
                                r.description,
                                r.capacity,
                                <button style={styles.deleteBtn} onClick={() => deleteRoom(r.id).then(fetchAll)}>Удалить</button>
                            ])}
                    />
                </AdminSection>

                <AdminSection title="Бронирования" filter={bookingFilter} setFilter={setBookingFilter}>
                    <AdminTable
                        headers={["ID", "User ID", "Room ID", "Start", "End", "Status", "", ""]}
                        rows={bookings
                            .filter(b =>
                                (b.status ?? "").toLowerCase().includes(bookingFilter.toLowerCase()) ||
                                String(b.userId ?? "").includes(bookingFilter) ||
                                String(b.roomId ?? "").includes(bookingFilter)
                            )
                            .map(b => [
                                b.id,
                                b.userId,
                                b.roomId,
                                new Date(b.startTime).toLocaleString(),
                                new Date(b.endTime).toLocaleString(),
                                b.status,
                                <button style={styles.editBtn} onClick={() => setEditingBooking(b)}>✏️</button>,
                                <button style={styles.deleteBtn} onClick={() => deleteBooking(b.id).then(fetchAll)}>🗑️</button>
                            ])}
                    />
                </AdminSection>

                <AdminSection title="Заявки" filter={requestFilter} setFilter={setRequestFilter}>
                    <AdminTable
                        headers={["ID", "Тип", "Описание", "Статус", "Дата", "Пользователь", ""]}
                        rows={requests
                            .filter(r =>
                                (r.type ?? "").toLowerCase().includes(requestFilter.toLowerCase()) ||
                                (r.description ?? "").toLowerCase().includes(requestFilter.toLowerCase())
                            )
                            .map(r => [
                                r.id,
                                r.type.replaceAll("_", " "),
                                r.description || "-",
                                r.status,
                                new Date(r.createdAt).toLocaleString(),
                                r.user?.username || "—",
                                <button style={styles.deleteBtn} onClick={() => deleteRequest(r.id).then(fetchAll)}>Удалить</button>
                            ])}
                    />
                </AdminSection>
            </div>
        </Layout>
    );
};

const AdminSection = ({ title, filter, setFilter, children }) => (
    <div style={styles.section}>
        <h2 style={styles.sectionHeading}>{title}</h2>
        <input
            type="text"
            value={filter}
            onChange={e => setFilter(e.target.value)}
            placeholder="Поиск..."
            style={styles.searchInput}
        />
        {children}
    </div>
);

const AdminTable = ({ headers, rows }) => (
    <table style={styles.table}>
        <thead>
        <tr>{headers.map((h, idx) => <th key={idx} style={styles.th}>{h}</th>)}</tr>
        </thead>
        <tbody>
        {rows.map((row, idx) => (
            <tr key={idx}>
                {row.map((cell, i) => <td key={i} style={styles.td}>{cell}</td>)}
            </tr>
        ))}
        </tbody>
    </table>
);

const styles = {
    container: { padding: "2rem", fontFamily: "Arial, sans-serif", backgroundColor: "#f9f9f9" },
    heading: { color: "#003366", marginBottom: "1rem" },
    formRow: { display: "flex", gap: "2rem", marginBottom: "2rem", flexWrap: "wrap" },
    section: { marginBottom: "2rem" },
    sectionHeading: { color: "#003366", marginBottom: "0.5rem" },
    searchInput: {
        padding: "8px", width: "300px", marginBottom: "1rem",
        border: "1px solid #ccc", borderRadius: "4px"
    },
    table: {
        width: "100%", borderCollapse: "collapse",
        backgroundColor: "#fff", border: "1px solid #ddd"
    },
    th: {
        backgroundColor: "#003366", color: "#fff",
        padding: "10px", border: "1px solid #ddd"
    },
    td: { padding: "10px", border: "1px solid #ddd" },
    deleteBtn: {
        backgroundColor: "#cc0000", color: "#fff",
        border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer"
    },
    editBtn: {
        backgroundColor: "#007acc", color: "#fff",
        border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer"
    }
};

export default AdminPanelPage;
