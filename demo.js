document.addEventListener("DOMContentLoaded", function () {
    let inputs = document.querySelectorAll(".account-input");
    let totalBalanceElement = document.getElementById("totalBalance");

    // Function to format number with commas (Indian format)
    function formatWithCommas(value) {
        let num = value.replace(/,/g, ""); // Remove commas first
        if (!num) return ""; // If empty, return empty string
        return Number(num).toLocaleString("en-IN");
    }

    // Load saved balances from localStorage
    if (localStorage.getItem("balances")) {
        let savedBalances = JSON.parse(localStorage.getItem("balances"));
        inputs.forEach((input, index) => {
            if (savedBalances[index] !== undefined) {
                input.value = formatWithCommas(savedBalances[index].toString());
            }
        });
        updateTotal();
    }

    // Function to update total balance
    function updateTotal() {
        let total = 0;
        let balances = [];

        inputs.forEach((input) => {
            let rawValue = input.value.replace(/,/g, ""); // Remove commas
            let value = parseFloat(rawValue) || 0; // Convert to number
            balances.push(value);
            total += value;
        });

        // Update total balance display
        totalBalanceElement.innerText = `₹${formatWithCommas(total.toString())}`;

        // Save to localStorage
        localStorage.setItem("balances", JSON.stringify(balances));
    }

    // Add event listeners to each input field
    inputs.forEach((input) => {
        input.addEventListener("input", function () {
            let rawValue = this.value.replace(/,/g, ""); // Remove commas
            let formattedValue = formatWithCommas(rawValue); // Format with commas
            this.value = formattedValue;
            updateTotal();
        });

        // Prevent non-numeric input
        input.addEventListener("keypress", function (e) {
            if (!/[0-9]/.test(e.key)) {
                e.preventDefault();
            }
        });
    });
});
