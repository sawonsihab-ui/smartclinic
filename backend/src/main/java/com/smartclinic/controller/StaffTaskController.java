package com.smartclinic.controller;

import com.smartclinic.dto.CreateStaffTaskRequest;
import com.smartclinic.dto.StaffTaskDto;
import com.smartclinic.security.CustomUserDetails;
import com.smartclinic.service.StaffTaskService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/staff-tasks")
public class StaffTaskController {

    private final StaffTaskService staffTaskService;

    public StaffTaskController(StaffTaskService staffTaskService) {
        this.staffTaskService = staffTaskService;
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF', 'NURSE', 'DOCTOR')")
    public ResponseEntity<StaffTaskDto> createTask(
            @Valid @RequestBody CreateStaffTaskRequest request,
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        Long assignedById = userDetails != null ? userDetails.getId() : null;
        return ResponseEntity.ok(staffTaskService.createTask(request, assignedById));
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF', 'NURSE')")
    public ResponseEntity<List<StaffTaskDto>> getAllTasks() {
        return ResponseEntity.ok(staffTaskService.getAllTasks());
    }

    @GetMapping("/my")
    @PreAuthorize("hasAnyRole('STAFF', 'NURSE')")
    public ResponseEntity<List<StaffTaskDto>> getMyTasks(@AuthenticationPrincipal CustomUserDetails userDetails) {
        return ResponseEntity.ok(staffTaskService.getTasksForUser(userDetails.getId()));
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF', 'NURSE')")
    public ResponseEntity<StaffTaskDto> updateTaskStatus(@PathVariable Long id, @RequestParam String status) {
        return ResponseEntity.ok(staffTaskService.updateTaskStatus(id, status));
    }
}
