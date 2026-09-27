package com.smartclinic.service;

import com.smartclinic.dto.RecordVitalsRequest;
import com.smartclinic.dto.VitalsDto;
import com.smartclinic.entity.Appointment;
import com.smartclinic.entity.Patient;
import com.smartclinic.entity.User;
import com.smartclinic.entity.Vitals;
import com.smartclinic.exception.ResourceNotFoundException;
import com.smartclinic.repository.AppointmentRepository;
import com.smartclinic.repository.PatientRepository;
import com.smartclinic.repository.UserRepository;
import com.smartclinic.repository.VitalsRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class VitalsService {

    private final VitalsRepository vitalsRepository;
    private final PatientRepository patientRepository;
    private final UserRepository userRepository;
    private final AppointmentRepository appointmentRepository;

    public VitalsService(VitalsRepository vitalsRepository,
                         PatientRepository patientRepository,
                         UserRepository userRepository,
                         AppointmentRepository appointmentRepository) {
        this.vitalsRepository = vitalsRepository;
        this.patientRepository = patientRepository;
        this.userRepository = userRepository;
        this.appointmentRepository = appointmentRepository;
    }

    @Transactional
    public VitalsDto recordVitals(RecordVitalsRequest request, Long nurseUserId) {
        Patient patient = patientRepository.findById(request.getPatientId())
                .orElseThrow(() -> new ResourceNotFoundException("Patient not found with id: " + request.getPatientId()));

        User nurse = null;
        if (nurseUserId != null) {
            nurse = userRepository.findById(nurseUserId).orElse(null);
        }

        Appointment appointment = null;
        if (request.getAppointmentId() != null) {
            appointment = appointmentRepository.findById(request.getAppointmentId()).orElse(null);
        }

        Vitals vitals = new Vitals(
                patient, nurse, appointment,
                request.getTemperature(), request.getBloodPressure(), request.getHeartRate(),
                request.getWeight(), request.getHeight()
        );

        Vitals saved = vitalsRepository.save(vitals);
        return new VitalsDto(saved);
    }

    public List<VitalsDto> getVitalsByPatient(Long patientId) {
        return vitalsRepository.findByPatientIdOrderByRecordedAtDesc(patientId).stream()
                .map(VitalsDto::new).toList();
    }

    public VitalsDto getVitalsByAppointment(Long appointmentId) {
        Vitals vitals = vitalsRepository.findByAppointmentId(appointmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Vitals not recorded for appointment id: " + appointmentId));
        return new VitalsDto(vitals);
    }
}
