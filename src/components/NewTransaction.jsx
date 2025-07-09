import React, { useState } from "react";
import "../css/NewTransaction.css";

const NewTransaction = ({ setTransactions }) => {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [transactionType, setTransactionType] = useState("expense");

  const addTransaction = () => {
    const numericAmount = parseFloat(amount);

    if (!text || isNaN(numericAmount) || !transactionType) return;

    const transaction = {
      id: Math.floor(Math.random() * 10000000),
      text,
      amount:
        transactionType === "expense"
          ? -Math.abs(numericAmount)
          : Math.abs(numericAmount),
      date: selectedDate,
    };

    setTransactions((prev) => [transaction, ...prev]);
    setText("");
    setAmount("");
    setSelectedDate(new Date().toISOString().split("T")[0]);
    setTransactionType("expense");
  };

  return (
    <div className="transaction-form">
      <h2>New Transaction</h2>
      <input
        type="text"
        placeholder="Enter expense"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <div className="row-container">
        <select
          value={transactionType}
          onChange={(e) => setTransactionType(e.target.value)}
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          max={new Date().toISOString().split("T")[0]}
        />
      </div>
      <button onClick={addTransaction}>Add Transaction</button>
    </div>
  );
};

export default NewTransaction;
