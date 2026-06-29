/**
 * ==========================================================
 * ui.js
 * Responsible for all UI Rendering
 * ==========================================================
 */

/* ----------------------------------------------------------
   DOM Elements
---------------------------------------------------------- */

const salaryEl = document.getElementById("kpiSalary");
const expenseEl = document.getElementById("kpiExpenses");
const balanceEl = document.getElementById("kpiBalance");

const expenseList = document.getElementById("expenseList");
const expenseCount = document.getElementById("expenseCount");

const errorBanner = document.getElementById("errorBanner");
const errorMsg = document.getElementById("errorMsg");

const alertBanner = document.getElementById("alertBanner");

/* ----------------------------------------------------------
   Currency Formatter
---------------------------------------------------------- */

function formatMoney(amount){

    return CurrencyManager.formatConvertedMoney(amount);

}

/* ----------------------------------------------------------
   Error
---------------------------------------------------------- */

function showError(message){

    errorMsg.textContent = message;

    errorBanner.classList.add("show");

}

function hideError(){

    errorBanner.classList.remove("show");

}

/* ----------------------------------------------------------
   Warning
---------------------------------------------------------- */

function showWarning(){

    alertBanner.classList.add("show");

}

function hideWarning(){

    alertBanner.classList.remove("show");

}

/* ----------------------------------------------------------
   KPI Cards
---------------------------------------------------------- */

function renderKPI(state){

    const totals = computeTotals(state);

    salaryEl.textContent = formatMoney(state.salary);

    expenseEl.textContent = formatMoney(totals.totalExpenses);

    balanceEl.textContent = formatMoney(totals.balance);

    balanceEl.classList.remove("danger");

    if(totals.isThresholdBreached){

        balanceEl.classList.add("danger");

        showWarning();

    }

    else{

        hideWarning();

    }

}

/* ----------------------------------------------------------
   Empty State
---------------------------------------------------------- */

function renderEmpty(){

    expenseList.innerHTML = `

        <div class="empty-state">

            <i class="ti ti-receipt-off"></i>

            <p>No expenses yet. Add one above.</p>

        </div>

    `;

}

/* ----------------------------------------------------------
   Expense Item
---------------------------------------------------------- */

function expenseCard(expense){

    return `

    <div class="expense-item">

        <div class="expense-name">

            ${expense.name}

        </div>

        <div class="expense-amount">

            ${formatMoney(expense.amount)}

        </div>

        <button

            class="expense-delete"

            data-id="${expense.id}"

            title="Delete"

        >

            <i class="ti ti-trash"></i>

        </button>

    </div>

    `;

}

/* ----------------------------------------------------------
   Expense List
---------------------------------------------------------- */

function renderExpenses(state){
    console.log("renderExpenses", state.expenses);

    expenseCount.textContent =

        `(${state.expenses.length})`;

    if(state.expenses.length===0){

        renderEmpty();

        return;

    }

    expenseList.innerHTML =

        state.expenses

        .map(expenseCard)

        .join("");

}

/* ----------------------------------------------------------
   Refresh Whole UI
---------------------------------------------------------- */

function renderAll(){

    const state = getState();

    renderKPI(state);

    renderExpenses(state);

    ChartManager.updateChart(state);

}

/* ----------------------------------------------------------
   Global
---------------------------------------------------------- */

window.UI={

    renderAll,

    renderExpenses,

    renderKPI,

    showError,

    hideError,

    showWarning,

    hideWarning,

    formatMoney

};