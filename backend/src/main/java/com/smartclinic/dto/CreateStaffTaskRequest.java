package com.smartclinic.dto;

import jakarta.validation.constraints.NotBlank;
import java.time.LocalDate;

public class CreateStaffTaskRequest {

    @NotBlank(message = "Title is required")
    private String title;

    private String description;
    private Long assignedToId;
    private String priority = "MEDIUM";
    private LocalDate dueDate;

    public CreateStaffTaskRequest() {}

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Long getAssignedToId() { return assignedToId; }
    public void setAssignedToId(Long assignedToId) { this.assignedToId = assignedToId; }

    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }

    public LocalDate getDueDate() { return dueDate; }
    public void setDueDate(LocalDate dueDate) { this.dueDate = dueDate; }
}
