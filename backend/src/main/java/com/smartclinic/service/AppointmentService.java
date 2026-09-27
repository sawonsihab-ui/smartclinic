package com.smartclinic.service;

import com.smartclinic.dto.AppointmentDto;
import com.smartclinic.dto.BookAppointmentRequest;
import com.smartclinic.dto.RescheduleAppointmentRequest;
import com.smartclinic.entity.*;
import com.smartclinic.exception.AppointmentConflictException;
import com.smartclinic.exception.ResourceNotFoundException;
import com.smartclinic.repository.*;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;
    private final DoctorScheduleRepository scheduleRepository;
    private final NotificationService notificationService;

    public AppointmentService(AppointmentRepository appointmentRepository,
                              PatientRepository patientRepository,
                              DoctorRepository doctorRepository,
                              DoctorScheduleRepository scheduleRepository,
                              NotificationService notificationService) {
        this.appointmentRepository = appointmentRepository;
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
        this.scheduleRepository = scheduleRepository;
        this.notificationService = notificationService;
    }

    @Transactional
    public AppointmentDto bookAppointment(BookAppointmentRequest request, Long authUserId) {
        Patient patient;
        if (request.getPatientId() != null) {
            patient = patientRepository.findById(request.getPatientId())
                    .orElseThrow(() -> new ResourceNotFoundException("Patient not found with id: " + request.getPatientId()));
        } else if (authUserId != null) {
            patient = patientRepository.findByUserId(authUserId)
                    .orElseThrow(() -> new ResourceNotFoundException("Patient account not found for user: " + authUserId));
        } else {
            throw new IllegalArgumentException("Patient information is required");
        }

        Doctor doctor = doctorRepository.findById(request.getDoctorId())
                .orElseThrow(() -> new ResourceNotFoundException("Doctor not found with id: " + request.getDoctorId()));

        if (request.getAppointmentDate().isBefore(LocalDate.now())) {
            throw new IllegalArgumentException("Cannot book appointments in the past");
        }

        // 1. Backend Validation: Verify doctor works on this day of week
        String dayOfWeek = request.getAppointmentDate().getDayOfWeek().name();
        DoctorSchedule schedule = scheduleRepository.findByDoctorIdAndDay(doctor.getId(), dayOfWeek)
                .orElseThrow(() -> new IllegalArgumentException("Doctor does not have office hours on " + dayOfWeek));

        LocalTime startTime = request.getStartTime();
        LocalTime endTime = startTime.plusMinutes(30);

        if (startTime.isBefore(schedule.getStartTime()) || endTime.isAfter(schedule.getEndTime())) {
            throw new IllegalArgumentException("Appointment time is outside doctor schedule (" + schedule.getStartTime() + " - " + schedule.getEndTime() + ")");
        }

        // 2. Backend Validation: Check if slot is already taken
        boolean slotTaken = appointmentRepository.existsByDoctorIdAndAppointmentDateAndStartTimeAndStatusNot(
                doctor.getId(), request.getAppointmentDate(), startTime, "CANCELLED"
        );
        if (slotTaken) {
            throw new AppointmentConflictException("Sorry, this appointment slot is no longer available.");
        }

        Appointment appointment = new Appointment(
                patient, doctor, request.getAppointmentDate(), startTime, endTime, "BOOKED", request.getReason()
        );

        // 3. Database Constraint Protection: Catch concurrent race conditions on UK constraint
        try {
            Appointment saved = appointmentRepository.saveAndFlush(appointment);

            // Internal Notifications
            String patientMsg = String.format("Your appointment with Dr. %s is booked for %s at %s.",
                    doctor.getUser() != null ? doctor.getUser().getName() : "",
                    saved.getAppointmentDate(), saved.getStartTime());
            notificationService.createNotification(patient.getUser(), "Appointment Booked", patientMsg);

            if (doctor.getUser() != null) {
                String doctorMsg = String.format("New appointment booked by %s for %s at %s.",
                        patient.getUser() != null ? patient.getUser().getName() : "Patient",
                        saved.getAppointmentDate(), saved.getStartTime());
                notificationService.createNotification(doctor.getUser(), "New Appointment", doctorMsg);
            }

            return new AppointmentDto(saved);
        } catch (DataIntegrityViolationException ex) {
            throw new AppointmentConflictException("Sorry, this appointment slot is no longer available.");
        }
    }

    @Transactional
    public AppointmentDto cancelAppointment(Long appointmentId) {
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Appointment not found with id: " + appointmentId));

        appointment.setStatus("CANCELLED");
        Appointment saved = appointmentRepository.save(appointment);

        if (saved.getPatient() != null && saved.getPatient().getUser() != null) {
            notificationService.createNotification(saved.getPatient().getUser(), "Appointment Cancelled",
                    "Your appointment for " + saved.getAppointmentDate() + " at " + saved.getStartTime() + " has been cancelled.");
        }

        return new AppointmentDto(saved);
    }

    @Transactional
    public AppointmentDto rescheduleAppointment(Long appointmentId, RescheduleAppointmentRequest request) {
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Appointment not found with id: " + appointmentId));

        if (request.getAppointmentDate().isBefore(LocalDate.now())) {
            throw new IllegalArgumentException("Cannot reschedule to a past date");
        }

        boolean slotTaken = appointmentRepository.existsByDoctorIdAndAppointmentDateAndStartTimeAndStatusNot(
                appointment.getDoctor().getId(), request.getAppointmentDate(), request.getStartTime(), "CANCELLED"
        );
        if (slotTaken) {
            throw new AppointmentConflictException("Sorry, this appointment slot is no longer available.");
        }

        appointment.setAppointmentDate(request.getAppointmentDate());
        appointment.setStartTime(request.getStartTime());
        appointment.setEndTime(request.getStartTime().plusMinutes(30));
        appointment.setStatus("BOOKED");

        try {
            Appointment saved = appointmentRepository.saveAndFlush(appointment);
            if (saved.getPatient() != null && saved.getPatient().getUser() != null) {
                notificationService.createNotification(saved.getPatient().getUser(), "Appointment Rescheduled",
                        "Your appointment is now scheduled for " + saved.getAppointmentDate() + " at " + saved.getStartTime() + ".");
            }
            return new AppointmentDto(saved);
        } catch (DataIntegrityViolationException ex) {
            throw new AppointmentConflictException("Sorry, this appointment slot is no longer available.");
        }
    }

    public List<AppointmentDto> getAllAppointments() {
        return appointmentRepository.findAll().stream().map(AppointmentDto::new).toList();
    }

    public AppointmentDto getAppointmentById(Long id) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Appointment not found with id: " + id));
        return new AppointmentDto(appointment);
    }

    public List<AppointmentDto> getAppointmentsForPatient(Long patientId) {
        return appointmentRepository.findByPatientId(patientId).stream().map(AppointmentDto::new).toList();
    }

    /**
     * Used by patient-facing endpoint: resolves the Patient entity from the logged-in User's ID
     * then fetches that patient's appointments.
     */
    public List<AppointmentDto> getAppointmentsForCurrentUser(Long userId) {
        Patient patient = patientRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Patient account not found for user: " + userId));
        return appointmentRepository.findByPatientId(patient.getId()).stream().map(AppointmentDto::new).toList();
    }

    public List<AppointmentDto> getAppointmentsForDoctor(Long doctorId) {
        return appointmentRepository.findByDoctorId(doctorId).stream().map(AppointmentDto::new).toList();
    }
}
