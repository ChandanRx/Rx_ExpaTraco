import React, { useState, useEffect } from "react";
import "./App.css";
import Balance from "./Components/Balance";
import ExpenseCard from "./Components/ExpenseCard";
import Transactions from "./Components/Transactions";
import Graph from "./Components/Graph1";  // Import the Graph component
import { DollarSign } from "lucide-react";

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
      <div className="funky-title">
        <DollarSign className="title-icon" />
        <h1>Expense Tracker</h1>
      </div>
      <div className="main-container">
        <div className="left-section">
          <Balance transactions={transactions} />
          <ExpenseCard transactions={transactions} />
          <Graph transactions={transactions} />
        </div>
        <div className="right-section">
          <Transactions transactions={transactions} setTransactions={setTransactions} />
        </div>
      </div>
    </div>
  );
}

export default App;
