const axios = require("axios");
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const serviceAccount = require("./firebaseKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();


const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

async function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split("Bearer ")[1];

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken;
        next();
    } catch (err) {
        return res.status(401).json({ error: "Invalid token" });
    }
}



// Test route
app.get("/", (req, res) => {
    res.send("Backend is running!");
});

app.post("/health-data", async(req, res) => {
    const { age, bp, sugar, heartRate, symptoms } = req.body;

    let riskScore = 0;

    const bpParts = bp.split("/");
    const systolic = parseInt(bpParts[0]);
    const diastolic = parseInt(bpParts[1]);

    if (systolic >= 140 || diastolic >= 90) riskScore++;
    if (sugar >= 160) riskScore++;
    if (heartRate >= 100) riskScore++;

    let riskLevel = "Normal";
    if (riskScore === 1) riskLevel = "Moderate";
    if (riskScore >= 2) riskLevel = "High";

    const healthReport = {
        age,
        bp,
        sugar,
        heartRate,
        symptoms,
        riskLevel,
        createdAt: new Date()
    };

    // 🔥 Save to Firestore
    await db.collection("healthReports").add(healthReport);

    console.log("Saved to Firebase:", healthReport);

    res.json({
        message: "Health report saved successfully",
        report: healthReport
    });
});


// ==========================
// DOCTOR VIEW REPORTS API
// ==========================
app.get("/doctor/reports", verifyToken, async(req, res) => {
    const role = req.user.role;

    if (role !== "doctor" && role !== "admin") {
        return res.status(403).json({ error: "Access denied" });
    }

    try {
        const snapshot = await admin.firestore()
            .collection("healthReports")
            .orderBy("createdAt", "desc")
            .get();

        const reports = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        res.json(reports);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});