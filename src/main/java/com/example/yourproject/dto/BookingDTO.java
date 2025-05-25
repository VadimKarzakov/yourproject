package com.example.yourproject.dto;

import lombok.Data;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Data
public class BookingDTO {

    private Long id;

    @NotNull(message = "User ID не должен быть пустым")
    private Long userId;

    @NotNull(message = "Room ID не должен быть пустым")
    private Long roomId;

    @NotNull(message = "Дата и время начала бронирования не должны быть пустыми")
    private LocalDateTime startTime;

    @NotNull(message = "Дата и время окончания бронирования не должны быть пустыми")
    private LocalDateTime endTime;

    @NotNull(message = "Статус бронирования обязателен")
    private String status;
}
