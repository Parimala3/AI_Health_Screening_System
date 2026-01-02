document.getElementById("healthForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const healthData = {
        age: document.getElementById("age").value,
        bp: document.getElementById("bp").value,
        sugar: document.getElementById("sugar").value,
        heartRate: document.getElementById("heartRate").value,
        symptoms: document.getElementById("symptoms").value
    };

    const response = await fetch("http://localhost:5000/health-data", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(healthData)
    });

    const result = await response.json();

    const resultDiv = document.getElementById("result");
    resultDiv.style.display = "block";
    resultDiv.innerHTML = `
    <strong>${result.message}</strong><br><br>
    Age: ${result.report.age}<br>
    BP: ${result.report.bp}<br>
    Sugar: ${result.report.sugar}<br>
    Heart Rate: ${result.report.heartRate}<br>
    Risk Level: <b>${result.report.riskLevel}</b><br>
    Symptoms: ${result.report.symptoms || "None"}
`;

});