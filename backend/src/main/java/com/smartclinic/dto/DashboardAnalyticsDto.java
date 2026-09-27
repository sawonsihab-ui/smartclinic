package com.smartclinic.dto;

import java.util.List;
import java.util.Map;

public class DashboardAnalyticsDto {
    private long totalPatients;
    private long totalDoctors;
    private long todayAppointments;
    private long completedAppointments;
    private long cancelledAppointments;
    private double averageWaitingTimeMinutes;
    private double doctorUtilizationPercentage;

    private List<Map<String, Object>> appointmentsByDepartment;
    private List<Map<String, Object>> monthlyAppointmentsTrend;
    private List<Map<String, Object>> appointmentStatusBreakdown;

    public DashboardAnalyticsDto() {}

    public long getTotalPatients() { return totalPatients; }
    public void setTotalPatients(long totalPatients) { this.totalPatients = totalPatients; }

    public long getTotalDoctors() { return totalDoctors; }
    public void setTotalDoctors(long totalDoctors) { this.totalDoctors = totalDoctors; }

    public long getTodayAppointments() { return todayAppointments; }
    public void setTodayAppointments(long todayAppointments) { this.todayAppointments = todayAppointments; }

    public long getCompletedAppointments() { return completedAppointments; }
    public void setCompletedAppointments(long completedAppointments) { this.completedAppointments = completedAppointments; }

    public long getCancelledAppointments() { return cancelledAppointments; }
    public void setCancelledAppointments(long cancelledAppointments) { this.cancelledAppointments = cancelledAppointments; }

    public double getAverageWaitingTimeMinutes() { return averageWaitingTimeMinutes; }
    public void setAverageWaitingTimeMinutes(double averageWaitingTimeMinutes) { this.averageWaitingTimeMinutes = averageWaitingTimeMinutes; }

    public double getDoctorUtilizationPercentage() { return doctorUtilizationPercentage; }
    public void setDoctorUtilizationPercentage(double doctorUtilizationPercentage) { this.doctorUtilizationPercentage = doctorUtilizationPercentage; }

    public List<Map<String, Object>> getAppointmentsByDepartment() { return appointmentsByDepartment; }
    public void setAppointmentsByDepartment(List<Map<String, Object>> appointmentsByDepartment) { this.appointmentsByDepartment = appointmentsByDepartment; }

    public List<Map<String, Object>> getMonthlyAppointmentsTrend() { return monthlyAppointmentsTrend; }
    public void setMonthlyAppointmentsTrend(List<Map<String, Object>> monthlyAppointmentsTrend) { this.monthlyAppointmentsTrend = monthlyAppointmentsTrend; }

    public List<Map<String, Object>> getAppointmentStatusBreakdown() { return appointmentStatusBreakdown; }
    public void setAppointmentStatusBreakdown(List<Map<String, Object>> appointmentStatusBreakdown) { this.appointmentStatusBreakdown = appointmentStatusBreakdown; }
}
