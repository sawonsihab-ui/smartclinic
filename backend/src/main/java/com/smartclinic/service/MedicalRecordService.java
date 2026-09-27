package com.smartclinic.service;

import com.smartclinic.dto.CreateMedicalRecordRequest;
import com.smartclinic.dto.MedicalRecordDto;
import com.smartclinic.entity.Appointment;
import com.smartclinic.entity.Doctor;
import com.smartclinic.entity.MedicalRecord;
import com.smartclinic.entity.Patient;
import com.smartclinic.exception.ResourceNotFoundException;
import com.smartclinic.repository.AppointmentRepository;
import com.smartclinic.repository.DoctorRepository;
import com.smartclinic.repository.MedicalRecordRepository;
import com.smartclinic.repository.PatientRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class MedicalRecordService {

    private final MedicalRecordRepository recordRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;
    private final AppointmentRepository appointmentRepository;
    private final NotificationService notificationService;

    public MedicalRecordService(MedicalRecordRepository recordRepository,
                                PatientRepository patientRepository,
                                DoctorRepository doctorRepository,
                                AppointmentRepository appointmentRepository,
                                NotificationService notificationService) {
        this.recordRepository = recordRepository;
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
        this.appointmentRepository = appointmentRepository;
        this.notificationService = notificationService;
    }

    @Transactional
    public MedicalRecordDto createRecord(CreateMedicalRecordRequest request, Long authUserId) {
        Patient patient = patientRepository.findById(request.getPatientId())
                .orElseThrow(() -> new ResourceNotFoundException("Patient not found with id: " + request.getPatientId()));

        Doctor doctor;
        if (request.getDoctorId() != null) {
            doctor = doctorRepository.findById(request.getDoctorId())
                    .orElseThrow(() -> new ResourceNotFoundException("Doctor not found with id: " + request.getDoctorId()));
        } else {
            doctor = doctorRepository.findByUserId(authUserId)
                    .orElseThrow(() -> new ResourceNotFoundException("Doctor not found for current user: " + authUserId));
        }

        Appointment appointment = null;
        if (request.getAppointmentId() != null) {
            appointment = appointmentRepository.findById(request.getAppointmentId()).orElse(null);
        }

        MedicalRecord record = new MedicalRecord(
                patient, doctor, appointment,
                request.getSymptoms(), request.getDiagnosis(), request.getNotes(), request.getTreatmentPlan()
        );

        MedicalRecord saved = recordRepository.save(record);

        if (patient.getUser() != null) {
            notificationService.createNotification(patient.getUser(), "Medical Record Added",
                    "A new medical consultation record has been added to your profile.");
        }

        return new MedicalRecordDto(saved);
    }

    public List<MedicalRecordDto> getRecordsByPatient(Long patientId) {
        return recordRepository.findByPatientIdOrderByCreatedAtDesc(patientId).stream()
                .map(MedicalRecordDto::new).toList();
    }

    public MedicalRecordDto getRecordById(Long id) {
        MedicalRecord record = recordRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Medical record not found with id: " + id));
        return new MedicalRecordDto(record);
    }
}
