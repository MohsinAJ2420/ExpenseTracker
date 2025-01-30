import { useState, useMemo } from "react";

const useSortExpenses = (expenses) => {
  const [sortConfig, setSortConfig] = useState(null);

  const handleSort = (key) => {
    const isAscending =
      sortConfig?.key === key && sortConfig.direction === "ascending";
    setSortConfig({ key, direction: isAscending ? "descending" : "ascending" });
  };

  const sortedExpenses = useMemo(() => {
    if (!sortConfig) return expenses;

    return [...expenses].sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      if (sortConfig.key === "amount") {
        aValue = parseFloat(aValue) || 0;
        bValue = parseFloat(bValue) || 0;
      }

      if (aValue === bValue) return 0;
      return sortConfig.direction === "ascending"
        ? aValue < bValue
          ? -1
          : 1
        : aValue > bValue
          ? -1
          : 1;
    });
  }, [expenses, sortConfig]);

  return { sortedExpenses, handleSort, sortConfig };
};

export default useSortExpenses;
