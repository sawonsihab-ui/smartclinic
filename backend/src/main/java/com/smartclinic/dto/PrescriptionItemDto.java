package com.smartclinic.dto;

import com.smartclinic.entity.PrescriptionItem;

public class PrescriptionItemDto {
    private Long id;
    private String medicineName;
    private String dosage;
    private String frequency;
    private String duration;
    private String instructions;

    public PrescriptionItemDto() {}

    public PrescriptionItemDto(PrescriptionItem item) {
        this.id = item.getId();
        this.medicineName = item.getMedicineName();
        this.dosage = item.getDosage();
        this.frequency = item.getFrequency();
        this.duration = item.getDuration();
        this.instructions = item.getInstructions();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getMedicineName() { return medicineName; }
    public void setMedicineName(String medicineName) { this.medicineName = medicineName; }

    public String getDosage() { return dosage; }
    public void setDosage(String dosage) { this.dosage = dosage; }

    public String getFrequency() { return frequency; }
    public void setFrequency(String frequency) { this.frequency = frequency; }

    public String getDuration() { return duration; }
    public void setDuration(String duration) { this.duration = duration; }

    public String getInstructions() { return instructions; }
    public void setInstructions(String instructions) { this.instructions = instructions; }
}
