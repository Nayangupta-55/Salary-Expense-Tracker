/**
 * ==========================================================
 * app.js
 * Main Controller
 * ==========================================================
 */

/* ----------------------------------------------------------
   DOM Elements
---------------------------------------------------------- */

const salaryInput = document.getElementById("salaryInput");
const salaryBtn = document.getElementById("salaryBtn");

const expNameInput = document.getElementById("expNameInput");
const expAmtInput = document.getElementById("expAmtInput");
const addExpenseBtn = document.getElementById("addExpenseBtn");

const currencySelect = document.getElementById("currSelect");

const clearBtn = document.getElementById("clearBtn");

const downloadBtn = document.getElementById("downloadBtn");

/* ----------------------------------------------------------
   Salary
---------------------------------------------------------- */

salaryBtn.addEventListener("click", () => {

    UI.hideError();

    const salary = Number(salaryInput.value);

    if (salary <= 0 || isNaN(salary)) {

        UI.showError("Please enter a valid salary.");

        return;

    }

    setSalary(salary);

    salaryInput.value = "";

    UI.renderAll();

});

/* ----------------------------------------------------------
   Expense
---------------------------------------------------------- */

addExpenseBtn.addEventListener("click", () => {

    UI.hideError();

    const name = expNameInput.value.trim();

    const amount = Number(expAmtInput.value);

    if (name === "") {

        UI.showError("Expense name is required.");

        return;

    }

    if (amount <= 0 || isNaN(amount)) {

        UI.showError("Enter a valid expense amount.");

        return;

    }

    addExpense(name, amount);

    expNameInput.value = "";
    expAmtInput.value = "";

    UI.renderAll();

});

/* ----------------------------------------------------------
   Delete Expense
---------------------------------------------------------- */

expenseList.addEventListener("click", (e) => {

    const btn = e.target.closest(".expense-delete");

    if (!btn) return;

    const id = Number(btn.dataset.id);

    deleteExpense(id);

    UI.renderAll();

});

/* ----------------------------------------------------------
   Currency Change
---------------------------------------------------------- */

currencySelect.addEventListener("change", async () => {

    await CurrencyManager.handleCurrencyChange(

        currencySelect.value

    );

});

/* ----------------------------------------------------------
   Clear Data
---------------------------------------------------------- */

clearBtn.addEventListener("click", () => {

    console.log("Before clear:", getState());

    clearAllState();

    console.log("After clear:", getState());

    UI.renderAll();

    console.log("After render:", getState());

});

/* ----------------------------------------------------------
   PDF Download
---------------------------------------------------------- */

downloadBtn.addEventListener("click", () => {

    PDFManager.downloadReport();

});

/* ----------------------------------------------------------
   Initialize App
---------------------------------------------------------- */

async function initApp() {

    loadState();

    await CurrencyManager.loadExchangeRates();

    const state = getState();

    currencySelect.value = state.currency;

    CurrencyManager.updateRateNote();

    ChartManager.initChart();

    UI.renderAll(); 

}

initApp();