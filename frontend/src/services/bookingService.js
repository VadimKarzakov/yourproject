const API_URL = "http://localhost:8080/api/bookings";

export async function fetchBookings() {
    const response = await fetch(API_URL);
    return response.json();
}
