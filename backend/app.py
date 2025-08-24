from flask import Flask, request, jsonify
import joblib
import pandas as pd
import os

app = Flask(__name__)

# Load trained model & scaler
MODEL_PATH = os.path.join(os.path.dirname(__file__), "best_model.pkl")
SCALER_PATH = os.path.join(os.path.dirname(__file__), "scaler.pkl")

model = joblib.load(MODEL_PATH)
scaler = joblib.load(SCALER_PATH)

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json  # expects JSON { "features": [f1, f2, f3, ...] }
    X = pd.DataFrame([data["features"]])
    X_scaled = scaler.transform(X)
    prob = model.predict_proba(X_scaled)[0,1]
    pred = int(prob > 0.5)
    return jsonify({"prediction": pred, "probability": float(prob)})

if __name__ == "__main__":
    app.run(debug=True, port=5000)
