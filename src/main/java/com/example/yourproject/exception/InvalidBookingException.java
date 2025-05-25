package com.example.yourproject.exception;

public class InvalidBookingException extends RuntimeException {
    public InvalidBookingException(String message) {
        super("Неверные данные бронирования: " + message);
    }
}
