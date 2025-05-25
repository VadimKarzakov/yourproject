package com.example.yourproject.exception;

public class DuplicateUserException extends RuntimeException {
    public DuplicateUserException(String email) {
        super("Пользователь с email '" + email + "' уже существует.");
    }
}
