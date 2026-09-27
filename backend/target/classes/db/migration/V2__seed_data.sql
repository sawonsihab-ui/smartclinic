-- Flyway Migration V2: Seed Data for SmartClinic+
-- Default Password for all seeded users: "password123"
-- BCrypt Hash: $2a$10$8.UnVuG9HHgffUDAlk8qfOUVGkqRzgVym5p.bMymcOHn4.Wl4Jye2

-- 1. Departments
INSERT INTO departments (id, name, description) VALUES
(1, 'General Medicine', 'Primary healthcare, general physical exams, and routine treatments'),
(2, 'Cardiology', 'Specialized care for heart conditions, blood pressure, and cardiovascular health'),
(3, 'Pediatrics', 'Comprehensive healthcare services for infants, children, and adolescents');

-- Reset identity sequence for departments if needed
ALTER TABLE departments ALTER COLUMN id RESTART WITH 4;

-- 2. Users (1 Admin, 3 Doctors, 2 Nurses, 2 Staff, 10 Patients)
INSERT INTO users (id, name, email, password, role, phone, created_at) VALUES
-- Admin
(1, 'Admin User', 'admin@smartclinic.com', '$2a$10$8.UnVuG9HHgffUDAlk8qfOUVGkqRzgVym5p.bMymcOHn4.Wl4Jye2', 'ADMIN', '+1-555-0100', CURRENT_TIMESTAMP),

-- Doctors
(2, 'Dr. Sarah Jenkins', 'doctor.jenkins@smartclinic.com', '$2a$10$8.UnVuG9HHgffUDAlk8qfOUVGkqRzgVym5p.bMymcOHn4.Wl4Jye2', 'DOCTOR', '+1-555-0101', CURRENT_TIMESTAMP),
(3, 'Dr. Michael Chen', 'doctor.chen@smartclinic.com', '$2a$10$8.UnVuG9HHgffUDAlk8qfOUVGkqRzgVym5p.bMymcOHn4.Wl4Jye2', 'DOCTOR', '+1-555-0102', CURRENT_TIMESTAMP),
(4, 'Dr. Emily Rodriguez', 'doctor.rodriguez@smartclinic.com', '$2a$10$8.UnVuG9HHgffUDAlk8qfOUVGkqRzgVym5p.bMymcOHn4.Wl4Jye2', 'DOCTOR', '+1-555-0103', CURRENT_TIMESTAMP),

-- Nurses
(5, 'Nurse Nancy Adams', 'nurse.nancy@smartclinic.com', '$2a$10$8.UnVuG9HHgffUDAlk8qfOUVGkqRzgVym5p.bMymcOHn4.Wl4Jye2', 'NURSE', '+1-555-0104', CURRENT_TIMESTAMP),
(6, 'Nurse Robert Taylor', 'nurse.robert@smartclinic.com', '$2a$10$8.UnVuG9HHgffUDAlk8qfOUVGkqRzgVym5p.bMymcOHn4.Wl4Jye2', 'NURSE', '+1-555-0105', CURRENT_TIMESTAMP),

-- Staff
(7, 'Staff Sam Wilson', 'staff.sam@smartclinic.com', '$2a$10$8.UnVuG9HHgffUDAlk8qfOUVGkqRzgVym5p.bMymcOHn4.Wl4Jye2', 'STAFF', '+1-555-0106', CURRENT_TIMESTAMP),
(8, 'Staff Susan Miller', 'staff.susan@smartclinic.com', '$2a$10$8.UnVuG9HHgffUDAlk8qfOUVGkqRzgVym5p.bMymcOHn4.Wl4Jye2', 'STAFF', '+1-555-0107', CURRENT_TIMESTAMP),

-- 10 Patients
(9, 'John Doe', 'john.doe@patient.com', '$2a$10$8.UnVuG9HHgffUDAlk8qfOUVGkqRzgVym5p.bMymcOHn4.Wl4Jye2', 'PATIENT', '+1-555-0201', CURRENT_TIMESTAMP),
(10, 'Jane Smith', 'jane.smith@patient.com', '$2a$10$8.UnVuG9HHgffUDAlk8qfOUVGkqRzgVym5p.bMymcOHn4.Wl4Jye2', 'PATIENT', '+1-555-0202', CURRENT_TIMESTAMP),
(11, 'Alice Johnson', 'alice.j@patient.com', '$2a$10$8.UnVuG9HHgffUDAlk8qfOUVGkqRzgVym5p.bMymcOHn4.Wl4Jye2', 'PATIENT', '+1-555-0203', CURRENT_TIMESTAMP),
(12, 'Bob Williams', 'bob.w@patient.com', '$2a$10$8.UnVuG9HHgffUDAlk8qfOUVGkqRzgVym5p.bMymcOHn4.Wl4Jye2', 'PATIENT', '+1-555-0204', CURRENT_TIMESTAMP),
(13, 'Charlie Brown', 'charlie.b@patient.com', '$2a$10$8.UnVuG9HHgffUDAlk8qfOUVGkqRzgVym5p.bMymcOHn4.Wl4Jye2', 'PATIENT', '+1-555-0205', CURRENT_TIMESTAMP),
(14, 'Diana Prince', 'diana.p@patient.com', '$2a$10$8.UnVuG9HHgffUDAlk8qfOUVGkqRzgVym5p.bMymcOHn4.Wl4Jye2', 'PATIENT', '+1-555-0206', CURRENT_TIMESTAMP),
(15, 'Edward Davis', 'edward.d@patient.com', '$2a$10$8.UnVuG9HHgffUDAlk8qfOUVGkqRzgVym5p.bMymcOHn4.Wl4Jye2', 'PATIENT', '+1-555-0207', CURRENT_TIMESTAMP),
(16, 'Fiona Clark', 'fiona.c@patient.com', '$2a$10$8.UnVuG9HHgffUDAlk8qfOUVGkqRzgVym5p.bMymcOHn4.Wl4Jye2', 'PATIENT', '+1-555-0208', CURRENT_TIMESTAMP),
(17, 'George Harris', 'george.h@patient.com', '$2a$10$8.UnVuG9HHgffUDAlk8qfOUVGkqRzgVym5p.bMymcOHn4.Wl4Jye2', 'PATIENT', '+1-555-0209', CURRENT_TIMESTAMP),
(18, 'Hannah Martin', 'hannah.m@patient.com', '$2a$10$8.UnVuG9HHgffUDAlk8qfOUVGkqRzgVym5p.bMymcOHn4.Wl4Jye2', 'PATIENT', '+1-555-0210', CURRENT_TIMESTAMP);

ALTER TABLE users ALTER COLUMN id RESTART WITH 19;

-- 3. Doctors Table Entry
INSERT INTO doctors (id, user_id, specialization, department_id, license_number, consultation_fee) VALUES
(1, 2, 'General Physician', 1, 'LIC-GP-1001', 50.00),
(2, 3, 'Cardiologist', 2, 'LIC-CARD-2002', 120.00),
(3, 4, 'Pediatrician', 3, 'LIC-PED-3003', 75.00);

ALTER TABLE doctors ALTER COLUMN id RESTART WITH 4;

-- 4. Patients Table Entry
INSERT INTO patients (id, user_id, date_of_birth, gender, blood_group, address, emergency_contact) VALUES
(1, 9, '1990-05-15', 'MALE', 'O+', '123 Main St, Springfield', '+1-555-9901'),
(2, 10, '1985-08-22', 'FEMALE', 'A+', '456 Elm St, Springfield', '+1-555-9902'),
(3, 11, '1995-12-10', 'FEMALE', 'B-', '789 Oak Ave, Springfield', '+1-555-9903'),
(4, 12, '1978-03-30', 'MALE', 'AB+', '321 Pine Rd, Springfield', '+1-555-9904'),
(5, 13, '2001-07-04', 'MALE', 'O-', '654 Maple Dr, Springfield', '+1-555-9905'),
(6, 14, '1992-11-18', 'FEMALE', 'A-', '987 Cedar Ln, Springfield', '+1-555-9906'),
(7, 15, '1980-01-25', 'MALE', 'B+', '159 Birch Ct, Springfield', '+1-555-9907'),
(8, 16, '1988-09-05', 'FEMALE', 'O+', '753 Walnut Way, Springfield', '+1-555-9908'),
(9, 17, '1975-04-12', 'MALE', 'AB-', '852 Ash Blvd, Springfield', '+1-555-9909'),
(10, 18, '1998-06-30', 'FEMALE', 'A+', '951 Willow Pl, Springfield', '+1-555-9910');

ALTER TABLE patients ALTER COLUMN id RESTART WITH 11;

-- 5. Doctor Schedules (Monday through Friday, 09:00 to 17:00)
INSERT INTO doctor_schedules (id, doctor_id, "day", start_time, end_time) VALUES
-- Dr. Jenkins (General Medicine)
(1, 1, 'MONDAY', '09:00:00', '17:00:00'),
(2, 1, 'TUESDAY', '09:00:00', '17:00:00'),
(3, 1, 'WEDNESDAY', '09:00:00', '17:00:00'),
(4, 1, 'THURSDAY', '09:00:00', '17:00:00'),
(5, 1, 'FRIDAY', '09:00:00', '17:00:00'),

-- Dr. Chen (Cardiology)
(6, 2, 'MONDAY', '10:00:00', '16:00:00'),
(7, 2, 'WEDNESDAY', '10:00:00', '16:00:00'),
(8, 2, 'FRIDAY', '10:00:00', '16:00:00'),

-- Dr. Rodriguez (Pediatrics)
(9, 3, 'TUESDAY', '09:00:00', '15:00:00'),
(10, 3, 'THURSDAY', '09:00:00', '15:00:00'),
(11, 3, 'FRIDAY', '09:00:00', '15:00:00');

ALTER TABLE doctor_schedules ALTER COLUMN id RESTART WITH 12;

-- 6. Sample Appointments
INSERT INTO appointments (id, patient_id, doctor_id, appointment_date, start_time, end_time, status, reason, created_at) VALUES
(1, 1, 1, CURRENT_DATE, '09:00:00', '09:30:00', 'COMPLETED', 'Routine physical checkup and blood pressure evaluation', CURRENT_TIMESTAMP),
(2, 2, 1, CURRENT_DATE, '09:30:00', '10:00:00', 'CHECKED_IN', 'Persistent seasonal fever and cough', CURRENT_TIMESTAMP),
(3, 3, 2, CURRENT_DATE, '10:00:00', '10:30:00', 'CHECKED_IN', 'Chest discomfort during exercise', CURRENT_TIMESTAMP),
(4, 4, 3, CURRENT_DATE, '11:00:00', '11:30:00', 'BOOKED', 'Child vaccination and growth monitor', CURRENT_TIMESTAMP),
(5, 5, 1, CURRENT_DATE, '14:00:00', '14:30:00', 'BOOKED', 'Follow up on lab report results', CURRENT_TIMESTAMP);

ALTER TABLE appointments ALTER COLUMN id RESTART WITH 6;

-- 7. Queue Entries
INSERT INTO queue_entries (id, appointment_id, patient_id, doctor_id, queue_number, priority, status, check_in_time) VALUES
(1, 2, 2, 1, 101, 'NORMAL', 'WAITING', CURRENT_TIMESTAMP),
(2, 3, 3, 2, 201, 'URGENT', 'IN_PROGRESS', CURRENT_TIMESTAMP);

ALTER TABLE queue_entries ALTER COLUMN id RESTART WITH 3;

-- 8. Medical Records
INSERT INTO medical_records (id, patient_id, doctor_id, appointment_id, symptoms, diagnosis, notes, treatment_plan, created_at) VALUES
(1, 1, 1, 1, 'Mild fatigue, occasional headaches', 'Mild Hypertension Stage 1', 'Patient maintains active lifestyle. Advised sodium restriction.', 'Prescribed Amilodipine 5mg daily. Follow up in 30 days.', CURRENT_TIMESTAMP);

ALTER TABLE medical_records ALTER COLUMN id RESTART WITH 2;

-- 9. Prescriptions
INSERT INTO prescriptions (id, patient_id, doctor_id, appointment_id, prescription_date, notes) VALUES
(1, 1, 1, 1, CURRENT_DATE, 'Take medication with water after food.');

ALTER TABLE prescriptions ALTER COLUMN id RESTART WITH 2;

-- 10. Prescription Items
INSERT INTO prescription_items (id, prescription_id, medicine_name, dosage, frequency, duration, instructions) VALUES
(1, 1, 'Amlodipine', '5mg', 'Once daily (Morning)', '30 days', 'Swallow whole with food'),
(2, 1, 'Multivitamins', '1 Tablet', 'Once daily', '30 days', 'Take after breakfast');

ALTER TABLE prescription_items ALTER COLUMN id RESTART WITH 3;

-- 11. Lab Tests
INSERT INTO lab_tests (id, patient_id, doctor_id, appointment_id, test_name, status, requested_at, completed_at) VALUES
(1, 1, 1, 1, 'Lipid Profile', 'COMPLETED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 3, 2, 3, 'Electrocardiogram (ECG)', 'REQUESTED', CURRENT_TIMESTAMP, NULL);

ALTER TABLE lab_tests ALTER COLUMN id RESTART WITH 3;

-- 12. Lab Results
INSERT INTO lab_results (id, lab_test_id, result, remarks, uploaded_at) VALUES
(1, 1, 'Total Cholesterol: 195 mg/dL, HDL: 48 mg/dL, LDL: 120 mg/dL, Triglycerides: 140 mg/dL', 'Lipid levels within normal borderline range.', CURRENT_TIMESTAMP);

ALTER TABLE lab_results ALTER COLUMN id RESTART WITH 2;

-- 13. Vitals
INSERT INTO vitals (id, patient_id, nurse_id, appointment_id, temperature, blood_pressure, heart_rate, weight, height, recorded_at) VALUES
(1, 1, 5, 1, 36.8, '125/82', 72, 74.5, 175.0, CURRENT_TIMESTAMP),
(2, 2, 5, 2, 38.2, '118/76', 84, 62.0, 163.0, CURRENT_TIMESTAMP);

ALTER TABLE vitals ALTER COLUMN id RESTART WITH 3;

-- 14. Staff Tasks
INSERT INTO staff_tasks (id, title, description, assigned_to, assigned_by, priority, status, due_date) VALUES
(1, 'Prepare Consultation Room 2', 'Sanitize equipment and restock prescription pads for Dr. Chen', 7, 1, 'HIGH', 'IN_PROGRESS', CURRENT_DATE),
(2, 'Record Vitals for Room 1 Queue', 'Take temperature and BP for incoming patients in Dr. Jenkins queue', 5, 1, 'URGENT', 'TODO', CURRENT_DATE);

ALTER TABLE staff_tasks ALTER COLUMN id RESTART WITH 3;

-- 15. Notifications
INSERT INTO notifications (id, user_id, title, message, is_read, created_at) VALUES
(1, 9, 'Appointment Confirmed', 'Your appointment with Dr. Sarah Jenkins is scheduled for today at 09:00 AM.', TRUE, CURRENT_TIMESTAMP),
(2, 2, 'New Consultation Assigned', 'Patient Jane Smith has been checked in for 09:30 AM.', FALSE, CURRENT_TIMESTAMP);

ALTER TABLE notifications ALTER COLUMN id RESTART WITH 3;
