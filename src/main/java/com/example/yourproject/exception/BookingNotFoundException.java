package com.example.yourproject.exception;

public class BookingNotFoundException extends RuntimeException {
    public BookingNotFoundException(Long id) {
        super("Бронирование не найдено с id: " + id);
    }
}
