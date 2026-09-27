package com.smartclinic.dto;

import com.smartclinic.entity.Doctor;
import java.math.BigDecimal;

public class DoctorDto {
    private Long id;
    private Long userId;
    private String name;
    private String email;
    private String phone;
    private String specialization;
    private Long departmentId;
    private String departmentName;
    private String licenseNumber;
    private BigDecimal consultationFee;

    public DoctorDto() {}

    public DoctorDto(Doctor doctor) {
        this.id = doctor.getId();
        if (doctor.getUser() != null) {
            this.userId = doctor.getUser().getId();
            this.name = doctor.getUser().getName();
            this.email = doctor.getUser().getEmail();
            this.phone = doctor.getUser().getPhone();
        }
        this.specialization = doctor.getSpecialization();
        if (doctor.getDepartment() != null) {
            this.departmentId = doctor.getDepartment().getId();
            this.departmentName = doctor.getDepartment().getName();
        }
        this.licenseNumber = doctor.getLicenseNumber();
        this.consultationFee = doctor.getConsultationFee();
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

    public String getSpecialization() { return specialization; }
    public void setSpecialization(String specialization) { this.specialization = specialization; }

    public Long getDepartmentId() { return departmentId; }
    public void setDepartmentId(Long departmentId) { this.departmentId = departmentId; }

    public String getDepartmentName() { return departmentName; }
    public void setDepartmentName(String departmentName) { this.departmentName = departmentName; }

    public String getLicenseNumber() { return licenseNumber; }
    public void setLicenseNumber(String licenseNumber) { this.licenseNumber = licenseNumber; }

    public BigDecimal getConsultationFee() { return consultationFee; }
    public void setConsultationFee(BigDecimal consultationFee) { this.consultationFee = consultationFee; }
}
