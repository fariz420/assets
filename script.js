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

// chart.js
const inputs = document.querySelectorAll('.account-input');

const assetLabels = [
  "State Bank Of India", "Axis Bank", "Other Banks", "Mutual Funds",
  "Digital Gold", "Fixed Deposit", "Cash In Hand", "Lend To People", "Crypto Currency"
];

const chartColors = [
  '#4285F4', '#B12F62', '#A4C2F4', '#00F3BB',
  '#EFBF04', '#34A853', '#339966', '#D8D1E8', '#E7C460'
];

window.addEventListener('DOMContentLoaded', () => {
  const ctx = document.getElementById('donutChart').getContext('2d');

  const donutChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: assetLabels,
      datasets: [{
        data: new Array(assetLabels.length).fill(0),
        backgroundColor: chartColors,
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      cutout: '00%',
      plugins: {
        legend: {
          display: false
        }
      }
    }
  });

  function updateChart() {
    const data = [];
    inputs.forEach(input => {
      const val = parseFloat(input.value) || 0;
      data.push(val);
    });

    donutChart.data.datasets[0].data = data;
    donutChart.update();
  }

  inputs.forEach(input => {
    input.addEventListener('input', updateChart);
  });

  updateChart(); // Initial draw
});

// breakdown
let breakdownChart = null;

// Load saved values from localStorage on page load
window.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('input[data-type]');
    inputs.forEach((input, index) => {
        const key = `input-${index}`;
        const savedValue = localStorage.getItem(key);
        if (savedValue !== null) {
            input.value = savedValue;
        }
    });

    updateChartData();
});

// Save input values to localStorage and update chart
document.addEventListener('input', () => {
    const inputs = document.querySelectorAll('input[data-type]');
    inputs.forEach((input, index) => {
        const key = `input-${index}`;
        localStorage.setItem(key, input.value);
    });

    updateChartData();
});

function updateChartData() {
    const inputs = document.querySelectorAll('input[data-type]');
    let bankTotal = 0;
    let investmentTotal = 0;
    let cashLendTotal = 0;

    inputs.forEach(input => {
        const value = parseFloat(input.value) || 0;
        const type = input.dataset.type;

        if (type === 'banks') bankTotal += value;
        else if (type === 'investment') investmentTotal += value;
        else if (type === 'cash+lend') cashLendTotal += value;
    });

    updateBreakdownValues(bankTotal, investmentTotal, cashLendTotal);
    renderChart(bankTotal, investmentTotal, cashLendTotal);
}

function updateBreakdownValues(banks, investments, cashLend) {
    const breakdownValues = document.querySelectorAll('.breakdown .money h3');

    if (breakdownValues.length >= 3) {
        breakdownValues[0].innerHTML = `₹${banks}`;
        breakdownValues[1].innerHTML = `₹${investments}`;
        breakdownValues[2].innerHTML = `₹${cashLend}`;
    }
}

function renderChart(bankTotal, investmentTotal, cashLendTotal) {
    const ctx = document.getElementById('breakdownChart').getContext('2d');

    const data = {
        labels: ['Banks', 'Investments', 'Cash + Lend'],
        datasets: [{
            data: [bankTotal, investmentTotal, cashLendTotal],
            backgroundColor: ['#6D9EEB', '#00F3BB', '#339966'],
            borderWidth: 0
        }]
    };

    if (breakdownChart) {
        breakdownChart.data.datasets[0].data = [bankTotal, investmentTotal, cashLendTotal];
        breakdownChart.update();
    } else {
        breakdownChart = new Chart(ctx, {
            type: 'doughnut',
            data: data,
            options: {
                cutout: '0%',
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }
}



