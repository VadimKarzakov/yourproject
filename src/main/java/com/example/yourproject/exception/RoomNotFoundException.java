package com.example.yourproject.exception;

public class RoomNotFoundException extends RuntimeException {
    public RoomNotFoundException(Long id) {
        super("Переговорная комната не найдена с id: " + id);
    }
}
