document.addEventListener("DOMContentLoaded", function () {
    const lookupForm = document.getElementById("lookupForm");
    const resultDiv = document.getElementById("result");

    lookupForm.addEventListener("submit", function (event) {
        event.preventDefault();
        resultDiv.innerHTML = ""; // Clear previous results

        const regNumber = document.getElementById("regNumber").value;

        fetch("data.csv")
            .then(response => response.text())
            .then(csvData => {
                const rows = csvData.split("\n");
                const headers = rows[0].split(",");
                const dataRows = rows.slice(1);

                dataRows.forEach(row => {
                    const values = row.split(",");
                    
                    if (values[2] === regNumber) { // Match the Reg No
                        const table = document.createElement("table");
                        const trHeader = document.createElement("tr");
                        const trData = document.createElement("tr");

                        for (let i = 0; i < headers.length; i++) {
                            const th = document.createElement("th");
                            th.textContent = headers[i];
                            trHeader.appendChild(th);

                            const td = document.createElement("td");
                            td.textContent = values[i];
                            trData.appendChild(td);
                        }

                        trData.classList.add("certificate-row"); // Highlight certificate number
                        table.appendChild(trHeader);
                        table.appendChild(trData);

                        resultDiv.innerHTML = "";
                        resultDiv.appendChild(table);
                        resultDiv.classList.add("show");
                    }
                });

                if (!resultDiv.classList.contains("show")) {
                    resultDiv.innerHTML = "<p>Student not found.</p>";
                    resultDiv.classList.add("show");
                }
            })
            .catch(error => {
                resultDiv.innerHTML = "<p>Error loading data.</p>";
            });
    });
});
