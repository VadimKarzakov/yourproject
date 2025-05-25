package com.example.yourproject.exception;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(Long id) {
        super("Пользователь не найден с id: " + id);
    }
}
