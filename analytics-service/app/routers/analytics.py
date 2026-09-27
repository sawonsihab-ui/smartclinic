from fastapi import APIRouter, HTTPException
from app.schemas.predict import PatientVolumeRequest, PatientVolumeResponse
from app.services.ml_service import predictor_service

router = APIRouter()

@router.get("/health")
def health_check():
    return {"status": "UP", "service": "smartclinic-analytics"}

@router.post("/predict/patient-volume", response_model=PatientVolumeResponse)
def predict_patient_volume(request: PatientVolumeRequest):
    try:
        predicted = predictor_service.predict(
            day_of_week=request.day_of_week,
            month=request.month,
            hour=request.hour
        )
        return PatientVolumeResponse(predicted_patient_count=predicted)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
