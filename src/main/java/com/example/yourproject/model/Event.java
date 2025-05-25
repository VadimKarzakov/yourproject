package com.example.yourproject.model;

import com.example.yourproject.model.enums.EventType;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String description;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    private String location;

    @Enumerated(EnumType.STRING)
    private EventType eventType;


}
