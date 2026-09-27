package com.smartclinic.dto;

import com.smartclinic.entity.LabTest;
import java.time.LocalDateTime;

public class LabTestDto {
    private Long id;
    private Long patientId;
    private String patientName;
    private Long doctorId;
    private String doctorName;
    private Long appointmentId;
    private String testName;
    private String status;
    private LocalDateTime requestedAt;
    private LocalDateTime completedAt;
    private LabResultDto result;

    public LabTestDto() {}

    public LabTestDto(LabTest labTest) {
        this.id = labTest.getId();
        if (labTest.getPatient() != null) {
            this.patientId = labTest.getPatient().getId();
            if (labTest.getPatient().getUser() != null) {
                this.patientName = labTest.getPatient().getUser().getName();
            }
        }
        if (labTest.getDoctor() != null) {
            this.doctorId = labTest.getDoctor().getId();
            if (labTest.getDoctor().getUser() != null) {
                this.doctorName = labTest.getDoctor().getUser().getName();
            }
        }
        if (labTest.getAppointment() != null) {
            this.appointmentId = labTest.getAppointment().getId();
        }
        this.testName = labTest.getTestName();
        this.status = labTest.getStatus();
        this.requestedAt = labTest.getRequestedAt();
        this.completedAt = labTest.getCompletedAt();
        if (labTest.getResult() != null) {
            this.result = new LabResultDto(labTest.getResult());
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getPatientId() { return patientId; }
    public void setPatientId(Long patientId) { this.patientId = patientId; }

    public String getPatientName() { return patientName; }
    public void setPatientName(String patientName) { this.patientName = patientName; }

    public Long getDoctorId() { return doctorId; }
    public void setDoctorId(Long doctorId) { this.doctorId = doctorId; }

    public String getDoctorName() { return doctorName; }
    public void setDoctorName(String doctorName) { this.doctorName = doctorName; }

    public Long getAppointmentId() { return appointmentId; }
    public void setAppointmentId(Long appointmentId) { this.appointmentId = appointmentId; }

    public String getTestName() { return testName; }
    public void setTestName(String testName) { this.testName = testName; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getRequestedAt() { return requestedAt; }
    public void setRequestedAt(LocalDateTime requestedAt) { this.requestedAt = requestedAt; }

    public LocalDateTime getCompletedAt() { return completedAt; }
    public void setCompletedAt(LocalDateTime completedAt) { this.completedAt = completedAt; }

    public LabResultDto getResult() { return result; }
    public void setResult(LabResultDto result) { this.result = result; }
}
