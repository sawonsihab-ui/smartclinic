package com.smartclinic.dto;

public class PatientVolumePredictResponse {
    private int predicted_patient_count;

    public PatientVolumePredictResponse() {}

    public PatientVolumePredictResponse(int predicted_patient_count) {
        this.predicted_patient_count = predicted_patient_count;
    }

    public int getPredicted_patient_count() { return predicted_patient_count; }
    public void setPredicted_patient_count(int predicted_patient_count) { this.predicted_patient_count = predicted_patient_count; }
}
