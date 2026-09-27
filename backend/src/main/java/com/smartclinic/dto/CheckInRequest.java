package com.smartclinic.dto;

import jakarta.validation.constraints.NotNull;

public class CheckInRequest {

    @NotNull(message = "Appointment ID is required")
    private Long appointmentId;

    private String priority = "NORMAL"; // NORMAL, URGENT, EMERGENCY

    public CheckInRequest() {}

    public Long getAppointmentId() { return appointmentId; }
    public void setAppointmentId(Long appointmentId) { this.appointmentId = appointmentId; }

    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }
}
