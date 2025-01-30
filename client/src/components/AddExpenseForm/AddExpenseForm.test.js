import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AddExpenseForm from "./AddExpenseForm";

describe("AddExpenseForm Component", () => {
  test("submits form with valid input", async () => {
    const onHandleSubmitMock = jest.fn();
    render(<AddExpenseForm onHandleSubmit={onHandleSubmitMock} />);

    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: "Groceries" },
    });
    fireEvent.change(screen.getByLabelText(/Amount/i), {
      target: { value: "50" },
    });
    fireEvent.change(screen.getByLabelText(/Category/i), {
      target: { value: "Food" },
    });
    fireEvent.change(screen.getByLabelText(/Date/i), {
      target: { value: "2024-01-20" },
    });

    fireEvent.submit(screen.getByRole("form", { name: /Expense Form/i }));

    await waitFor(() => {
      expect(onHandleSubmitMock).toHaveBeenCalledWith({
        name: "Groceries",
        amount: "50",
        category: "Food",
        date: "2024-01-20",
      });
    });
  });

  test("clears form after submission", async () => {
    const onHandleSubmitMock = jest.fn();
    render(<AddExpenseForm onHandleSubmit={onHandleSubmitMock} />);

    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: "Groceries" },
    });
    fireEvent.change(screen.getByLabelText(/Amount/i), {
      target: { value: "50" },
    });
    fireEvent.change(screen.getByLabelText(/Category/i), {
      target: { value: "Food" },
    });
    fireEvent.change(screen.getByLabelText(/Date/i), {
      target: { value: "2024-01-20" },
    });

    fireEvent.submit(screen.getByRole("form", { name: /Expense Form/i }));

    await waitFor(() => {
      expect(screen.getByLabelText(/Name/i)).toHaveValue("");
      expect(screen.getByLabelText(/Amount/i)).toHaveValue(null);
      expect(screen.getByLabelText(/Category/i)).toHaveValue("");
      expect(screen.getByLabelText(/Date/i)).toHaveValue("");
    });
  });
});
