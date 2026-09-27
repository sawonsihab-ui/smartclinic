package com.smartclinic.dto;

import com.smartclinic.entity.MedicalRecord;
import java.time.LocalDateTime;

public class MedicalRecordDto {
    private Long id;
    private Long patientId;
    private String patientName;
    private Long doctorId;
    private String doctorName;
    private Long appointmentId;
    private String symptoms;
    private String diagnosis;
    private String notes;
    private String treatmentPlan;
    private LocalDateTime createdAt;

    public MedicalRecordDto() {}

    public MedicalRecordDto(MedicalRecord record) {
        this.id = record.getId();
        if (record.getPatient() != null) {
            this.patientId = record.getPatient().getId();
            if (record.getPatient().getUser() != null) {
                this.patientName = record.getPatient().getUser().getName();
            }
        }
        if (record.getDoctor() != null) {
            this.doctorId = record.getDoctor().getId();
            if (record.getDoctor().getUser() != null) {
                this.doctorName = record.getDoctor().getUser().getName();
            }
        }
        if (record.getAppointment() != null) {
            this.appointmentId = record.getAppointment().getId();
        }
        this.symptoms = record.getSymptoms();
        this.diagnosis = record.getDiagnosis();
        this.notes = record.getNotes();
        this.treatmentPlan = record.getTreatmentPlan();
        this.createdAt = record.getCreatedAt();
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

    public String getSymptoms() { return symptoms; }
    public void setSymptoms(String symptoms) { this.symptoms = symptoms; }

    public String getDiagnosis() { return diagnosis; }
    public void setDiagnosis(String diagnosis) { this.diagnosis = diagnosis; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public String getTreatmentPlan() { return treatmentPlan; }
    public void setTreatmentPlan(String treatmentPlan) { this.treatmentPlan = treatmentPlan; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
