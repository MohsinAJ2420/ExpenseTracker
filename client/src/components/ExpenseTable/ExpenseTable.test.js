import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ExpenseTable from "./ExpenseTable";
import { ThemeProvider } from "../../Context/context";
import "@testing-library/jest-dom";

const mockExpenses = [
  {
    id: 1,
    name: "Groceries",
    amount: "50.00",
    category: "Food",
    date: "2024-01-20",
  },
  {
    id: 2,
    name: "Taxi",
    amount: "25.00",
    category: "Travel",
    date: "2024-01-18",
  },
];

describe("ExpenseTable Component", () => {
  let onSortMock;

  beforeEach(() => {
    onSortMock = jest.fn();
    render(
      <ThemeProvider>
        <ExpenseTable
          expenses={mockExpenses}
          onSort={onSortMock}
          sortConfig={null}
        />
      </ThemeProvider>,
    );
  });

  test("renders table headers correctly", () => {
    expect(screen.getByText(/Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Amount/i)).toBeInTheDocument();
    expect(screen.getByText(/Category/i)).toBeInTheDocument();
    expect(screen.getByText(/Date/i)).toBeInTheDocument();
  });

  test("renders expense data correctly", () => {
    expect(screen.getByText(/Groceries/i)).toBeInTheDocument();
    expect(screen.getByText("50 kr")).toBeInTheDocument();
    expect(screen.getByText(/Food/i)).toBeInTheDocument();
    expect(screen.getByText(/20\/0?1\/2024/)).toBeInTheDocument();

    expect(screen.getByText(/Taxi/i)).toBeInTheDocument();
    expect(screen.getByText("25 kr")).toBeInTheDocument();
    expect(screen.getByText(/Travel/i)).toBeInTheDocument();
    expect(screen.getByText(/18\/0?1\/2024/)).toBeInTheDocument();
  });

  test("calls sorting function when clicking headers", () => {
    fireEvent.click(screen.getByText(/Amount/i));
    expect(onSortMock).toHaveBeenCalledWith("amount");

    fireEvent.click(screen.getByText(/Category/i));
    expect(onSortMock).toHaveBeenCalledWith("category");
  });

  test("shows 'No expenses available' when table is empty", () => {
    render(
      <ThemeProvider>
        <ExpenseTable expenses={[]} onSort={onSortMock} sortConfig={null} />
      </ThemeProvider>,
    );
    expect(screen.getByText(/No expenses available/i)).toBeInTheDocument();
  });
});
