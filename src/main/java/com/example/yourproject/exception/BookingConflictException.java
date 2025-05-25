package com.example.yourproject.exception;

public class BookingConflictException extends RuntimeException {
    public BookingConflictException(String message) {
        super("Конфликт бронирования: " + message);
    }
}
