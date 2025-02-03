import React from "react";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";

const AddExpenseForm = ({ onHandleSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    onHandleSubmit(data);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-4 border rounded shadow"
      aria-label="Expense Form"
    >
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          id="name"
          type="text"
          {...register("name", {
            required: "Name is required.",
            pattern: {
              value: /^[a-zA-Z\s]+$/,
              message: "Name must only contain letters.",
            },
          })}
          className={`form-control ${errors.name ? "is-invalid" : ""}`}
          placeholder="Enter expense name"
          aria-label="Expense Name"
          aria-describedby="nameHelp"
        />
        <small id="nameHelp" className="form-text text-muted">
          Enter a valid name (letters only).
        </small>
        {errors.name && (
          <div className="invalid-feedback" role="alert">
            {errors.name.message}
          </div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="amount" className="form-label">
          Amount
        </label>
        <input
          id="amount"
          type="number"
          {...register("amount", {
            required: "Amount is required.",
            min: { value: 0.01, message: "Amount must be greater than 0." },
          })}
          className={`form-control ${errors.amount ? "is-invalid" : ""}`}
          placeholder="Enter amount"
          aria-label="Expense Amount"
          aria-describedby="amountHelp"
        />
        <small id="amountHelp" className="form-text text-muted">
          Enter a positive amount.
        </small>
        {errors.amount && (
          <div className="invalid-feedback" role="alert">
            {errors.amount.message}
          </div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="category" className="form-label">
          Category
        </label>
        <input
          id="category"
          type="text"
          {...register("category", {
            required: "Category is required.",
          })}
          className={`form-control ${errors.category ? "is-invalid" : ""}`}
          placeholder="Enter or select a category"
          list="categories"
          aria-label="Expense Category"
          aria-describedby="categoryHelp"
        />
        <datalist id="categories">
          <option value="Food" />
          <option value="Travel" />
          <option value="Entertainment" />
          <option value="Bills" />
          <option value="Shopping" />
        </datalist>
        <small id="categoryHelp" className="form-text text-muted">
          Choose a category from the list or enter one.
        </small>
        {errors.category && (
          <div className="invalid-feedback" role="alert">
            {errors.category.message}
          </div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="date" className="form-label">
          Date
        </label>
        <input
          id="date"
          type="date"
          {...register("date", {
            required: "Date is required.",
            min: {
              value: "2020-01-01",
              message: "Date cannot be before January 1, 2020.",
            },
            max: {
              value: new Date().toISOString().split("T")[0], 
              message: "Date cannot be in the future.",
            },
          })}
          className={`form-control ${errors.date ? "is-invalid" : ""}`}
          aria-label="Expense Date"
          aria-describedby="dateHelp"
        />
        <small id="dateHelp" className="form-text text-muted">
          Select the date of expense.
        </small>
        {errors.date && (
          <div className="invalid-feedback" role="alert">
            {errors.date.message}
          </div>
        )}
      </div>

      <button type="submit" className="btn btn-primary w-100" tabIndex="0">
        Add Expense
      </button>
    </form>
  );
};

export default AddExpenseForm;
