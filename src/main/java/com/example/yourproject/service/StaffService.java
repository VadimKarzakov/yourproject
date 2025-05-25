package com.example.yourproject.service;

import com.example.yourproject.dto.StaffDTO;
import com.example.yourproject.mapper.StaffMapper;
import com.example.yourproject.model.Staff;
import com.example.yourproject.repository.StaffRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StaffService {
    private final StaffRepository staffRepository;
    private final StaffMapper staffMapper;

    public StaffDTO createStaff(StaffDTO dto) {
        Staff staff = staffMapper.toEntity(dto);
        return staffMapper.toDTO(staffRepository.save(staff));
    }

    public List<StaffDTO> getAllStaff() {
        return staffRepository.findAll().stream()
                .map(staffMapper::toDTO)
                .collect(Collectors.toList());
    }

    public void deleteStaff(Long id) {
        staffRepository.deleteById(id);
    }
}
