How to Start the Project -->

This project contains both the **frontend (Vite + React)** and the **backend (Node.js + Express)**.

##  1. Start the Frontend (React)
1.cd client  
2.npm install  
3.npm run dev

##  2. Start the Backend (Node+Express)
1.cd server  
2.npm install express  
3.npm init -y  
4.node server.js  

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

  ## ARIA Labels for WCAG Compliance

Throughout the project, **ARIA labels** (for example, `aria-label` and `aria-labelledby`) are applied to various components to enhance **accessibility** and help meet **WCAG** standards. These labels assist users who rely on assistive technologies, such as screen readers, by providing clear and descriptive information about interface elements.


## Optimization with `useMemo`
When the table is sorted or the app re-renders, all child components were being re-rendered. To optimize performance, **`useMemo`** is used to cache the computed results and avoid unnecessary recalculations, particularly benefiting the **chart** and **table** components.
