package com.smartclinic.dto;

import com.smartclinic.entity.Prescription;
import com.smartclinic.entity.PrescriptionItem;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class PrescriptionDto {
    private Long id;
    private Long patientId;
    private String patientName;
    private Long doctorId;
    private String doctorName;
    private Long appointmentId;
    private LocalDate prescriptionDate;
    private String notes;
    private List<PrescriptionItemDto> items = new ArrayList<>();

    public PrescriptionDto() {}

    public PrescriptionDto(Prescription prescription) {
        this.id = prescription.getId();
        if (prescription.getPatient() != null) {
            this.patientId = prescription.getPatient().getId();
            if (prescription.getPatient().getUser() != null) {
                this.patientName = prescription.getPatient().getUser().getName();
            }
        }
        if (prescription.getDoctor() != null) {
            this.doctorId = prescription.getDoctor().getId();
            if (prescription.getDoctor().getUser() != null) {
                this.doctorName = prescription.getDoctor().getUser().getName();
            }
        }
        if (prescription.getAppointment() != null) {
            this.appointmentId = prescription.getAppointment().getId();
        }
        this.prescriptionDate = prescription.getPrescriptionDate();
        this.notes = prescription.getNotes();
        if (prescription.getItems() != null) {
            for (PrescriptionItem item : prescription.getItems()) {
                this.items.add(new PrescriptionItemDto(item));
            }
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

    public LocalDate getPrescriptionDate() { return prescriptionDate; }
    public void setPrescriptionDate(LocalDate prescriptionDate) { this.prescriptionDate = prescriptionDate; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public List<PrescriptionItemDto> getItems() { return items; }
    public void setItems(List<PrescriptionItemDto> items) { this.items = items; }
}
