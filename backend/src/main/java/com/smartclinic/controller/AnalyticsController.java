package com.smartclinic.controller;

import com.smartclinic.dto.DashboardAnalyticsDto;
import com.smartclinic.dto.PatientVolumePredictRequest;
import com.smartclinic.dto.PatientVolumePredictResponse;
import com.smartclinic.service.AnalyticsService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    public AnalyticsController(AnalyticsService analyticsService) {
        this.analyticsService = analyticsService;
    }

    @GetMapping("/dashboard")
    @PreAuthorize("hasAnyRole('ADMIN', 'DOCTOR', 'STAFF')")
    public ResponseEntity<DashboardAnalyticsDto> getDashboardAnalytics() {
        return ResponseEntity.ok(analyticsService.getDashboardAnalytics());
    }

    @PostMapping("/patient-volume")
    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF', 'DOCTOR')")
    public ResponseEntity<PatientVolumePredictResponse> predictPatientVolume(@Valid @RequestBody PatientVolumePredictRequest request) {
        return ResponseEntity.ok(analyticsService.predictPatientVolume(request));
    }
}
