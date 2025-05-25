package com.example.yourproject.mapper;

import com.example.yourproject.dto.StaffDTO;
import com.example.yourproject.model.Staff;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface StaffMapper {
    StaffDTO toDTO(Staff staff);
    Staff toEntity(StaffDTO dto);
}
