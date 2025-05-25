package com.example.yourproject.service;

import com.example.yourproject.model.Event;
import com.example.yourproject.repository.EventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EventService {
    private final EventRepository repository;

    public List<Event> getAll() {
        return repository.findAll();
    }

    public Event create(Event event) {
        return repository.save(event);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}