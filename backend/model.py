import pandas as pd
from sklearn.linear_model import LinearRegression
import joblib

def train_model():
    # Example data — replace with your pipeline output
    data = pd.DataFrame({
        "time": [1,2,3,4,5,6,7,8,9,10],
        "trend": [10,20,25,40,50,65,70,85,90,100]
    })
    X = data[["time"]]
    y = data["trend"]

    model = LinearRegression()
    model.fit(X, y)
    joblib.dump(model, "backend/trend_model.pkl")

def predict_trend(time_val):
    model = joblib.load("backend/trend_model.pkl")
    return model.predict([[time_val]])[0]

if __name__ == "__main__":
    train_model()
    print("✅ Model trained and saved at backend/trend_model.pkl")
