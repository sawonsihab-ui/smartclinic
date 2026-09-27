package com.smartclinic.dto;

import com.smartclinic.entity.QueueEntry;
import java.time.LocalDateTime;

public class QueueEntryDto {
    private Long id;
    private Long appointmentId;
    private Long patientId;
    private String patientName;
    private Long doctorId;
    private String doctorName;
    private Integer queueNumber;
    private String priority;
    private String status;
    private LocalDateTime checkInTime;

    public QueueEntryDto() {}

    public QueueEntryDto(QueueEntry entry) {
        this.id = entry.getId();
        if (entry.getAppointment() != null) {
            this.appointmentId = entry.getAppointment().getId();
        }
        if (entry.getPatient() != null) {
            this.patientId = entry.getPatient().getId();
            if (entry.getPatient().getUser() != null) {
                this.patientName = entry.getPatient().getUser().getName();
            }
        }
        if (entry.getDoctor() != null) {
            this.doctorId = entry.getDoctor().getId();
            if (entry.getDoctor().getUser() != null) {
                this.doctorName = entry.getDoctor().getUser().getName();
            }
        }
        this.queueNumber = entry.getQueueNumber();
        this.priority = entry.getPriority();
        this.status = entry.getStatus();
        this.checkInTime = entry.getCheckInTime();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getAppointmentId() { return appointmentId; }
    public void setAppointmentId(Long appointmentId) { this.appointmentId = appointmentId; }

    public Long getPatientId() { return patientId; }
    public void setPatientId(Long patientId) { this.patientId = patientId; }

    public String getPatientName() { return patientName; }
    public void setPatientName(String patientName) { this.patientName = patientName; }

    public Long getDoctorId() { return doctorId; }
    public void setDoctorId(Long doctorId) { this.doctorId = doctorId; }

    public String getDoctorName() { return doctorName; }
    public void setDoctorName(String doctorName) { this.doctorName = doctorName; }

    public Integer getQueueNumber() { return queueNumber; }
    public void setQueueNumber(Integer queueNumber) { this.queueNumber = queueNumber; }

    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getCheckInTime() { return checkInTime; }
    public void setCheckInTime(LocalDateTime checkInTime) { this.checkInTime = checkInTime; }
}
