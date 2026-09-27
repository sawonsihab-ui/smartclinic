package com.smartclinic.controller;

import com.smartclinic.dto.CheckInRequest;
import com.smartclinic.dto.QueueEntryDto;
import com.smartclinic.dto.UpdateQueueStatusRequest;
import com.smartclinic.security.CustomUserDetails;
import com.smartclinic.service.QueueService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/queue")
public class QueueController {

    private final QueueService queueService;

    public QueueController(QueueService queueService) {
        this.queueService = queueService;
    }

    @PostMapping("/check-in")
    @PreAuthorize("hasAnyRole('NURSE', 'STAFF', 'ADMIN')")
    public ResponseEntity<QueueEntryDto> checkInPatient(@Valid @RequestBody CheckInRequest request) {
        return ResponseEntity.ok(queueService.checkInPatient(request));
    }

    @GetMapping("/doctor/{doctorId}")
    @PreAuthorize("hasAnyRole('DOCTOR', 'NURSE', 'STAFF', 'ADMIN')")
    public ResponseEntity<List<QueueEntryDto>> getDoctorQueue(@PathVariable Long doctorId) {
        return ResponseEntity.ok(queueService.getDoctorQueue(doctorId));
    }

    @GetMapping("/my")
    @PreAuthorize("hasRole('PATIENT')")
    public ResponseEntity<List<QueueEntryDto>> getMyQueueEntries(@AuthenticationPrincipal CustomUserDetails userDetails) {
        return ResponseEntity.ok(queueService.getQueueEntriesForCurrentUser(userDetails.getId()));
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasAnyRole('DOCTOR', 'NURSE', 'STAFF', 'ADMIN')")
    public ResponseEntity<QueueEntryDto> updateQueueStatus(
            @PathVariable Long id,
            @Valid @RequestBody UpdateQueueStatusRequest request) {
        return ResponseEntity.ok(queueService.updateQueueStatus(id, request.getStatus()));
    }
}
