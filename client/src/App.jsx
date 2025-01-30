import React from "react";
import useFetchExpenses from "./Hooks/useFetchExpenses.js";
import useSortExpenses from "./Hooks/useSortExpenses.js";
import useFilterExpenses from "./Hooks/useFilterExpenses.js";
import AddExpenseForm from "./components/AddExpenseForm/AddExpenseForm.jsx";
import ExpenseTable from "./components/ExpenseTable/ExpenseTable.jsx";
import ExpenseChart from "./components/ExpenseChart/ExpenseChart.jsx";
import ExpenseFilter from "./components/ExpenseFilter/ExpenseFilter.jsx";
import { useTheme } from "./Context/context.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { expenses, addExpense } = useFetchExpenses();
  const { filteredExpenses, setFilterConfig, filterConfig } =
    useFilterExpenses(expenses);
  const { sortedExpenses, handleSort, sortConfig } =
    useSortExpenses(filteredExpenses);

  return (
    <div
      className={`container-fluid vh-100 d-flex flex-column ${isDarkMode ? "bg-dark text-white" : "bg-light text-dark"}`}
    >
      <header className="text-center py-3">
        <h1>Expense Tracker</h1>
        <button
          onClick={toggleTheme}
          className="btn btn-secondary"
          aria-label="Toggle Dark Mode"
        >
          {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>
      </header>

      <div className="row flex-grow-1 w-100 m-0">
        <div className="col-12 col-md-4 d-flex flex-column mb-3">
          <div
            className={`card shadow flex-grow-1 ${isDarkMode ? "bg-dark text-white border-light" : "bg-light text-dark border-dark"}`}
          >
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Add Expense</h5>
            </div>
            <div className="card-body">
              <AddExpenseForm onHandleSubmit={addExpense} />
            </div>
          </div>
        </div>
        <div className="col-12 col-md-8 d-flex flex-column">
          <ExpenseFilter
            filterConfig={filterConfig}
            onFilterChange={setFilterConfig}
          />
          <ExpenseTable
            expenses={sortedExpenses}
            onSort={handleSort}
            sortConfig={sortConfig}
          />
          <ExpenseChart expenses={expenses} />
        </div>
      </div>
    </div>
  );
};

export default App;
