How to Start the Project -->

This project contains both the **frontend (Vite + React)** and the **backend (Node.js + Express)**.

##  1. Start the Frontend (React)
1.cd client__
2.npm install__
3npm run dev__

##  2. Start the Backend (Node+Express)
cd server
npm install express
npm init -y
node server.js

## Project Components
This project has several components, each responsible for different parts of the UI and logic:

- **`AddExpenseForm`**: Component for adding new expenses.
- **`ExpenseChart`**: Component to display a chart of expenses (Done with Chart.js).
- **`ExpenseTable`**: Displays a sortable table of expenses.
- **`FilterExpense`**: Provides filtering options for the expenses list.

All of these components are used in **`App.js`** to create the overall application.

## Custom Hooks
For the logic of sorting, adding, and filtering expenses, there are **3 custom hooks** used in the project:

- **`useFetchExpense`**: Manages adding new expenses and handling `GET/POST` requests from the server.
- **`useSortExpenses`**: Handles the sorting logic for expenses.
- **`useFilterExpenses`**: Implements the filtering logic.

## Optimization with `useMemo`
To optimize the app, **`useMemo`** is used to memorize the results and prevent unnecessary recalculations. This optimization is particularly helpful for the **chart** and **table** components.
