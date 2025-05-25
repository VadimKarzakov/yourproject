package com.example.yourproject.service;

import com.example.yourproject.model.Request;
import com.example.yourproject.model.enums.RequestStatus;
import com.example.yourproject.repository.RequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RequestService {

    private final RequestRepository repository;

    public Request create(Request request) {
        return repository.save(request);
    }

    public List<Request> getAll() {
        return repository.findAll();
    }

    public List<Request> getByUser(Long userId) {
        return repository.findByUserId(userId);
    }

    public void updateStatus(Long id, RequestStatus status) {
        var req = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Not found"));
        req.setStatus(status);
        repository.save(req);
    }
}
