package com.example.yourproject.service;

import com.example.yourproject.dto.RoomDTO;
import com.example.yourproject.mapper.RoomMapper;
import com.example.yourproject.model.Room;
import com.example.yourproject.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RoomService {

    private final RoomRepository roomRepository;
    private final RoomMapper roomMapper;

    @CacheEvict(value = "rooms", allEntries = true)
    public RoomDTO saveRoom(RoomDTO roomDTO) {
        Room room = roomMapper.toEntity(roomDTO);
        room.setAvailable(true);
        Room savedRoom = roomRepository.save(room);
        return roomMapper.toDTO(savedRoom);
    }

    @Cacheable(value = "roomById", key = "#id")
    public RoomDTO getRoomById(Long id) {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found with id: " + id));
        return roomMapper.toDTO(room);
    }

    @Cacheable(value = "rooms")
    public List<RoomDTO> getAllRooms() {
        return roomRepository.findAll().stream()
                .map(roomMapper::toDTO)
                .collect(Collectors.toList());
    }

    @CacheEvict(value = {"rooms", "roomById"}, allEntries = true)
    public void deleteRoom(Long id) {
        roomRepository.deleteById(id);
    }
}
