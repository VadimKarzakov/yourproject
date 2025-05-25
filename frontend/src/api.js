const API_BASE = "http://localhost:8080/api";

export const authorizedFetch = async (url, options = {}) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found in localStorage");

    const response = await fetch(url, {
        ...options,
        headers: {
            ...(options.headers || {}),
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(`Fetch error: ${response.status} - ${text}`);
    }

    if (response.status === 204 || response.headers.get("content-length") === "0") {
        return null;
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
        return await response.json();
    }

    return await response.text();
};


export async function fetchBookings() {
    return await authorizedFetch(`${API_BASE}/bookings`);
}

export async function fetchBookingsByUser(userId) {
    return await authorizedFetch(`${API_BASE}/bookings/user/${userId}`);
}

export async function createBooking(bookingDTO) {
    return await authorizedFetch(`${API_BASE}/bookings`, {
        method: "POST",
        body: JSON.stringify(bookingDTO),
    });
}

export async function deleteBooking(id) {
    return await authorizedFetch(`${API_BASE}/bookings/${id}`, {
        method: "DELETE",
    });
}

export async function updateBooking(id, dto) {
    return await authorizedFetch(`${API_BASE}/bookings/${id}`, {
        method: "PUT",
        body: JSON.stringify(dto),
    });
}


export async function fetchUsers() {
    return await authorizedFetch(`${API_BASE}/users`);
}

export async function deleteUser(id) {
    return await authorizedFetch(`${API_BASE}/users/${id}`, {
        method: "DELETE",
    });
}


export async function fetchRooms() {
    return await authorizedFetch(`${API_BASE}/rooms`);
}

export async function deleteRoom(id) {
    return await authorizedFetch(`${API_BASE}/rooms/${id}`, {
        method: "DELETE",
    });
}


export async function fetchStaff() {
    return await authorizedFetch(`${API_BASE}/staff`);
}

export async function createStaff(staffDTO) {
    return await authorizedFetch(`${API_BASE}/staff`, {
        method: "POST",
        body: JSON.stringify(staffDTO),
    });
}

export async function deleteStaff(id) {
    return await authorizedFetch(`${API_BASE}/staff/${id}`, {
        method: "DELETE",
    });
}


export async function fetchRequests() {
    return await authorizedFetch(`${API_BASE}/requests`);
}

export async function createRequest(requestDTO) {
    return await authorizedFetch(`${API_BASE}/requests`, {
        method: "POST",
        body: JSON.stringify(requestDTO),
    });
}

export async function deleteRequest(id) {
    return await authorizedFetch(`${API_BASE}/requests/${id}`, {
        method: "DELETE",
    });
}
export async function updateRequestStatus(id, status) {
    return await authorizedFetch(`${API_BASE}/requests/${id}/status?status=${status}`, {
        method: "PUT",
    });
}
export async function fetchEvents() {
    return await authorizedFetch(`${API_BASE}/events`);
}

export async function createEvent(eventDTO) {
    return await authorizedFetch(`${API_BASE}/events`, {
        method: "POST",
        body: JSON.stringify(eventDTO),
    });
}

export async function deleteEvent(id) {
    return await authorizedFetch(`${API_BASE}/events/${id}`, {
        method: "DELETE",
    });
}