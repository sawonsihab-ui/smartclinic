from pydantic import BaseModel, Field

class PatientVolumeRequest(BaseModel):
    day_of_week: int = Field(..., ge=0, le=6, description="Day of week (0=Monday, 6=Sunday)")
    month: int = Field(..., ge=1, le=12, description="Month (1-12)")
    hour: int = Field(..., ge=0, le=23, description="Hour of day (0-23)")

    class Config:
        json_schema_extra = {
            "example": {
                "day_of_week": 1,
                "month": 9,
                "hour": 10
            }
        }

class PatientVolumeResponse(BaseModel):
    predicted_patient_count: int = Field(..., description="Predicted number of patients")
