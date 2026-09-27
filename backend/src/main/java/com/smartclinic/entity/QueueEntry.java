package com.smartclinic.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "queue_entries")
public class QueueEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "appointment_id")
    private Appointment appointment;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "doctor_id", nullable = false)
    private Doctor doctor;

    @Column(name = "queue_number", nullable = false)
    private Integer queueNumber;

    @Column(nullable = false, length = 20)
    private String priority = "NORMAL"; // NORMAL, URGENT, EMERGENCY

    @Column(nullable = false, length = 20)
    private String status = "WAITING"; // WAITING, CALLED, IN_PROGRESS, COMPLETED

    @Column(name = "check_in_time", updatable = false)
    private LocalDateTime checkInTime = LocalDateTime.now();

    public QueueEntry() {}

    public QueueEntry(Appointment appointment, Patient patient, Doctor doctor, Integer queueNumber, String priority, String status) {
        this.appointment = appointment;
        this.patient = patient;
        this.doctor = doctor;
        this.queueNumber = queueNumber;
        this.priority = priority;
        this.status = status;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Appointment getAppointment() { return appointment; }
    public void setAppointment(Appointment appointment) { this.appointment = appointment; }

    public Patient getPatient() { return patient; }
    public void setPatient(Patient patient) { this.patient = patient; }

    public Doctor getDoctor() { return doctor; }
    public void setDoctor(Doctor doctor) { this.doctor = doctor; }

    public Integer getQueueNumber() { return queueNumber; }
    public void setQueueNumber(Integer queueNumber) { this.queueNumber = queueNumber; }

    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getCheckInTime() { return checkInTime; }
    public void setCheckInTime(LocalDateTime checkInTime) { this.checkInTime = checkInTime; }
}
