# 🏥 AI-Powered Remote Health Screening System

An AI-based health screening system that allows patients to submit health data remotely and helps doctors analyze health risks using Machine Learning.

---

## 🎯 Project Objectives

- Enable remote health screening
- Predict health risk using Machine Learning
- Store patient data securely in the cloud
- Provide role-based access for Patients and Doctors

---

## 🧠 System Workflow

1. User logs in using Firebase Authentication  
2. Patient submits health details  
3. Backend sends data to ML service  
4. ML model predicts risk level  
5. Data is stored in Firestore  
6. Doctor views reports in dashboard  

---

## 🏗️ Project Architecture

```text
Frontend → Node.js Backend → ML Service (Flask)
                      ↓
                Firebase Firestore
```

---

## 🛠️ Technologies Used

### Backend
- Node.js
- Express.js
- Axios

### Machine Learning
- Python
- Flask
- Scikit-Learn
- Logistic Regression

### Cloud & Database
- Firebase Authentication
- Firebase Firestore

---

## 📂 Project Structure

```text
AI_Health_Screening_System/
├── frontend/
│   ├── index.html
│   ├── auth.html
│   ├── doctor.html
│   ├── script.js
│   ├── doctor.js
│   └── style.css
│
├── backend/
│   ├── server.js
│   └── package.json
│
├── ml/
│   ├── train_model.py
│   ├── app.py
│   └── requirements.txt
│
├── .gitignore
└── README.md
```

---

## 🤖 Machine Learning Model

**Algorithm Used:** Logistic Regression  

### Input Features
- Age
- Systolic Blood Pressure
- Sugar Level
- Heart Rate

### Output
- Risk Probability
- Risk Level (Normal / Moderate / High)

---

## 🔐 Security Features

- Firebase Authentication
- Role-based access control
- Sensitive credentials excluded using `.gitignore`
- Secure backend–ML communication

---

## ▶️ How to Run the Project Locally

### 1️⃣ Start Machine Learning Service

```bash
cd ml
pip install -r requirements.txt
python app.py
```

---

### 2️⃣ Start Backend Server

```bash
cd backend
npm install
node server.js
```

---

### 3️⃣ Open Frontend

```text
Open frontend/index.html using Live Server or browser
Login and submit health details
```

---

## 🧪 Sample Output

- Health Risk Level (Normal / Moderate / High)
- ML-generated probability
- Color-coded results
- Doctor dashboard with patient reports

---

## 🚀 Future Enhancements

- Wearable device integration
- Image-based disease detection
- Mobile application
- Cloud deployment

---

## 👩‍💻 Author

**Parimala Vuyyuru**
