import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ExpenseFilter from "./ExpenseFilter";
import "@testing-library/jest-dom";

describe("ExpenseFilter Component", () => {
  let onFilterChangeMock;

  beforeEach(() => {
    onFilterChangeMock = jest.fn();
    render(
      <ExpenseFilter filterConfig="" onFilterChange={onFilterChangeMock} />,
    );
  });

  test("renders filter dropdown with all categories", () => {
    expect(screen.getByLabelText(/Filter by Category/i)).toBeInTheDocument();
    expect(screen.getByText("All Categories")).toBeInTheDocument();
    expect(screen.getByText("Food")).toBeInTheDocument();
    expect(screen.getByText("Travel")).toBeInTheDocument();
    expect(screen.getByText("Entertainment")).toBeInTheDocument();
    expect(screen.getByText("Bills")).toBeInTheDocument();
    expect(screen.getByText("Shopping")).toBeInTheDocument();
  });

  test("calls onFilterChange when selecting a category", () => {
    fireEvent.change(screen.getByLabelText(/Filter by Category/i), {
      target: { value: "Food" },
    });
    expect(onFilterChangeMock).toHaveBeenCalledWith("Food");

    fireEvent.change(screen.getByLabelText(/Filter by Category/i), {
      target: { value: "Travel" },
    });
    expect(onFilterChangeMock).toHaveBeenCalledWith("Travel");
  });

  test("maintains the selected category", () => {
    render(
      <ExpenseFilter
        filterConfig="Entertainment"
        onFilterChange={onFilterChangeMock}
      />,
    );
    expect(screen.getByDisplayValue("Entertainment")).toBeInTheDocument();
  });

  test("properly resets to 'All Categories'", () => {
    fireEvent.change(screen.getByLabelText(/Filter by Category/i), {
      target: { value: "" },
    });
    expect(onFilterChangeMock).toHaveBeenCalledWith("");
  });

  test("ensures accessibility with aria-label", () => {
    const filterDropdown = screen.getByLabelText(
      "Select a category to filter expenses",
    );
    expect(filterDropdown).toHaveAttribute("tabindex", "0");
  });
});
