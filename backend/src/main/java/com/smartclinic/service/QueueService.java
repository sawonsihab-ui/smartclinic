package com.smartclinic.service;

import com.smartclinic.dto.CheckInRequest;
import com.smartclinic.dto.QueueEntryDto;
import com.smartclinic.entity.Appointment;
import com.smartclinic.entity.QueueEntry;
import com.smartclinic.exception.ResourceNotFoundException;
import com.smartclinic.repository.AppointmentRepository;
import com.smartclinic.repository.PatientRepository;
import com.smartclinic.repository.QueueEntryRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class QueueService {

    private final QueueEntryRepository queueEntryRepository;
    private final AppointmentRepository appointmentRepository;
    private final PatientRepository patientRepository;
    private final NotificationService notificationService;

    public QueueService(QueueEntryRepository queueEntryRepository,
                        AppointmentRepository appointmentRepository,
                        PatientRepository patientRepository,
                        NotificationService notificationService) {
        this.queueEntryRepository = queueEntryRepository;
        this.appointmentRepository = appointmentRepository;
        this.patientRepository = patientRepository;
        this.notificationService = notificationService;
    }

    @Transactional
    public QueueEntryDto checkInPatient(CheckInRequest request) {
        Appointment appointment = appointmentRepository.findById(request.getAppointmentId())
                .orElseThrow(() -> new ResourceNotFoundException("Appointment not found with id: " + request.getAppointmentId()));

        appointment.setStatus("CHECKED_IN");
        appointmentRepository.save(appointment);

        // Generate next queue number for doctor today (starts at 101)
        java.time.LocalDateTime startOfDay = LocalDate.now().atStartOfDay();
        java.time.LocalDateTime endOfDay = LocalDate.now().atTime(23, 59, 59);
        Integer maxNum = queueEntryRepository.findMaxQueueNumberForDoctorAndDateRange(
                appointment.getDoctor().getId(), startOfDay, endOfDay
        );
        int nextQueueNumber = (maxNum == null || maxNum < 100) ? 101 : maxNum + 1;

        QueueEntry entry = new QueueEntry(
                appointment,
                appointment.getPatient(),
                appointment.getDoctor(),
                nextQueueNumber,
                request.getPriority() != null ? request.getPriority() : "NORMAL",
                "WAITING"
        );

        QueueEntry saved = queueEntryRepository.save(entry);

        if (appointment.getPatient() != null && appointment.getPatient().getUser() != null) {
            notificationService.createNotification(appointment.getPatient().getUser(), "Checked In",
                    "You are checked in! Your Queue Ticket Number is #" + nextQueueNumber + ".");
        }

        return new QueueEntryDto(saved);
    }

    public List<QueueEntryDto> getDoctorQueue(Long doctorId) {
        return queueEntryRepository.findActiveQueueForDoctor(doctorId).stream()
                .map(QueueEntryDto::new).toList();
    }

    @Transactional
    public QueueEntryDto updateQueueStatus(Long queueId, String status) {
        QueueEntry entry = queueEntryRepository.findById(queueId)
                .orElseThrow(() -> new ResourceNotFoundException("Queue entry not found with id: " + queueId));

        entry.setStatus(status);
        if ("COMPLETED".equals(status) && entry.getAppointment() != null) {
            entry.getAppointment().setStatus("COMPLETED");
            appointmentRepository.save(entry.getAppointment());
        }

        QueueEntry saved = queueEntryRepository.save(entry);
        return new QueueEntryDto(saved);
    }

    public List<QueueEntryDto> getPatientQueueEntries(Long patientId) {
        return queueEntryRepository.findByPatientId(patientId).stream()
                .map(QueueEntryDto::new).toList();
    }

    /**
     * Used by patient-facing endpoint: resolves the Patient entity from the logged-in User's ID
     * then fetches that patient's queue entries.
     */
    public List<QueueEntryDto> getQueueEntriesForCurrentUser(Long userId) {
        var patient = patientRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Patient account not found for user: " + userId));
        return queueEntryRepository.findByPatientId(patient.getId()).stream()
                .map(QueueEntryDto::new).toList();
    }
}
