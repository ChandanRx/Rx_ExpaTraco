import React, { useState, useEffect } from "react";
import "./App.css";
import Balance from "./components/Balance";
import ExpenseCard from "./components/ExpenseCard";
import Transactions from "./components/Transactions";
import Graph1 from "./components/Graph1";  // Import the Graph component

function App() {
  const [transactions, setTransactions] = useState(() => {
    try {
      const saved = localStorage.getItem("transactions");
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed)
        ? parsed.filter(
            (t) =>
              t &&
              typeof t.text === "string" &&
              typeof t.amount === "number" &&
              typeof t.date === "string"
          )
        : [];
    } catch (e) {
      console.error("Invalid data in localStorage:", e);
      localStorage.removeItem("transactions");
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  return (
    <div className="App">
      <h1 className="app-header">Expense Tracker</h1>
      <div className="main-container">
        <div className="left-section">
          <Balance transactions={transactions} />
          <ExpenseCard transactions={transactions} />
          <Graph1 transactions={transactions} /> {/* Added Graph */}
        </div>
        <div className="right-section">
          <Transactions transactions={transactions} setTransactions={setTransactions} />
        </div>
      </div>
    </div>
  );
}

export default App;
