package com.smartclinic.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class SubmitLabResultRequest {

    @NotNull(message = "Lab test ID is required")
    private Long labTestId;

    @NotBlank(message = "Result content is required")
    private String result;

    private String remarks;

    public SubmitLabResultRequest() {}

    public Long getLabTestId() { return labTestId; }
    public void setLabTestId(Long labTestId) { this.labTestId = labTestId; }

    public String getResult() { return result; }
    public void setResult(String result) { this.result = result; }

    public String getRemarks() { return remarks; }
    public void setRemarks(String remarks) { this.remarks = remarks; }
}
