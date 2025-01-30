import React, { useMemo } from "react";

const categories = ["Food", "Travel", "Entertainment", "Bills", "Shopping"];

export const ExpenseFilter = ({ filterConfig, onFilterChange }) => {
  const categoryOptions = useMemo(
    () =>
      categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      )),
    [],
  );

  return (
    <div className="mb-3">
      <label htmlFor="filterCategory" className="form-label">
        Filter by Category
      </label>
      <select
        id="filterCategory"
        value={filterConfig}
        onChange={(e) => onFilterChange(e.target.value)}
        className="form-select"
        aria-label="Select a category to filter expenses"
        tabIndex="0"
      >
        <option value="">All Categories</option>
        {categoryOptions}
      </select>
    </div>
  );
};

export default ExpenseFilter;
