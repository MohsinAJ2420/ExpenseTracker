import { useEffect, useState } from "react";

const useFetchExpenses = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/expenses")
      .then((response) => response.json())
      .then((data) => setExpenses(data))
      .catch((error) => console.error("Error fetching expenses:", error));
  }, []);

  const addExpense = (newExpense) => {
    fetch("http://localhost:5000/api/expenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newExpense),
    })
      .then((response) => response.json())
      .then((addedExpense) => {
        setExpenses((prevExpenses) => [...prevExpenses, addedExpense]);
      })
      .catch((error) => console.error("Error adding expense:", error));
  };

  return { expenses, addExpense };
};

export default useFetchExpenses;
