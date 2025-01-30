import React, { useMemo } from "react";
import { useTheme } from "../../Context/context.jsx";

const columns = [
  { key: "name", label: "Name" },
  { key: "amount", label: "Amount" },
  { key: "category", label: "Category" },
  { key: "date", label: "Date" },
];

const ExpenseTable = React.memo(({ expenses, onSort, sortConfig }) => {
  const { isDarkMode } = useTheme();

  const getSortIcon = (key) => {
    if (sortConfig?.key !== key)
      return <i className="bi bi-arrow-down-up text-muted"></i>;
    return sortConfig.direction === "ascending" ? (
      <i
        className={`bi bi-arrow-up ${isDarkMode ? "text-light" : "text-primary"}`}
      ></i>
    ) : (
      <i
        className={`bi bi-arrow-down ${isDarkMode ? "text-light" : "text-primary"}`}
      ></i>
    );
  };

  const tableRows = useMemo(() => {
    return expenses.length > 0 ? (
      expenses.map((expense) => (
        <tr key={expense.id}>
          <td>{expense.name}</td>
          <td>{parseFloat(expense.amount).toLocaleString("no-NO")} kr</td>
          <td>{expense.category}</td>
          <td>{new Date(expense.date).toLocaleDateString()}</td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="4" className="text-center">
          No expenses available
        </td>
      </tr>
    );
  }, [expenses]);

  return (
    <div className="table-responsive">
      <table
        className={`table table-striped table-bordered table-hover ${isDarkMode ? "table-dark border-light" : "table-light border-dark"}`}
      >
        <thead className={isDarkMode ? "thead-dark" : "thead-light"}>
          <tr>
            {columns.map(({ key, label }) => (
              <th
                key={key}
                onClick={() => onSort(key)}
                aria-label={`Sort by ${label}`}
                style={{ cursor: "pointer" }}
                aria-sort={
                  sortConfig?.key === key
                    ? sortConfig.direction === "ascending"
                      ? "ascending"
                      : "descending"
                    : "none"
                }
              >
                {label} {getSortIcon(key)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    </div>
  );
});

export default ExpenseTable;
