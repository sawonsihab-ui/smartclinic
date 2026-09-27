package com.smartclinic.dto;

import jakarta.validation.constraints.NotBlank;

public class UpdateQueueStatusRequest {

    @NotBlank(message = "Status is required")
    private String status; // WAITING, CALLED, IN_PROGRESS, COMPLETED

    public UpdateQueueStatusRequest() {}

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
