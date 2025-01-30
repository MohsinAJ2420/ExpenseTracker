import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useMemo } from "react";
import { useTheme } from "../../Context/context.jsx";

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseChart = ({ expenses }) => {
  const { isDarkMode } = useTheme();

  const categoryTotals = useMemo(() => {
    return expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {});
  }, [expenses]);

  const data = useMemo(
    () => ({
      labels: Object.keys(categoryTotals),
      datasets: [
        {
          label: "Expenses by Category",
          data: Object.values(categoryTotals),
          backgroundColor: isDarkMode
            ? ["#B71C1C", "#0D47A1", "#FBC02D", "#00897B"]
            : ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
          borderColor: isDarkMode ? "#FFFFFF" : "#000000",
          borderWidth: 1,
        },
      ],
    }),
    [categoryTotals, isDarkMode],
  );

  return (
    <div
      className={`card shadow flex-grow-1 ${isDarkMode ? "bg-dark text-white" : "bg-light text-dark"}`}
    >
      <div className="card-header bg-info text-white">
        <h5 className="mb-0">Expense Chart</h5>
      </div>
      <div className="card-body d-flex justify-content-center align-items-center">
        <Pie
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false,
          }}
          aria-label="Pie chart showing expense distribution by category"
        />
      </div>
    </div>
  );
};

export default ExpenseChart;
