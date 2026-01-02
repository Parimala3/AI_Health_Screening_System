from flask import Flask, request, jsonify
import pickle
import numpy as np

app = Flask(__name__)
model = pickle.load(open("model.pkl","rb"))

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    features = np.array([[ 
        data["age"],
        data["bp"],
        data["sugar"],
        data["heartRate"]
    ]])

    probability = model.predict_proba(features)[0][1]

    if probability > 0.7:
        risk = "High"
    elif probability > 0.4:
        risk = "Moderate"
    else:
        risk = "Normal"

    return jsonify({
        "probability": float(probability),
        "riskLevel": risk
    })

if __name__ == "__main__":
    app.run(port=5001)
