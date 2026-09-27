package com.smartclinic;

import com.smartclinic.dto.BookAppointmentRequest;
import com.smartclinic.exception.AppointmentConflictException;
import com.smartclinic.repository.AppointmentRepository;
import com.smartclinic.service.AppointmentService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.atomic.AtomicInteger;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class AppointmentDoubleBookingTest {

    @Autowired
    private AppointmentService appointmentService;

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Test
    public void testConcurrentDoubleBookingPrevention() throws InterruptedException {
        Long doctorId = 1L; // Dr. Jenkins (General Medicine)
        // Choose next Monday to fit doctor's schedule
        LocalDate testDate = LocalDate.now().plusDays(7);
        while (testDate.getDayOfWeek().getValue() != 1) { // 1 = MONDAY
            testDate = testDate.plusDays(1);
        }
        LocalTime testTime = LocalTime.of(14, 0); // 14:00 PM

        BookAppointmentRequest req1 = new BookAppointmentRequest();
        req1.setPatientId(1L); // Patient John Doe
        req1.setDoctorId(doctorId);
        req1.setAppointmentDate(testDate);
        req1.setStartTime(testTime);
        req1.setReason("Concurrent test 1");

        BookAppointmentRequest req2 = new BookAppointmentRequest();
        req2.setPatientId(2L); // Patient Jane Smith
        req2.setDoctorId(doctorId);
        req2.setAppointmentDate(testDate);
        req2.setStartTime(testTime);
        req2.setReason("Concurrent test 2");

        ExecutorService executor = Executors.newFixedThreadPool(2);
        CountDownLatch latch = new CountDownLatch(1);
        AtomicInteger successCount = new AtomicInteger(0);
        AtomicInteger conflictCount = new AtomicInteger(0);

        executor.submit(() -> {
            try {
                latch.await();
                appointmentService.bookAppointment(req1, null);
                successCount.incrementAndGet();
            } catch (AppointmentConflictException e) {
                conflictCount.incrementAndGet();
            } catch (Exception e) {
                e.printStackTrace();
            }
        });

        executor.submit(() -> {
            try {
                latch.await();
                appointmentService.bookAppointment(req2, null);
                successCount.incrementAndGet();
            } catch (AppointmentConflictException e) {
                conflictCount.incrementAndGet();
            } catch (Exception e) {
                e.printStackTrace();
            }
        });

        // Trigger simultaneous execution
        latch.countDown();
        executor.shutdown();
        executor.awaitTermination(5, java.util.concurrent.TimeUnit.SECONDS);

        // Assert exactly one request succeeded and the other failed safely with AppointmentConflictException!
        assertEquals(1, successCount.get(), "Exactly one booking request should succeed");
        assertEquals(1, conflictCount.get(), "The concurrent booking attempt must fail safely with AppointmentConflictException");
    }
}
