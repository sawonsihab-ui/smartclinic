package com.smartclinic.repository;

import com.smartclinic.entity.QueueEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface QueueEntryRepository extends JpaRepository<QueueEntry, Long> {

    List<QueueEntry> findByDoctorId(Long doctorId);

    List<QueueEntry> findByPatientId(Long patientId);

    Optional<QueueEntry> findByAppointmentId(Long appointmentId);

    @Query("SELECT q FROM QueueEntry q WHERE q.doctor.id = :doctorId AND q.status != 'COMPLETED' ORDER BY CASE q.priority WHEN 'EMERGENCY' THEN 1 WHEN 'URGENT' THEN 2 ELSE 3 END, q.checkInTime ASC")
    List<QueueEntry> findActiveQueueForDoctor(@Param("doctorId") Long doctorId);

    @Query("SELECT COALESCE(MAX(q.queueNumber), 100) FROM QueueEntry q WHERE q.doctor.id = :doctorId AND q.checkInTime >= :startOfDay AND q.checkInTime <= :endOfDay")
    Integer findMaxQueueNumberForDoctorAndDateRange(@Param("doctorId") Long doctorId, @Param("startOfDay") LocalDateTime startOfDay, @Param("endOfDay") LocalDateTime endOfDay);
}
