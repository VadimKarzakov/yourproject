package com.example.yourproject.controller;

import com.example.yourproject.model.Event;
import com.example.yourproject.service.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
@RequiredArgsConstructor
public class EventController {

    private final EventService service;

    @GetMapping
    public List<Event> getAll() {
        return service.getAll();
    }

    @PostMapping
    public Event create(@RequestBody Event event) {
        return service.create(event);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
