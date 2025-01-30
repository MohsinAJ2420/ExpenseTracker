import { useState, useMemo } from "react";

const useFilterExpenses = (expenses) => {
  const [filterConfig, setFilterConfig] = useState("");

  const filteredExpenses = useMemo(() => {
    if (!filterConfig) return expenses;
    return expenses.filter((expense) => expense.category === filterConfig);
  }, [expenses, filterConfig]);

  return { filteredExpenses, setFilterConfig, filterConfig };
};

export default useFilterExpenses;
