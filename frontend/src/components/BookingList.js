import React, { useEffect, useState } from "react";
import { fetchBookings } from "../services/bookingService";

const BookingList = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        fetchBookings().then(setBookings);
    }, []);

    return (
        <div>
            <h2>Список бронирований</h2>
            <ul>
                {bookings.map((booking) => (
                    <li key={booking.id}>
                        Пользователь #{booking.userId} забронировал комнату #{booking.roomId} <br />
                        С {booking.startTime} до {booking.endTime}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookingList;
