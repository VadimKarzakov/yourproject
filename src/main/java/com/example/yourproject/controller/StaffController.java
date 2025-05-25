package com.example.yourproject.controller;

import com.example.yourproject.dto.StaffDTO;
import com.example.yourproject.service.StaffService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/staff")
@RequiredArgsConstructor
public class StaffController {
    private final StaffService staffService;

    @PostMapping
    public ResponseEntity<StaffDTO> create(@RequestBody StaffDTO dto) {
        return ResponseEntity.ok(staffService.createStaff(dto));
    }

    @GetMapping
    public ResponseEntity<List<StaffDTO>> getAll() {
        return ResponseEntity.ok(staffService.getAllStaff());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        staffService.deleteStaff(id);
        return ResponseEntity.noContent().build();
    }
}
