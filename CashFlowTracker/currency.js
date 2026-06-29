/**
 * ==========================================================
 * currency.js
 * Currency Conversion
 * Frankfurter API
 * ==========================================================
 */

const BASE_CURRENCY = "INR";

const currencySymbols = {

    INR: "₹",

    USD: "$",

    EUR: "€",

    GBP: "£"

};

const currencyRates = {

    INR:1,

    USD:1,

    EUR:1,

    GBP:1

};

/**
 * Load exchange rates
 */

async function loadExchangeRates(){

    try{

        const response = await fetch(

            "https://api.frankfurter.app/latest?from=INR"

        );

        if(!response.ok){

            throw new Error("Unable to fetch exchange rates.");

        }

        const data = await response.json();

        currencyRates.INR = 1;

        currencyRates.USD = data.rates.USD;

        currencyRates.EUR = data.rates.EUR;

        currencyRates.GBP = data.rates.GBP;

        updateRateNote();

    }

    catch(error){

        console.error(error);

        currencyRates.INR = 1;

        currencyRates.USD = 0.012;

        currencyRates.EUR = 0.011;

        currencyRates.GBP = 0.0095;

        updateRateNote();

    }

}

/**
 * Return symbol
 */

function getCurrencySymbol(){

    return currencySymbols[getState().currency];

}

/**
 * Return exchange rate
 */

function getExchangeRate(){

    return currencyRates[getState().currency];

}

/**
 * Convert INR value
 */

function convertAmount(amount){

    return amount * getExchangeRate();

}

/**
 * Format money
 */

function formatConvertedMoney(amount){

    const converted = convertAmount(amount);

    return `${getCurrencySymbol()}${converted.toLocaleString("en-IN",{

        minimumFractionDigits:2,

        maximumFractionDigits:2

    })}`;

}

/**
 * Update rate note
 */

function updateRateNote(){

    const note = document.getElementById("rateNote");

    if(!note) return;

    const state = getState();

    if(state.currency==="INR"){

        note.textContent = "Base Currency";

        return;

    }

    note.textContent =

        `1 INR = ${currencyRates[state.currency].toFixed(4)} ${state.currency}`;

}

/**
 * Currency Changed
 */

async function handleCurrencyChange(currency){

    setCurrency(currency);

    setExchangeRate(currencyRates[currency]);

    updateRateNote();

    UI.renderAll();

}

/**
 * Get available currencies
 */

function getCurrencies(){

    return Object.keys(currencySymbols);

}

/**
 * Global Export
 */

window.CurrencyManager = {

    loadExchangeRates,

    getCurrencySymbol,

    getExchangeRate,

    convertAmount,

    formatConvertedMoney,

    updateRateNote,

    handleCurrencyChange,

    getCurrencies

};