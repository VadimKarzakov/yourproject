package com.example.yourproject.dto;

import lombok.Data;

@Data
public class RoomDTO {
    private Long id;
    private String name;
    private int capacity;
    private String description;
}
