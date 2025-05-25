package com.example.yourproject.controller;

import com.example.yourproject.model.Request;
import com.example.yourproject.model.enums.RequestStatus;
import com.example.yourproject.service.RequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/requests")
@RequiredArgsConstructor
public class RequestController {

    private final RequestService service;

    @PostMapping
    public ResponseEntity<Request> create(@RequestBody Request request) {
        return ResponseEntity.ok(service.create(request));
    }

    @GetMapping
    public ResponseEntity<List<Request>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Void> updateStatus(@PathVariable Long id, @RequestParam RequestStatus status) {
        service.updateStatus(id, status);
        return ResponseEntity.ok().build();
    }
}
