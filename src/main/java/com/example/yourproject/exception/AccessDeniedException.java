package com.example.yourproject.exception;

public class AccessDeniedException extends RuntimeException {
    public AccessDeniedException() {
        super("У вас нет прав для выполнения данного действия.");
    }
}
