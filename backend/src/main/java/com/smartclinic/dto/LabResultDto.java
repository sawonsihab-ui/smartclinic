package com.smartclinic.dto;

import com.smartclinic.entity.LabResult;
import java.time.LocalDateTime;

public class LabResultDto {
    private Long id;
    private Long labTestId;
    private String result;
    private String remarks;
    private LocalDateTime uploadedAt;

    public LabResultDto() {}

    public LabResultDto(LabResult result) {
        this.id = result.getId();
        if (result.getLabTest() != null) {
            this.labTestId = result.getLabTest().getId();
        }
        this.result = result.getResult();
        this.remarks = result.getRemarks();
        this.uploadedAt = result.getUploadedAt();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getLabTestId() { return labTestId; }
    public void setLabTestId(Long labTestId) { this.labTestId = labTestId; }

    public String getResult() { return result; }
    public void setResult(String result) { this.result = result; }

    public String getRemarks() { return remarks; }
    public void setRemarks(String remarks) { this.remarks = remarks; }

    public LocalDateTime getUploadedAt() { return uploadedAt; }
    public void setUploadedAt(LocalDateTime uploadedAt) { this.uploadedAt = uploadedAt; }
}
