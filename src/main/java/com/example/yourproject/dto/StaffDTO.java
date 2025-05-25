package com.example.yourproject.dto;

import lombok.Data;

@Data
public class StaffDTO {
    private Long id;
    private String fullName;
    private String position;
    private String email;
    private String phone;
}
