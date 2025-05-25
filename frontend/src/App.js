import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BookingPage from './pages/BookingPage';
import RoomPage from './pages/RoomPage';
import UserPage from './pages/UserPage';
import CalendarPage from './pages/CalendarPage';
import AdminPanelPage from './pages/AdminPanelPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import AboutPage from './pages/AboutPage';
import RequestPage from './pages/RequestPage';
import EventPage from './pages/EventPage';
import MomentsPage from './pages/MomentsPage';

import { AuthProvider, useAuth } from './context/AuthContext';
import LogoutButton from './components/LogoutButton';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return <div>Загрузка...</div>;
    return user ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
                    <LogoutButton />
                </div>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/request" element={
                        <PrivateRoute>
                            <RequestPage />
                        </PrivateRoute>
                    } />
                    <Route path="/events" element={
                        <PrivateRoute>
                            <EventPage />
                        </PrivateRoute>
                    } />
                    <Route path="/moments" element={
                        <PrivateRoute>
                            <MomentsPage />
                        </PrivateRoute>
                    } />
                    <Route path="/" element={
                        <PrivateRoute>
                            <HomePage />
                        </PrivateRoute>
                    } />
                    <Route path="/bookings" element={
                        <PrivateRoute>
                            <BookingPage />
                        </PrivateRoute>
                    } />
                    <Route path="/rooms" element={
                        <PrivateRoute>
                            <RoomPage />
                        </PrivateRoute>
                    } />
                    <Route path="/users" element={
                        <PrivateRoute>
                            <UserPage />
                        </PrivateRoute>
                    } />
                    <Route path="/calendar" element={
                        <PrivateRoute>
                            <CalendarPage />
                        </PrivateRoute>
                    } />
                    <Route path="/admin" element={
                        <PrivateRoute>
                            <AdminPanelPage />
                        </PrivateRoute>
                    } />
                    <Route path="/profile" element={
                        <PrivateRoute>
                            <ProfilePage />
                        </PrivateRoute>
                    } />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
