package com.smartclinic.service;

import com.smartclinic.dto.PatientDto;
import com.smartclinic.dto.PatientProfileRequest;
import com.smartclinic.entity.Patient;
import com.smartclinic.exception.ResourceNotFoundException;
import com.smartclinic.repository.PatientRepository;
import com.smartclinic.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class PatientService {

    private final PatientRepository patientRepository;
    private final UserRepository userRepository;

    public PatientService(PatientRepository patientRepository, UserRepository userRepository) {
        this.patientRepository = patientRepository;
        this.userRepository = userRepository;
    }

    public List<PatientDto> getAllPatients() {
        return patientRepository.findAll().stream().map(PatientDto::new).toList();
    }

    public PatientDto getPatientById(Long id) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Patient not found with id: " + id));
        return new PatientDto(patient);
    }

    public PatientDto getPatientByUserId(Long userId) {
        Patient patient = patientRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Patient not found for user id: " + userId));
        return new PatientDto(patient);
    }

    @Transactional
    public PatientDto updatePatientProfile(Long id, PatientProfileRequest request) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Patient not found with id: " + id));

        if (patient.getUser() != null) {
            if (request.getName() != null && !request.getName().isBlank()) {
                patient.getUser().setName(request.getName());
            }
            if (request.getPhone() != null) {
                patient.getUser().setPhone(request.getPhone());
            }
            userRepository.save(patient.getUser());
        }

        if (request.getDateOfBirth() != null && !request.getDateOfBirth().isBlank()) {
            patient.setDateOfBirth(LocalDate.parse(request.getDateOfBirth()));
        }
        if (request.getGender() != null) patient.setGender(request.getGender());
        if (request.getBloodGroup() != null) patient.setBloodGroup(request.getBloodGroup());
        if (request.getAddress() != null) patient.setAddress(request.getAddress());
        if (request.getEmergencyContact() != null) patient.setEmergencyContact(request.getEmergencyContact());

        Patient saved = patientRepository.save(patient);
        return new PatientDto(saved);
    }
}
