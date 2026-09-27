package com.smartclinic.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class PatientVolumePredictRequest {

    @NotNull(message = "Day of week is required")
    @Min(0) @Max(6)
    private Integer day_of_week;

    @NotNull(message = "Month is required")
    @Min(1) @Max(12)
    private Integer month;

    @NotNull(message = "Hour is required")
    @Min(0) @Max(23)
    private Integer hour;

    public PatientVolumePredictRequest() {}

    public PatientVolumePredictRequest(Integer day_of_week, Integer month, Integer hour) {
        this.day_of_week = day_of_week;
        this.month = month;
        this.hour = hour;
    }

    public Integer getDay_of_week() { return day_of_week; }
    public void setDay_of_week(Integer day_of_week) { this.day_of_week = day_of_week; }

    public Integer getMonth() { return month; }
    public void setMonth(Integer month) { this.month = month; }

    public Integer getHour() { return hour; }
    public void setHour(Integer hour) { this.hour = hour; }
}
