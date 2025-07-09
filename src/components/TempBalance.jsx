import React from "react";
import "../css/Balance.css";

const TempBalance = ({ transactions }) => {
  const amount = transactions
    .filter((t) => t && typeof t.amount === "number") // only valid transactions
    .map((transaction) => transaction.amount);

  const total = amount.reduce((acc, item) => acc + item, 0).toFixed(2);

  return (
    <div className="balance-container">
      <p className="balance-text">Current Balance</p>
      <p className="balance-amount">₹{total}</p>
    </div>
  );
};

export default TempBalance;
