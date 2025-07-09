import React, { useState } from "react";

const Transactions = ({ transactions, setTransactions }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionType, setTransactionType] = useState("expense");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const inputStyle = {
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #00bfa5",
    backgroundColor: "#f0fcff",
    fontSize: "16px",
    color: "#004d40",
    flex: "1",
    minWidth: "180px",
    marginBottom: "10px",
  };

  const buttonStyle = {
    padding: "12px 20px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#00bfa5",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "10px",
  };

  const deleteButtonStyle = {
    background: "none",
    border: "none",
    fontSize: "18px",
    cursor: "pointer",
    color: "#888",
  };

  const addTransaction = () => {
    if (!text || !amount || !transactionType) return;

    const newTransaction = {
      id: Date.now(),
      text: text,
      amount:
        transactionType === "expense"
          ? -Math.abs(Number(amount))
          : Math.abs(Number(amount)),
      date,
    };

    setTransactions((prev) => [newTransaction, ...prev]);
    setText("");
    setAmount("");
    setTransactionType("expense");
    setDate(new Date().toISOString().split("T")[0]);
  };

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleDateChange = (e) => setSelectedDate(e.target.value);

  const filteredTransactions = transactions.filter((transaction) => {
    if (!transaction || typeof transaction.text !== "string") return false;

    const matchesSearch = transaction.text
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesDate = selectedDate === "" || transaction.date === selectedDate;

    return matchesSearch && matchesDate;
  });

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add New Transaction</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "30px" }}>
        <input
          type="text"
          placeholder="Description"
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={inputStyle}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={inputStyle}
        />
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <select
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value)}
            style={{ ...inputStyle, cursor: "pointer" }}
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            max={new Date().toISOString().split("T")[0]}
            style={inputStyle}
          />
        </div>
        <button style={buttonStyle} onClick={addTransaction}>
          Add Transaction
        </button>
      </div>

      <h2>Transaction History</h2>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search transactions"
          value={searchTerm}
          onChange={handleSearchChange}
          style={inputStyle}
        />
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          style={inputStyle}
        />
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "center" }}>
          <thead>
            <tr style={{ backgroundColor: "#d0f0e8", color: "#006d5b" }}>
              <th style={{ padding: "10px" }}>Description</th>
              <th style={{ padding: "10px" }}>Amount</th>
              <th style={{ padding: "10px" }}>Date</th>
              <th style={{ padding: "10px" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ padding: "10px" }}>No transactions found</td>
              </tr>
            ) : (
              filteredTransactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td style={{ padding: "10px" }}>{transaction.text}</td>
                  <td
                    style={{
                      padding: "10px",
                      color: transaction.amount > 0 ? "#2ecc71" : "#e74c3c",
                    }}
                  >
                    ₹{transaction.amount}
                  </td>
                  <td style={{ padding: "10px" }}>{transaction.date}</td>
                  <td style={{ padding: "10px" }}>
                    <button
                      style={deleteButtonStyle}
                      onClick={() =>
                        setTransactions(transactions.filter((t) => t.id !== transaction.id))
                      }
                    >
                      ❌
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
