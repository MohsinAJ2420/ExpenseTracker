const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

let expenses = [];

app.get("/api/expenses", (req, res) => {
  res.json(expenses);
});

app.post("/api/expenses", (req, res) => {
  const expense = req.body;
  expense.id = expenses.length ? expenses[expenses.length - 1].id + 1 : 1;
  expenses.push(expense);
  res.status(201).json(expense);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
