import React, { useState } from "react";
import axios from "axios";

function TransactionForm(props) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const transaction = {
      description: description,
      amount: parseFloat(amount),
      date: date,
      type: type,
    };

    axios
      .post("http://localhost:8080/api/transactions", transaction)
      .then((response) => {
        setDescription("");
        setAmount("");
        setDate("");
        setType("");
        props.onTransactionAdded();
      })
      .catch((error) => {
        console.error("Error creating transaction:", error);
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow mb-6"
    >
      <h2 className="text-2xl font-bold mb-4">New Transaction</h2>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Amount:</label>
          <input
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Type:</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select...</option>
            <option value="INCOME">Income</option>
            <option value="EXPENSE">Expense</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="mt-4 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
      >
        Add Transaction
      </button>
    </form>
  );
}

export default TransactionForm;
