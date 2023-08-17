document.addEventListener("DOMContentLoaded", function () {
    const lookupForm = document.getElementById("lookupForm");
    const resultDiv = document.getElementById("result");

    // Check if screen width is less than or equal to 768 pixels (mobile version)
    if (window.innerWidth <= 768) {
        lookupForm.addEventListener("submit", function (event) {
            event.preventDefault();
            resultDiv.innerHTML = ""; // Clear previous results

            const regNumberInput = document.getElementById("regNumber");
            const regNumber = regNumberInput.value.toUpperCase(); // Convert to uppercase

            fetch("data.csv")
                .then(response => response.text())
                .then(csvData => {
                    const rows = csvData.split("\n");
                    const headers = rows[0].split(",");
                    const dataRows = rows.slice(1);

                    let regNumberFound = false; // Flag to track if Reg No is found

                    dataRows.some(row => { // Using 'some' to stop iteration after the Reg No is found
                        const values = row.split(",");
                        
                        if (values[1] === regNumber) { // Match the Reg No
                            const studentInfo = document.createElement("div");
                            studentInfo.classList.add("student-info");

                            for (let i = 0; i < headers.length; i++) {
                                const infoItem = document.createElement("div");
                                infoItem.classList.add("info-item");

                                const label = document.createElement("span");
                                label.textContent = headers[i] + ": ";
                                infoItem.appendChild(label);

                                const value = document.createElement("span");
                                value.textContent = values[i];
                                value.style.fontWeight = "bold"; // Make the result bold
                                infoItem.appendChild(value);

                                if (i === 3) { // Check for the 4th column
                                    if (dataRows.indexOf(row) < 894) {
                                        label.textContent = "Seat Number: "; // Change label
                                    }
                                    value.style.backgroundColor = "yellow";
                                    value.style.color = "blue";
                                }

                                studentInfo.appendChild(infoItem);
                            }

                            resultDiv.appendChild(studentInfo);
                            resultDiv.classList.add("show");
                            regNumberFound = true;
                            return true; // Stop iteration
                        }
                    });

                    if (!regNumberFound) {
                        resultDiv.innerHTML = "<p>Student not found.</p>";
                        resultDiv.classList.add("show");
                    }
                })
                .catch(error => {
                    resultDiv.innerHTML = "<p>Error loading data.</p>";
                });
        });
    }
    // Desktop version
    else {
        lookupForm.addEventListener("submit", function (event) {
            event.preventDefault();
            resultDiv.innerHTML = ""; // Clear previous results

            const regNumberInput = document.getElementById("regNumber");
            const regNumber = regNumberInput.value.toUpperCase(); // Convert to uppercase

            fetch("data.csv")
                .then(response => response.text())
                .then(csvData => {
                    const rows = csvData.split("\n");
                    const headers = rows[0].split(",");
                    const dataRows = rows.slice(1);

                    let regNumberFound = false; // Flag to track if Reg No is found

                    dataRows.some(row => { // Using 'some' to stop iteration after the Reg No is found
                        const values = row.split(",");
                        
                        if (values[1] === regNumber) { // Match the Reg No
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

                                if (i === 3) { // Check for the 4th column
                                    if (dataRows.indexOf(row) < 894) {
                                        th.textContent = "Seat Number"; // Change header attribute
                                    }
                                    td.style.backgroundColor = "yellow";
                                    td.style.fontWeight = "bold";
                                    td.style.color = "blue";
                                }
                            }

                            trData.classList.add("certificate-row"); // Highlight certificate number
                            table.appendChild(trHeader);
                            table.appendChild(trData);

                            resultDiv.innerHTML = "";
                            resultDiv.appendChild(table);
                            resultDiv.classList.add("show");
                            regNumberFound = true;
                            return true; // Stop iteration
                        }
                    });

                    if (!regNumberFound) {
                        resultDiv.innerHTML = "<p>Student not found.</p>";
                        resultDiv.classList.add("show");
                    }
                })
                .catch(error => {
                    resultDiv.innerHTML = "<p>Error loading data.</p>";
                });
        });
    }
});
