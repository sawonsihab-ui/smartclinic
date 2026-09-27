package com.smartclinic.controller;

import com.smartclinic.dto.RecordVitalsRequest;
import com.smartclinic.dto.VitalsDto;
import com.smartclinic.security.CustomUserDetails;
import com.smartclinic.service.VitalsService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vitals")
public class VitalsController {

    private final VitalsService vitalsService;

    public VitalsController(VitalsService vitalsService) {
        this.vitalsService = vitalsService;
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('NURSE', 'DOCTOR', 'ADMIN')")
    public ResponseEntity<VitalsDto> recordVitals(
            @Valid @RequestBody RecordVitalsRequest request,
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        Long nurseId = userDetails != null ? userDetails.getId() : null;
        return ResponseEntity.ok(vitalsService.recordVitals(request, nurseId));
    }

    @GetMapping("/patient/{patientId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'DOCTOR', 'NURSE', 'PATIENT')")
    public ResponseEntity<List<VitalsDto>> getVitalsByPatient(@PathVariable Long patientId) {
        return ResponseEntity.ok(vitalsService.getVitalsByPatient(patientId));
    }

    @GetMapping("/appointment/{appointmentId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'DOCTOR', 'NURSE', 'PATIENT')")
    public ResponseEntity<VitalsDto> getVitalsByAppointment(@PathVariable Long appointmentId) {
        return ResponseEntity.ok(vitalsService.getVitalsByAppointment(appointmentId));
    }
}
