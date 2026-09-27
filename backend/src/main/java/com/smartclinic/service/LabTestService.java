package com.smartclinic.service;

import com.smartclinic.dto.CreateLabTestRequest;
import com.smartclinic.dto.LabTestDto;
import com.smartclinic.dto.SubmitLabResultRequest;
import com.smartclinic.entity.*;
import com.smartclinic.exception.ResourceNotFoundException;
import com.smartclinic.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class LabTestService {

    private final LabTestRepository labTestRepository;
    private final LabResultRepository labResultRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;
    private final AppointmentRepository appointmentRepository;
    private final NotificationService notificationService;

    public LabTestService(LabTestRepository labTestRepository,
                          LabResultRepository labResultRepository,
                          PatientRepository patientRepository,
                          DoctorRepository doctorRepository,
                          AppointmentRepository appointmentRepository,
                          NotificationService notificationService) {
        this.labTestRepository = labTestRepository;
        this.labResultRepository = labResultRepository;
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
        this.appointmentRepository = appointmentRepository;
        this.notificationService = notificationService;
    }

    @Transactional
    public LabTestDto requestLabTest(CreateLabTestRequest request, Long authUserId) {
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

        LabTest labTest = new LabTest(patient, doctor, appointment, request.getTestName(), "REQUESTED");
        LabTest saved = labTestRepository.save(labTest);

        if (patient.getUser() != null) {
            notificationService.createNotification(patient.getUser(), "Lab Test Requested",
                    "A laboratory test (" + request.getTestName() + ") has been ordered.");
        }

        return new LabTestDto(saved);
    }

    public List<LabTestDto> getAllLabTests() {
        return labTestRepository.findAll().stream().map(LabTestDto::new).toList();
    }

    public List<LabTestDto> getLabTestsByPatient(Long patientId) {
        return labTestRepository.findByPatientId(patientId).stream().map(LabTestDto::new).toList();
    }

    @Transactional
    public LabTestDto updateLabTestStatus(Long id, String status) {
        LabTest labTest = labTestRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lab test not found with id: " + id));

        labTest.setStatus(status);
        if ("COMPLETED".equals(status)) {
            labTest.setCompletedAt(LocalDateTime.now());
        }
        LabTest saved = labTestRepository.save(labTest);
        return new LabTestDto(saved);
    }

    @Transactional
    public LabTestDto submitLabResult(SubmitLabResultRequest request) {
        LabTest labTest = labTestRepository.findById(request.getLabTestId())
                .orElseThrow(() -> new ResourceNotFoundException("Lab test not found with id: " + request.getLabTestId()));

        LabResult result = new LabResult(labTest, request.getResult(), request.getRemarks());
        labTest.setResult(result);
        labTest.setStatus("COMPLETED");
        labTest.setCompletedAt(LocalDateTime.now());

        LabTest saved = labTestRepository.save(labTest);

        if (saved.getPatient() != null && saved.getPatient().getUser() != null) {
            notificationService.createNotification(saved.getPatient().getUser(), "Lab Results Available",
                    "Your lab results for " + saved.getTestName() + " are now available.");
        }

        return new LabTestDto(saved);
    }
}
