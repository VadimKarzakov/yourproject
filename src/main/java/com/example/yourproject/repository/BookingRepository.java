package com.example.yourproject.repository;

import com.example.yourproject.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUserId(Long userId);
    List<Booking> findByRoomId(Long roomId);

    @Query("""
        SELECT CASE WHEN COUNT(b) > 0 THEN TRUE ELSE FALSE END
        FROM Booking b
        WHERE b.room.id = :roomId
          AND (:startTime < b.endTime AND :endTime > b.startTime)
    """)
    boolean existsByRoomIdAndTimeOverlap(
            @Param("roomId") Long roomId,
            @Param("startTime") LocalDateTime startTime,
            @Param("endTime") LocalDateTime endTime
    );

    @Query("""
        SELECT CASE WHEN COUNT(b) > 0 THEN TRUE ELSE FALSE END
        FROM Booking b
        WHERE b.room.id = :roomId
          AND b.id <> :bookingId
          AND (:startTime < b.endTime AND :endTime > b.startTime)
    """)
    boolean existsConflictExcludingSelf(
            @Param("bookingId") Long bookingId,
            @Param("roomId") Long roomId,
            @Param("startTime") LocalDateTime startTime,
            @Param("endTime") LocalDateTime endTime
    );
}
