package com.smartclinic.client;

import com.smartclinic.dto.PatientVolumePredictRequest;
import com.smartclinic.dto.PatientVolumePredictResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class PythonAnalyticsClient {

    private static final Logger log = LoggerFactory.getLogger(PythonAnalyticsClient.class);

    @Value("${analytics.service.url:http://localhost:8000}")
    private String analyticsServiceUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    public PatientVolumePredictResponse predictPatientVolume(PatientVolumePredictRequest request) {
        String url = analyticsServiceUrl + "/predict/patient-volume";
        try {
            ResponseEntity<PatientVolumePredictResponse> response = restTemplate.postForEntity(
                    url, request, PatientVolumePredictResponse.class
            );
            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                return response.getBody();
            }
        } catch (Exception e) {
            log.warn("Python Analytics service unavailable at {}. Falling back to default prediction. Error: {}", url, e.getMessage());
        }
        // Graceful fallback prediction if Python service is down
        int fallbackVolume = calculateFallbackVolume(request.getDay_of_week(), request.getHour());
        return new PatientVolumePredictResponse(fallbackVolume);
    }

    private int calculateFallbackVolume(int dayOfWeek, int hour) {
        if (hour < 8 || hour > 18) return 0;
        int base = (dayOfWeek == 0 || dayOfWeek == 1) ? 14 : 9;
        return (hour >= 9 && hour <= 11) ? base + 4 : base;
    }
}
