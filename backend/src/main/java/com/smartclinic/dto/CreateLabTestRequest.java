package com.smartclinic.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class CreateLabTestRequest {

    @NotNull(message = "Patient ID is required")
    private Long patientId;

    private Long doctorId;
    private Long appointmentId;

    @NotBlank(message = "Test name is required")
    private String testName;

    public CreateLabTestRequest() {}

    public Long getPatientId() { return patientId; }
    public void setPatientId(Long patientId) { this.patientId = patientId; }

    public Long getDoctorId() { return doctorId; }
    public void setDoctorId(Long doctorId) { this.doctorId = doctorId; }

    public Long getAppointmentId() { return appointmentId; }
    public void setAppointmentId(Long appointmentId) { this.appointmentId = appointmentId; }

    public String getTestName() { return testName; }
    public void setTestName(String testName) { this.testName = testName; }
}
