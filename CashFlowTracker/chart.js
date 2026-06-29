/**
 * ==========================================================
 * chart.js
 * Handles Pie Chart Rendering using Chart.js
 * ==========================================================
 */

let expenseChart = null;

/**
 * Create chart on first load
 */
function initChart() {
  const canvas = document.getElementById("pieChart");

  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  expenseChart = new Chart(ctx, {
    type: "pie",

    data: {
      labels: ["Remaining Balance", "Expenses"],

      datasets: [
        {
          data: [0, 0],

          backgroundColor: [
            "#2a78d6",
            "#e34948"
          ],

          borderColor: "#ffffff",

          borderWidth: 2,

          hoverOffset: 12
        }
      ]
    },

    options: {

      responsive: true,

      maintainAspectRatio: false,

      plugins: {

        legend: {
          display: false
        },

        tooltip: {

          callbacks: {

            label(context) {

              const value = context.raw || 0;

              return `${context.label}: ${UI.formatMoney(value)}`;

            }

          }

        }

      }

    }

  });

  renderLegend();

}

/**
 * Update chart whenever data changes
 */

function updateChart(state) {

  if (!expenseChart) {

    initChart();

  }

  const totals = computeTotals(state);

  let balance = totals.balance;

  if (balance < 0) balance = 0;

  expenseChart.data.datasets[0].data = [

    balance,

    totals.totalExpenses

  ];

  expenseChart.update();

}

/**
 * Reset chart
 */

function resetChart() {

  if (!expenseChart) return;

  expenseChart.data.datasets[0].data = [0,0];

  expenseChart.update();

}

/**
 * Destroy chart
 */

function destroyChart() {

  if (!expenseChart) return;

  expenseChart.destroy();

  expenseChart = null;

}

/**
 * Custom Legend
 */

function renderLegend(){

  const legend = document.getElementById("chartLegend");

  if(!legend) return;

  legend.innerHTML = `

  <div class="legend-item">

      <span
      class="legend-dot"
      style="background:#2a78d6">
      </span>

      Remaining Balance

  </div>

  <div class="legend-item">

      <span
      class="legend-dot"
      style="background:#e34948">
      </span>

      Expenses

  </div>

  `;

}

/**
 * Redraw chart after currency changes
 */

function refreshChart(){

    updateChart(getState());

}

/**
 * Global access
 */

window.ChartManager = {

    initChart,

    updateChart,

    refreshChart,

    resetChart,

    destroyChart

};