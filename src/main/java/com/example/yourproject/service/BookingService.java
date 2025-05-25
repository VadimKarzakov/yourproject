package com.example.yourproject.service;

import com.example.yourproject.dto.BookingDTO;
import com.example.yourproject.mapper.BookingMapper;
import com.example.yourproject.model.Booking;
import com.example.yourproject.model.Room;
import com.example.yourproject.model.User;
import com.example.yourproject.repository.BookingRepository;
import com.example.yourproject.repository.RoomRepository;
import com.example.yourproject.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class BookingService {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final RoomRepository roomRepository;
    private final BookingMapper bookingMapper;

    public BookingDTO saveBooking(BookingDTO dto) {
        log.info("Attempting to create a booking: {}", dto);

        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with id: " + dto.getUserId()));
        Room room = roomRepository.findById(dto.getRoomId())
                .orElseThrow(() -> new RuntimeException("Room not found with id: " + dto.getRoomId()));

        boolean conflict = bookingRepository.existsByRoomIdAndTimeOverlap(
                dto.getRoomId(), dto.getStartTime(), dto.getEndTime());

        if (conflict) {
            log.warn("Booking conflict for roomId={} between {} and {}", dto.getRoomId(), dto.getStartTime(), dto.getEndTime());
            throw new RuntimeException("Эта комната уже занята в выбранное время.");
        }

        Booking booking = bookingMapper.toEntity(dto);
        booking.setUser(user);
        booking.setRoom(room);

        Booking saved = bookingRepository.save(booking);
        log.info("Booking created successfully: id={}, user={}, room={}", saved.getId(), user.getUsername(), room.getName());
        return bookingMapper.toDTO(saved);
    }

    public BookingDTO updateBooking(Long bookingId, BookingDTO dto) {
        log.info("Updating booking id={} with new values: {}", bookingId, dto);

        Booking existing = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found with id: " + bookingId));

        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with id: " + dto.getUserId()));
        Room room = roomRepository.findById(dto.getRoomId())
                .orElseThrow(() -> new RuntimeException("Room not found with id: " + dto.getRoomId()));

        boolean conflict = bookingRepository.existsConflictExcludingSelf(
                bookingId, dto.getRoomId(), dto.getStartTime(), dto.getEndTime());

        if (conflict) {
            log.warn("Update conflict for bookingId={}, roomId={} between {} and {}", bookingId, dto.getRoomId(), dto.getStartTime(), dto.getEndTime());
            throw new RuntimeException("Комната уже забронирована на это время другим пользователем.");
        }

        existing.setUser(user);
        existing.setRoom(room);
        existing.setStartTime(dto.getStartTime());
        existing.setEndTime(dto.getEndTime());
        existing.setStatus(dto.getStatus());

        Booking updated = bookingRepository.save(existing);
        log.info("Booking updated successfully: id={}", updated.getId());
        return bookingMapper.toDTO(updated);
    }

    public List<BookingDTO> getBookingsByUserId(Long userId) {
        log.debug("Fetching bookings for userId={}", userId);
        return bookingRepository.findByUserId(userId)
                .stream()
                .map(bookingMapper::toDTO)
                .collect(Collectors.toList());
    }

    public BookingDTO getBookingById(Long id) {
        log.debug("Fetching booking by id={}", id);
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found with id: " + id));
        return bookingMapper.toDTO(booking);
    }

    public List<BookingDTO> getAllBookings() {
        log.debug("Fetching all bookings");
        return bookingRepository.findAll().stream()
                .map(bookingMapper::toDTO)
                .collect(Collectors.toList());
    }

    public void deleteBooking(Long id) {
        log.info("Deleting booking with id={}", id);
        bookingRepository.deleteById(id);
    }
}
