#  Cash-Flow – Salary & Expense Tracker

A modern and responsive web application that helps users manage their monthly salary, track expenses, monitor their remaining balance, and download financial reports as PDFs.

##  Features

-  Set Monthly Salary
-  Add & Delete Expenses
-  Live Balance Breakdown (Pie Chart)
-  Multi-Currency Support (INR, USD, EUR, GBP)
-  Real-Time Currency Conversion using Frankfurter API
-  Warning Alert when Balance drops below 10%
-  Download Expense Report as PDF
-  LocalStorage Support (Data persists after refresh)
-  Responsive UI for Desktop & Mobile

##  Tech Stack

| Technology | Purpose |
|------------|----------|
| HTML5 | Structure |
| CSS3 | Styling & Responsive Design |
| JavaScript (ES6) | Application Logic |
| Chart.js | Pie Chart Visualization |
| jsPDF | PDF Report Generation |
| LocalStorage | Data Persistence |
| Frankfurter API | Currency Exchange Rates |

##  Project Structure

Cash-Flow/
│
├── index.html
├── style.css
├── app.js
├── state.js
├── ui.js
├── chart.js
├── currency.js
├── pdf.js
└── README.md

##  How to Use

###  Set Salary

- Enter your monthly salary.
- Click **Save Salary**.

###  Add Expenses

- Enter expense name.
- Enter amount.
- Click **Add Expense**.

###  Monitor Balance

The application automatically calculates:

- Total Salary
- Total Expenses
- Remaining Balance

###  Currency Conversion

Choose your preferred currency from:

- INR
- USD
- EUR
- GBP

Exchange rates are fetched automatically using the Frankfurter API.

###  Balance Breakdown

A dynamic Pie Chart displays:

- Remaining Balance
- Total Expenses

---

###  Download Report

Click **Download PDF Report** to export a detailed financial summary.

###  Clear Data

Click **Clear All Data** to remove all stored salary and expense records.

---



##  Live Demo

https://salary-expense-tracker-ochre.vercel.app/

## 🔮 Future Enhancements

- Expense Categories
- Monthly Reports
- Dark Mode
- Search & Filter Expenses
- Edit Existing Expenses
- Income vs Expense Graph
- User Authentication
- Cloud Database Integration

##  Learning Outcomes

This project helped in understanding:

- DOM Manipulation
- Modular JavaScript
- LocalStorage Management
- API Integration
- Dynamic UI Rendering
- Chart.js Implementation
- PDF Generation
- Responsive Web Design

##  Author

Nayan Gupta

##  Support

If you found this project helpful, consider giving it a ⭐ on GitHub.

