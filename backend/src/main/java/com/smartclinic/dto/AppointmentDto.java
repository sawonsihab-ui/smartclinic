package com.smartclinic.dto;

import com.smartclinic.entity.Appointment;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

public class AppointmentDto {
    private Long id;
    private Long patientId;
    private String patientName;
    private Long doctorId;
    private String doctorName;
    private String doctorSpecialization;
    private String departmentName;
    private LocalDate appointmentDate;
    private LocalTime startTime;
    private LocalTime endTime;
    private String status;
    private String reason;
    private LocalDateTime createdAt;

    public AppointmentDto() {}

    public AppointmentDto(Appointment appointment) {
        this.id = appointment.getId();
        if (appointment.getPatient() != null) {
            this.patientId = appointment.getPatient().getId();
            if (appointment.getPatient().getUser() != null) {
                this.patientName = appointment.getPatient().getUser().getName();
            }
        }
        if (appointment.getDoctor() != null) {
            this.doctorId = appointment.getDoctor().getId();
            if (appointment.getDoctor().getUser() != null) {
                this.doctorName = appointment.getDoctor().getUser().getName();
            }
            this.doctorSpecialization = appointment.getDoctor().getSpecialization();
            if (appointment.getDoctor().getDepartment() != null) {
                this.departmentName = appointment.getDoctor().getDepartment().getName();
            }
        }
        this.appointmentDate = appointment.getAppointmentDate();
        this.startTime = appointment.getStartTime();
        this.endTime = appointment.getEndTime();
        this.status = appointment.getStatus();
        this.reason = appointment.getReason();
        this.createdAt = appointment.getCreatedAt();
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

    public String getDoctorSpecialization() { return doctorSpecialization; }
    public void setDoctorSpecialization(String doctorSpecialization) { this.doctorSpecialization = doctorSpecialization; }

    public String getDepartmentName() { return departmentName; }
    public void setDepartmentName(String departmentName) { this.departmentName = departmentName; }

    public LocalDate getAppointmentDate() { return appointmentDate; }
    public void setAppointmentDate(LocalDate appointmentDate) { this.appointmentDate = appointmentDate; }

    public LocalTime getStartTime() { return startTime; }
    public void setStartTime(LocalTime startTime) { this.startTime = startTime; }

    public LocalTime getEndTime() { return endTime; }
    public void setEndTime(LocalTime endTime) { this.endTime = endTime; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
