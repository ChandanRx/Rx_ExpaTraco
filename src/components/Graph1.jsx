import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const Graph1 = ({ transactions }) => {
  // Calculate total income and expense
  const income = transactions
    .filter((t) => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);
  const expense = transactions
    .filter((t) => t.amount < 0)
    .reduce((acc, t) => acc + Math.abs(t.amount), 0);

  const data = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "Amount",
        data: [income, expense],
        backgroundColor: ["#2ecc71", "#e74c3c"],
        borderColor: ["#27ae60", "#c0392b"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ maxWidth: "400px", margin: "20px auto" }}>
      <h3 style={{ textAlign: "center", color: "#00796b" }}>Income vs Expense</h3>
      <Pie data={data} />
    </div>
  );
};

export default Graph1;
