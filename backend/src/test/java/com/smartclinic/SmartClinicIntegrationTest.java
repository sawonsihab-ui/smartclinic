package com.smartclinic;

import com.smartclinic.dto.*;
import com.smartclinic.service.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
public class SmartClinicIntegrationTest {

    @Autowired
    private QueueService queueService;

    @Autowired
    private MedicalRecordService medicalRecordService;

    @Autowired
    private PrescriptionService prescriptionService;

    @Autowired
    private VitalsService vitalsService;

    @Autowired
    private StaffTaskService staffTaskService;

    @Test
    public void testCheckInAndQueuePriority() {
        CheckInRequest checkInReq = new CheckInRequest();
        checkInReq.setAppointmentId(4L);
        checkInReq.setPriority("EMERGENCY");

        QueueEntryDto queueEntry = queueService.checkInPatient(checkInReq);
        assertNotNull(queueEntry);
        assertEquals("EMERGENCY", queueEntry.getPriority());
        assertEquals("WAITING", queueEntry.getStatus());
        assertTrue(queueEntry.getQueueNumber() >= 101);

        List<QueueEntryDto> queueList = queueService.getDoctorQueue(3L);
        assertFalse(queueList.isEmpty());
        // Verify EMERGENCY priority is listed first
        assertEquals("EMERGENCY", queueList.get(0).getPriority());
    }

    @Test
    public void testMedicalRecordAndPrescriptionCreation() {
        // Medical Record Creation
        CreateMedicalRecordRequest recordReq = new CreateMedicalRecordRequest();
        recordReq.setPatientId(1L);
        recordReq.setDoctorId(1L);
        recordReq.setSymptoms("Mild seasonal allergies");
        recordReq.setDiagnosis("Allergic Rhinitis");
        recordReq.setTreatmentPlan("Rest, hydration, antihistamines");

        MedicalRecordDto recordDto = medicalRecordService.createRecord(recordReq, 2L);
        assertNotNull(recordDto.getId());
        assertEquals("Allergic Rhinitis", recordDto.getDiagnosis());

        // Prescription Creation
        CreatePrescriptionRequest rxReq = new CreatePrescriptionRequest();
        rxReq.setPatientId(1L);
        rxReq.setDoctorId(1L);
        rxReq.setNotes("Take with glass of water");
        
        PrescriptionItemDto item = new PrescriptionItemDto();
        item.setMedicineName("Cetirizine 10mg");
        item.setDosage("1 tablet");
        item.setFrequency("Once daily");
        item.setDuration("7 days");
        item.setInstructions("Take at bedtime");
        rxReq.setItems(List.of(item));

        PrescriptionDto rxDto = prescriptionService.createPrescription(rxReq, 2L);
        assertNotNull(rxDto.getId());
        assertEquals(1, rxDto.getItems().size());
        assertEquals("Cetirizine 10mg", rxDto.getItems().get(0).getMedicineName());
    }

    @Test
    public void testVitalsAndStaffTaskModule() {
        // Record Vitals
        RecordVitalsRequest vitalsReq = new RecordVitalsRequest();
        vitalsReq.setPatientId(1L);
        vitalsReq.setTemperature(36.6);
        vitalsReq.setBloodPressure("120/80");
        vitalsReq.setHeartRate(72);
        vitalsReq.setWeight(70.0);
        vitalsReq.setHeight(175.0);

        VitalsDto vitalsDto = vitalsService.recordVitals(vitalsReq, 5L);
        assertNotNull(vitalsDto.getId());
        assertEquals(36.6, vitalsDto.getTemperature());

        // Staff Task Creation & Update
        CreateStaffTaskRequest taskReq = new CreateStaffTaskRequest();
        taskReq.setTitle("Sanitize Consultation Room 1");
        taskReq.setDescription("Prepare room for afternoon appointments");
        taskReq.setPriority("HIGH");
        taskReq.setDueDate(LocalDate.now());

        StaffTaskDto taskDto = staffTaskService.createTask(taskReq, 1L);
        assertNotNull(taskDto.getId());
        assertEquals("TODO", taskDto.getStatus());

        StaffTaskDto updatedTask = staffTaskService.updateTaskStatus(taskDto.getId(), "COMPLETED");
        assertEquals("COMPLETED", updatedTask.getStatus());
    }
}
