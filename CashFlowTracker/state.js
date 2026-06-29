/**
 * state.js
 * Single source of truth for all app data.
 * Handles read/write to localStorage.
 */

const STORAGE_KEY = 'cashflow_v1';

const DEFAULT_STATE = {
  salary: 0,
  expenses: [],   // [{ id, name, amount }]
  currency: 'INR',
  exchangeRate: 1

};

let _state = { ...DEFAULT_STATE };

/**
 * Load state from localStorage on page start.
 * Falls back to DEFAULT_STATE if nothing is saved or parse fails.
 */
function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      _state = { ...DEFAULT_STATE, ...parsed };
    }
  } catch (err) {
    console.warn('[CashFlow] Failed to load state from localStorage:', err);
    _state = { ...DEFAULT_STATE };
  }
}

/**
 * Persist current state to localStorage.
 */
function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(_state));
  } catch (err) {
    console.warn('[CashFlow] Failed to save state to localStorage:', err);
  }
}

/**
 * Return a read-only snapshot of current state.
 */
function getState() {
  return { ..._state, expenses: [..._state.expenses] };
}

/**
 * Set the salary. Persists and returns new state.
 * @param {number} amount
 */
function setSalary(amount) {
  _state.salary = amount;
  saveState();
  return getState();
}

/**
 * Add an expense item.
 * @param {string} name
 * @param {number} amount
 */
function addExpense(name, amount) {
  _state.expenses.push({
    id: Date.now(),
    name: name.trim(),
    amount,
  });
  saveState();
  return getState();
}

/**
 * Delete an expense by id.
 * @param {number} id
 */
function deleteExpense(id) {
  _state.expenses = _state.expenses.filter((e) => e.id !== id);
  saveState();
  return getState();
}

/**
 * Set active currency.
 * @param {string} currency — 'INR' | 'USD' | 'EUR' | 'GBP'
 */
function setCurrency(currency) {
  _state.currency = currency;
  saveState();
  return getState();
}
function setExchangeRate(rate) {
  _state.exchangeRate = rate;
  saveState();
  return getState();
}
/**
 * Wipe all data back to defaults.
 */
function clearAllState() {

    _state.salary = 0;

    _state.expenses = [];

    _state.currency = "INR";

    _state.exchangeRate = 1;

    saveState();

    return getState();

}


/**
 * Derived computations (always in base INR).
 */
function computeTotals(state) {
  const totalExpenses = state.expenses.reduce((sum, e) => sum + e.amount, 0);
  const balance = state.salary - totalExpenses;
  const isThresholdBreached = state.salary > 0 && balance < state.salary * 0.1;
  return { totalExpenses, balance, isThresholdBreached };
}