package com.example.yourproject.exception;

public class StaffNotFoundException extends RuntimeException {
    public StaffNotFoundException(Long id) {
        super("Сотрудник не найден с id: " + id);
    }
}
