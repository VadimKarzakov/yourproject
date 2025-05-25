package com.example.yourproject.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "staff")
public class Staff {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;
    private String position;
    private String email;
    private String phone;
}
