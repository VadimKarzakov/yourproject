package com.example.yourproject.mapper;

import com.example.yourproject.dto.RoomDTO;
import com.example.yourproject.model.Room;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface RoomMapper {
    Room toEntity(RoomDTO roomDTO);
    RoomDTO toDTO(Room room);
}
