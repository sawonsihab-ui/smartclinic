package com.smartclinic.service;

import com.smartclinic.dto.CreatePrescriptionRequest;
import com.smartclinic.dto.PrescriptionDto;
import com.smartclinic.dto.PrescriptionItemDto;
import com.smartclinic.entity.*;
import com.smartclinic.exception.ResourceNotFoundException;
import com.smartclinic.repository.AppointmentRepository;
import com.smartclinic.repository.DoctorRepository;
import com.smartclinic.repository.PatientRepository;
import com.smartclinic.repository.PrescriptionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class PrescriptionService {

    private final PrescriptionRepository prescriptionRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;
    private final AppointmentRepository appointmentRepository;
    private final NotificationService notificationService;

    public PrescriptionService(PrescriptionRepository prescriptionRepository,
                               PatientRepository patientRepository,
                               DoctorRepository doctorRepository,
                               AppointmentRepository appointmentRepository,
                               NotificationService notificationService) {
        this.prescriptionRepository = prescriptionRepository;
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
        this.appointmentRepository = appointmentRepository;
        this.notificationService = notificationService;
    }

    @Transactional
    public PrescriptionDto createPrescription(CreatePrescriptionRequest request, Long authUserId) {
        Patient patient = patientRepository.findById(request.getPatientId())
                .orElseThrow(() -> new ResourceNotFoundException("Patient not found with id: " + request.getPatientId()));

        Doctor doctor;
        if (request.getDoctorId() != null) {
            doctor = doctorRepository.findById(request.getDoctorId())
                    .orElseThrow(() -> new ResourceNotFoundException("Doctor not found with id: " + request.getDoctorId()));
        } else {
            doctor = doctorRepository.findByUserId(authUserId)
                    .orElseThrow(() -> new ResourceNotFoundException("Doctor not found for user id: " + authUserId));
        }

        Appointment appointment = null;
        if (request.getAppointmentId() != null) {
            appointment = appointmentRepository.findById(request.getAppointmentId()).orElse(null);
        }

        Prescription prescription = new Prescription(patient, doctor, appointment, LocalDate.now(), request.getNotes());

        if (request.getItems() != null) {
            for (PrescriptionItemDto itemDto : request.getItems()) {
                PrescriptionItem item = new PrescriptionItem(
                        itemDto.getMedicineName(),
                        itemDto.getDosage(),
                        itemDto.getFrequency(),
                        itemDto.getDuration(),
                        itemDto.getInstructions()
                );
                prescription.addItem(item);
            }
        }

        Prescription saved = prescriptionRepository.save(prescription);

        if (patient.getUser() != null) {
            notificationService.createNotification(patient.getUser(), "New Prescription Created",
                    "A new prescription has been issued by Dr. " + (doctor.getUser() != null ? doctor.getUser().getName() : ""));
        }

        return new PrescriptionDto(saved);
    }

    public List<PrescriptionDto> getPrescriptionsByPatient(Long patientId) {
        return prescriptionRepository.findByPatientIdOrderByPrescriptionDateDesc(patientId).stream()
                .map(PrescriptionDto::new).toList();
    }

    public PrescriptionDto getPrescriptionById(Long id) {
        Prescription prescription = prescriptionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Prescription not found with id: " + id));
        return new PrescriptionDto(prescription);
    }
}
