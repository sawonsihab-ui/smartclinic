package com.smartclinic.dto;

import com.smartclinic.entity.Patient;
import java.time.LocalDate;

public class PatientDto {
    private Long id;
    private Long userId;
    private String name;
    private String email;
    private String phone;
    private LocalDate dateOfBirth;
    private String gender;
    private String bloodGroup;
    private String address;
    private String emergencyContact;

    public PatientDto() {}

    public PatientDto(Patient patient) {
        this.id = patient.getId();
        if (patient.getUser() != null) {
            this.userId = patient.getUser().getId();
            this.name = patient.getUser().getName();
            this.email = patient.getUser().getEmail();
            this.phone = patient.getUser().getPhone();
        }
        this.dateOfBirth = patient.getDateOfBirth();
        this.gender = patient.getGender();
        this.bloodGroup = patient.getBloodGroup();
        this.address = patient.getAddress();
        this.emergencyContact = patient.getEmergencyContact();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public LocalDate getDateOfBirth() { return dateOfBirth; }
    public void setDateOfBirth(LocalDate dateOfBirth) { this.dateOfBirth = dateOfBirth; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public String getBloodGroup() { return bloodGroup; }
    public void setBloodGroup(String bloodGroup) { this.bloodGroup = bloodGroup; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getEmergencyContact() { return emergencyContact; }
    public void setEmergencyContact(String emergencyContact) { this.emergencyContact = emergencyContact; }
}
