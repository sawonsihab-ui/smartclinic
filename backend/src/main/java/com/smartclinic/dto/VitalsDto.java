package com.smartclinic.dto;

import com.smartclinic.entity.Vitals;
import java.time.LocalDateTime;

public class VitalsDto {
    private Long id;
    private Long patientId;
    private String patientName;
    private Long nurseId;
    private String nurseName;
    private Long appointmentId;
    private Double temperature;
    private String bloodPressure;
    private Integer heartRate;
    private Double weight;
    private Double height;
    private LocalDateTime recordedAt;

    public VitalsDto() {}

    public VitalsDto(Vitals vitals) {
        this.id = vitals.getId();
        if (vitals.getPatient() != null) {
            this.patientId = vitals.getPatient().getId();
            if (vitals.getPatient().getUser() != null) {
                this.patientName = vitals.getPatient().getUser().getName();
            }
        }
        if (vitals.getNurse() != null) {
            this.nurseId = vitals.getNurse().getId();
            this.nurseName = vitals.getNurse().getName();
        }
        if (vitals.getAppointment() != null) {
            this.appointmentId = vitals.getAppointment().getId();
        }
        this.temperature = vitals.getTemperature();
        this.bloodPressure = vitals.getBloodPressure();
        this.heartRate = vitals.getHeartRate();
        this.weight = vitals.getWeight();
        this.height = vitals.getHeight();
        this.recordedAt = vitals.getRecordedAt();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getPatientId() { return patientId; }
    public void setPatientId(Long patientId) { this.patientId = patientId; }

    public String getPatientName() { return patientName; }
    public void setPatientName(String patientName) { this.patientName = patientName; }

    public Long getNurseId() { return nurseId; }
    public void setNurseId(Long nurseId) { this.nurseId = nurseId; }

    public String getNurseName() { return nurseName; }
    public void setNurseName(String nurseName) { this.nurseName = nurseName; }

    public Long getAppointmentId() { return appointmentId; }
    public void setAppointmentId(Long appointmentId) { this.appointmentId = appointmentId; }

    public Double getTemperature() { return temperature; }
    public void setTemperature(Double temperature) { this.temperature = temperature; }

    public String getBloodPressure() { return bloodPressure; }
    public void setBloodPressure(String bloodPressure) { this.bloodPressure = bloodPressure; }

    public Integer getHeartRate() { return heartRate; }
    public void setHeartRate(Integer heartRate) { this.heartRate = heartRate; }

    public Double getWeight() { return weight; }
    public void setWeight(Double weight) { this.weight = weight; }

    public Double getHeight() { return height; }
    public void setHeight(Double height) { this.height = height; }

    public LocalDateTime getRecordedAt() { return recordedAt; }
    public void setRecordedAt(LocalDateTime recordedAt) { this.recordedAt = recordedAt; }
}
