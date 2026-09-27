package com.smartclinic.dto;

import com.smartclinic.entity.DoctorSchedule;
import java.time.LocalTime;

public class DoctorScheduleDto {
    private Long id;
    private Long doctorId;
    private String day;
    private LocalTime startTime;
    private LocalTime endTime;

    public DoctorScheduleDto() {}

    public DoctorScheduleDto(DoctorSchedule schedule) {
        this.id = schedule.getId();
        if (schedule.getDoctor() != null) {
            this.doctorId = schedule.getDoctor().getId();
        }
        this.day = schedule.getDay();
        this.startTime = schedule.getStartTime();
        this.endTime = schedule.getEndTime();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getDoctorId() { return doctorId; }
    public void setDoctorId(Long doctorId) { this.doctorId = doctorId; }

    public String getDay() { return day; }
    public void setDay(String day) { this.day = day; }

    public LocalTime getStartTime() { return startTime; }
    public void setStartTime(LocalTime startTime) { this.startTime = startTime; }

    public LocalTime getEndTime() { return endTime; }
    public void setEndTime(LocalTime endTime) { this.endTime = endTime; }
}
