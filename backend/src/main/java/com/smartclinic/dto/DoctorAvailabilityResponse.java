package com.smartclinic.dto;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public class DoctorAvailabilityResponse {
    private Long doctorId;
    private String doctorName;
    private LocalDate date;
    private List<LocalTime> availableSlots;

    public DoctorAvailabilityResponse() {}

    public DoctorAvailabilityResponse(Long doctorId, String doctorName, LocalDate date, List<LocalTime> availableSlots) {
        this.doctorId = doctorId;
        this.doctorName = doctorName;
        this.date = date;
        this.availableSlots = availableSlots;
    }

    public Long getDoctorId() { return doctorId; }
    public void setDoctorId(Long doctorId) { this.doctorId = doctorId; }

    public String getDoctorName() { return doctorName; }
    public void setDoctorName(String doctorName) { this.doctorName = doctorName; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public List<LocalTime> getAvailableSlots() { return availableSlots; }
    public void setAvailableSlots(List<LocalTime> availableSlots) { this.availableSlots = availableSlots; }
}
