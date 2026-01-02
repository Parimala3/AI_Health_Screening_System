import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const auth = getAuth();
const table = document.getElementById("reportTable");

auth.onAuthStateChanged(async(user) => {
    if (!user) return;

    const token = await user.getIdToken();

    const res = await fetch("http://localhost:5000/doctor/reports", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const reports = await res.json();

    table.innerHTML = "";

    reports.forEach(r => {
        let color = "green";
        if (r.riskLevel === "High") color = "red";
        if (r.riskLevel === "Moderate") color = "orange";

        const row = `
  <tr>
    <td>${r.age}</td>
    <td>${r.bp}</td>
    <td>${r.sugar}</td>
    <td>${r.heartRate}</td>
    <td style="color:${color}; font-weight:bold;">
      ${r.riskLevel}
    </td>
    <td>${new Date(r.createdAt._seconds * 1000).toLocaleString()}</td>
  </tr>
`;

        table.innerHTML += row;
    });
});