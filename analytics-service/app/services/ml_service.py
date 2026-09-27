import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor

class PatientVolumePredictor:
    def __init__(self):
        self.model = self._train_model()

    def _train_model(self) -> RandomForestRegressor:
        # Generate synthetic historical clinic appointment data
        np.random.seed(42)
        records = []
        for _ in range(2000):
            day_of_week = np.random.randint(0, 7)  # 0: Monday ... 6: Sunday
            month = np.random.randint(1, 13)
            hour = np.random.randint(8, 18)        # 8 AM to 5 PM
            
            # Base traffic: Mondays & Tuesdays are busier, weekends lower
            base = 12 if day_of_week in [0, 1] else (8 if day_of_week < 5 else 3)
            # Peak hours: 9-11 AM and 2-4 PM
            hour_factor = 6 if hour in [9, 10, 14, 15] else 3
            # Winter months slightly higher due to flu season
            season_factor = 3 if month in [11, 12, 1, 2] else 1
            
            noise = np.random.normal(0, 2)
            count = max(1, int(round(base + hour_factor + season_factor + noise)))
            records.append({
                "day_of_week": day_of_week,
                "month": month,
                "hour": hour,
                "patient_count": count
            })

        df = pd.DataFrame(records)
        X = df[["day_of_week", "month", "hour"]]
        y = df["patient_count"]

        model = RandomForestRegressor(n_estimators=50, random_state=42)
        model.fit(X, y)
        return model

    def predict(self, day_of_week: int, month: int, hour: int) -> int:
        # Outside operating hours (before 8 AM or after 6 PM), minimal expected volume
        if hour < 7 or hour > 19:
            return 0
            
        features = pd.DataFrame([{
            "day_of_week": day_of_week,
            "month": month,
            "hour": hour
        }])
        pred = self.model.predict(features)[0]
        return max(0, int(round(pred)))

predictor_service = PatientVolumePredictor()
