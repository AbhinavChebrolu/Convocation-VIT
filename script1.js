document.addEventListener("DOMContentLoaded", function () {
    const lookupForm = document.getElementById("lookupForm");
    const resultDiv = document.getElementById("result");

    lookupForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        resultDiv.innerHTML = ""; // Clear previous results

        const regNumber = document.getElementById("regNumber").value;

        try {
            const response = await fetch("data.csv");
            const csvData = await response.text();

            const rows = csvData.split("\n");
            const headers = rows[0].split("\t"); // Split using tab character
            const dataRows = rows[1].split("\t"); // Split using tab character

            let data = {};

            for (let i = 0; i < headers.length; i++) {
                data[headers[i]] = dataRows[i];
            }

            if (data["Reg No"] === regNumber) {
                displayData(data);
            } else {
                resultDiv.innerHTML = "<p>Student not found.</p>";
            }
        } catch (error) {
            resultDiv.innerHTML = "<p>Error loading data.</p>";
        }
    });

    function displayData(data) {
        resultDiv.innerHTML = "<h2>Student Information</h2>";
        let tableHtml = "";

        for (const key in data) {
            tableHtml += `<p><strong>${key}:</strong> ${data[key]}</p>`;
        }

        resultDiv.innerHTML += tableHtml;
    }
});
