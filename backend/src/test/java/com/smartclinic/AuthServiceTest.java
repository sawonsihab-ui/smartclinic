package com.smartclinic;

import com.smartclinic.dto.JwtAuthResponse;
import com.smartclinic.dto.LoginRequest;
import com.smartclinic.dto.RegisterRequest;
import com.smartclinic.entity.Role;
import com.smartclinic.service.AuthService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
public class AuthServiceTest {

    @Autowired
    private AuthService authService;

    @Test
    public void testUserRegistrationAndLogin() {
        String testEmail = "testpatient_" + System.currentTimeMillis() + "@clinic.com";

        RegisterRequest regReq = new RegisterRequest();
        regReq.setName("Test Patient");
        regReq.setEmail(testEmail);
        regReq.setPassword("password123");
        regReq.setRole(Role.PATIENT);
        regReq.setPhone("+1-555-9999");
        regReq.setDateOfBirth("1995-04-12");
        regReq.setGender("FEMALE");
        regReq.setBloodGroup("O+");

        JwtAuthResponse regResponse = authService.register(regReq);
        assertNotNull(regResponse);
        assertNotNull(regResponse.getToken());
        assertEquals(testEmail, regResponse.getEmail());
        assertEquals("PATIENT", regResponse.getRole());

        LoginRequest loginReq = new LoginRequest(testEmail, "password123");
        JwtAuthResponse loginResponse = authService.login(loginReq);
        assertNotNull(loginResponse);
        assertNotNull(loginResponse.getToken());
        assertEquals(testEmail, loginResponse.getEmail());
    }

    @Test
    public void testDuplicateRegistrationFails() {
        String testEmail = "duplicate_" + System.currentTimeMillis() + "@clinic.com";

        RegisterRequest regReq = new RegisterRequest();
        regReq.setName("Duplicate User");
        regReq.setEmail(testEmail);
        regReq.setPassword("password123");
        regReq.setRole(Role.PATIENT);

        authService.register(regReq);

        assertThrows(IllegalArgumentException.class, () -> authService.register(regReq));
    }
}
