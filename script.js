document.getElementById("taxForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    // Reset error messages
    document.querySelectorAll(".error-icon").forEach(function(icon) {
        icon.style.display = "none";
    });
    
    // Get input values
    var grossIncome = parseFloat(document.getElementById("grossIncome").value);
    var extraIncome = parseFloat(document.getElementById("extraIncome").value);
    var age = document.getElementById("age").value;
    var deductions = parseFloat(document.getElementById("deductions").value);

    // Validate inputs
    var valid = true;
    if (isNaN(grossIncome) || grossIncome <= 0) {
        document.getElementById("incomeError").style.display = "block";
        valid = false;
    }
    if (isNaN(extraIncome) || extraIncome < 0) {
        document.getElementById("extraIncomeError").style.display = "block";
        valid = false;
    }
    if (age === "") {
        document.getElementById("ageError").style.display = "block";
        valid = false;
    }
    if (isNaN(deductions) || deductions < 0) {
        document.getElementById("deductionsError").style.display = "block";
        valid = false;
    }

    if (valid) {
        // Perform tax calculation
        var totalIncome = grossIncome + extraIncome;
        var tax = 0;
        if (totalIncome > 8) {
            var taxableIncome = totalIncome - 8;
            if (age === "<40") {
                tax = 0.3 * taxableIncome;
            } else if (age === ">=40 & <60") {
                tax = 0.4 * taxableIncome;
            } else {
                tax = 0.1 * taxableIncome;
            }
        }

        // Display result in modal
        var modal = document.getElementById("modal");
        var resultDiv = document.getElementById("result");
        resultDiv.innerHTML = "Tax amount: " + tax.toFixed(2) + " Lakhs";
        modal.style.display = "block";

        // Close modal when user clicks on close button
        document.getElementsByClassName("close")[0].addEventListener("click", function() {
            modal.style.display = "none";
        });

        // Close modal when user clicks outside the modal
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        };
    }
});
