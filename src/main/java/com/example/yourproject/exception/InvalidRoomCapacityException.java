package com.example.yourproject.exception;

public class InvalidRoomCapacityException extends RuntimeException {
    public InvalidRoomCapacityException(int capacity) {
        super("Недопустимая вместимость комнаты: " + capacity + ". Она должна быть больше 0.");
    }
}
