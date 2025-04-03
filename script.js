document.addEventListener("DOMContentLoaded", function () {
    // Select all input fields and total balance field
    let inputs = document.querySelectorAll(".account-input");
    let totalBalanceElement = document.getElementById("totalBalance");

    // Load saved values from localStorage
    if (localStorage.getItem("balances")) {
        let savedBalances = JSON.parse(localStorage.getItem("balances"));
        inputs.forEach((input, index) => {
            input.value = savedBalances[index] || "";
        });
        updateTotal();
    }

    // Function to update total balance
    function updateTotal() {
        let total = 0;
        let balances = [];

        inputs.forEach((input) => {
            let value = parseFloat(input.value) || 0;
            balances.push(value);
            total += value;
        });

        // Update total balance display
        totalBalanceElement.innerText = `₹${total.toLocaleString()}`;

        // Save to localStorage
        localStorage.setItem("balances", JSON.stringify(balances));
    }

    // Add event listeners to each input field
    inputs.forEach((input) => {
        input.addEventListener("input", updateTotal);
    });
});
