import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "UP"

def test_predict_patient_volume():
    payload = {
        "day_of_week": 1,
        "month": 9,
        "hour": 10
    }
    response = client.post("/predict/patient-volume", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "predicted_patient_count" in data
    assert isinstance(data["predicted_patient_count"], int)
    assert data["predicted_patient_count"] >= 0
