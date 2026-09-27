package com.smartclinic.controller;

import com.smartclinic.dto.CreateLabTestRequest;
import com.smartclinic.dto.LabTestDto;
import com.smartclinic.dto.SubmitLabResultRequest;
import com.smartclinic.security.CustomUserDetails;
import com.smartclinic.service.LabTestService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lab-tests")
public class LabTestController {

    private final LabTestService labTestService;

    public LabTestController(LabTestService labTestService) {
        this.labTestService = labTestService;
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('DOCTOR', 'ADMIN')")
    public ResponseEntity<LabTestDto> requestLabTest(
            @Valid @RequestBody CreateLabTestRequest request,
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        return ResponseEntity.ok(labTestService.requestLabTest(request, userDetails.getId()));
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'DOCTOR', 'STAFF', 'NURSE')")
    public ResponseEntity<List<LabTestDto>> getAllLabTests() {
        return ResponseEntity.ok(labTestService.getAllLabTests());
    }

    @GetMapping("/patient/{patientId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'DOCTOR', 'PATIENT')")
    public ResponseEntity<List<LabTestDto>> getLabTestsByPatient(@PathVariable Long patientId) {
        return ResponseEntity.ok(labTestService.getLabTestsByPatient(patientId));
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasAnyRole('ADMIN', 'DOCTOR', 'STAFF')")
    public ResponseEntity<LabTestDto> updateStatus(@PathVariable Long id, @RequestParam String status) {
        return ResponseEntity.ok(labTestService.updateLabTestStatus(id, status));
    }

    @PostMapping("/results")
    @PreAuthorize("hasAnyRole('ADMIN', 'DOCTOR', 'STAFF')")
    public ResponseEntity<LabTestDto> submitLabResult(@Valid @RequestBody SubmitLabResultRequest request) {
        return ResponseEntity.ok(labTestService.submitLabResult(request));
    }
}
