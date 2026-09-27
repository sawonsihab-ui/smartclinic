package com.smartclinic.service;

import com.smartclinic.dto.DoctorAvailabilityResponse;
import com.smartclinic.dto.DoctorDto;
import com.smartclinic.dto.DoctorScheduleDto;
import com.smartclinic.entity.Appointment;
import com.smartclinic.entity.Doctor;
import com.smartclinic.entity.DoctorSchedule;
import com.smartclinic.exception.ResourceNotFoundException;
import com.smartclinic.repository.AppointmentRepository;
import com.smartclinic.repository.DoctorRepository;
import com.smartclinic.repository.DoctorScheduleRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class DoctorService {

    private final DoctorRepository doctorRepository;
    private final DoctorScheduleRepository scheduleRepository;
    private final AppointmentRepository appointmentRepository;

    public DoctorService(DoctorRepository doctorRepository,
                         DoctorScheduleRepository scheduleRepository,
                         AppointmentRepository appointmentRepository) {
        this.doctorRepository = doctorRepository;
        this.scheduleRepository = scheduleRepository;
        this.appointmentRepository = appointmentRepository;
    }

    public List<DoctorDto> getAllDoctors() {
        return doctorRepository.findAll().stream().map(DoctorDto::new).toList();
    }

    public DoctorDto getDoctorById(Long id) {
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor not found with id: " + id));
        return new DoctorDto(doctor);
    }

    public DoctorDto getDoctorByUserId(Long userId) {
        Doctor doctor = doctorRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor not found for user id: " + userId));
        return new DoctorDto(doctor);
    }

    public List<DoctorDto> getDoctorsByDepartment(Long departmentId) {
        return doctorRepository.findByDepartmentId(departmentId).stream().map(DoctorDto::new).toList();
    }

    public List<DoctorScheduleDto> getDoctorSchedules(Long doctorId) {
        return scheduleRepository.findByDoctorId(doctorId).stream().map(DoctorScheduleDto::new).toList();
    }

    public DoctorAvailabilityResponse getDoctorAvailability(Long doctorId, LocalDate date) {
        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor not found with id: " + doctorId));

        String dayOfWeek = date.getDayOfWeek().name();
        DoctorSchedule schedule = scheduleRepository.findByDoctorIdAndDay(doctorId, dayOfWeek).orElse(null);

        List<LocalTime> availableSlots = new ArrayList<>();
        if (schedule != null) {
            List<Appointment> existingAppointments = appointmentRepository.findByDoctorIdAndAppointmentDate(doctorId, date);
            Set<LocalTime> bookedTimes = existingAppointments.stream()
                    .filter(a -> !"CANCELLED".equals(a.getStatus()))
                    .map(Appointment::getStartTime)
                    .collect(Collectors.toSet());

            LocalTime current = schedule.getStartTime();
            while (current.plusMinutes(30).isBefore(schedule.getEndTime()) || current.plusMinutes(30).equals(schedule.getEndTime())) {
                if (!bookedTimes.contains(current)) {
                    availableSlots.add(current);
                }
                current = current.plusMinutes(30);
            }
        }

        String doctorName = doctor.getUser() != null ? doctor.getUser().getName() : "Doctor #" + doctor.getId();
        return new DoctorAvailabilityResponse(doctorId, doctorName, date, availableSlots);
    }
}
