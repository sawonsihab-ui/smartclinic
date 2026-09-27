package com.smartclinic.controller;

import com.smartclinic.dto.PatientDto;
import com.smartclinic.dto.PatientProfileRequest;
import com.smartclinic.security.CustomUserDetails;
import com.smartclinic.service.PatientService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/patients")
public class PatientController {

    private final PatientService patientService;

    public PatientController(PatientService patientService) {
        this.patientService = patientService;
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'DOCTOR', 'NURSE', 'STAFF')")
    public ResponseEntity<List<PatientDto>> getAllPatients() {
        return ResponseEntity.ok(patientService.getAllPatients());
    }

    @GetMapping("/me")
    @PreAuthorize("hasRole('PATIENT')")
    public ResponseEntity<PatientDto> getMyPatientProfile(@AuthenticationPrincipal CustomUserDetails userDetails) {
        return ResponseEntity.ok(patientService.getPatientByUserId(userDetails.getId()));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'DOCTOR', 'NURSE', 'STAFF', 'PATIENT')")
    public ResponseEntity<PatientDto> getPatientById(@PathVariable Long id) {
        return ResponseEntity.ok(patientService.getPatientById(id));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'PATIENT')")
    public ResponseEntity<PatientDto> updatePatient(@PathVariable Long id, @RequestBody PatientProfileRequest request) {
        return ResponseEntity.ok(patientService.updatePatientProfile(id, request));
    }
}
