package com.smartclinic.service;

import com.smartclinic.dto.JwtAuthResponse;
import com.smartclinic.dto.LoginRequest;
import com.smartclinic.dto.RegisterRequest;
import com.smartclinic.entity.*;
import com.smartclinic.repository.*;
import com.smartclinic.security.JwtTokenProvider;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;
    private final DepartmentRepository departmentRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;
    private final AuthenticationManager authenticationManager;

    public AuthService(UserRepository userRepository,
                       PatientRepository patientRepository,
                       DoctorRepository doctorRepository,
                       DepartmentRepository departmentRepository,
                       PasswordEncoder passwordEncoder,
                       JwtTokenProvider tokenProvider,
                       AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
        this.departmentRepository = departmentRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
        this.authenticationManager = authenticationManager;
    }

    @Transactional
    public JwtAuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email is already registered!");
        }

        User user = new User(
                request.getName(),
                request.getEmail(),
                passwordEncoder.encode(request.getPassword()),
                request.getRole(),
                request.getPhone()
        );

        User savedUser = userRepository.save(user);

        if (request.getRole() == Role.PATIENT) {
            LocalDate dob = request.getDateOfBirth() != null ? LocalDate.parse(request.getDateOfBirth()) : null;
            Patient patient = new Patient(
                    savedUser,
                    dob,
                    request.getGender(),
                    request.getBloodGroup(),
                    request.getAddress(),
                    request.getEmergencyContact()
            );
            patientRepository.save(patient);
        } else if (request.getRole() == Role.DOCTOR) {
            Department dept = null;
            if (request.getDepartmentId() != null) {
                dept = departmentRepository.findById(request.getDepartmentId()).orElse(null);
            }
            Doctor doctor = new Doctor(
                    savedUser,
                    request.getSpecialization() != null ? request.getSpecialization() : "General Physician",
                    dept,
                    request.getLicenseNumber() != null ? request.getLicenseNumber() : "LIC-" + System.currentTimeMillis(),
                    new BigDecimal("50.00")
            );
            doctorRepository.save(doctor);
        }

        String token = tokenProvider.generateToken(savedUser.getEmail(), savedUser.getRole().name(), savedUser.getId());
        return new JwtAuthResponse(token, savedUser.getId(), savedUser.getName(), savedUser.getEmail(), savedUser.getRole().name());
    }

    public JwtAuthResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        String token = tokenProvider.generateToken(user.getEmail(), user.getRole().name(), user.getId());
        return new JwtAuthResponse(token, user.getId(), user.getName(), user.getEmail(), user.getRole().name());
    }
}
