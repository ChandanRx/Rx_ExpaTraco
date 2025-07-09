import React from "react";
import "../css/ExpenseCard.css";

const ExpenseCard = ({ transactions }) => {
  const amount = transactions
    .filter((t) => t && typeof t.amount === "number") // safe filter
    .map((transaction) => transaction.amount);

  const income = amount
    .filter((item) => item > 0)
    .reduce((acc, item) => acc + item, 0)
    .toFixed(2);

  const expense = (
    amount
      .filter((item) => item < 0)
      .reduce((acc, item) => acc + item, 0) * -1
  ).toFixed(2);

  return (
    <div className="card-container">
      <div className="card">
        <div className="card-content">
          <p className="card-title">Income</p>
          <p className="card-amount income">₹{income}</p>
        </div>
      </div>
      <div className="card">
        <div className="card-content">
          <p className="card-title">Expense</p>
          <p className="card-amount expense">₹{expense}</p>
        </div>
      </div>
    </div>
  );
};

export default ExpenseCard;
