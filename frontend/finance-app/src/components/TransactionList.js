import React, { useState, useEffect } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import axios from "axios";

function TransactionList(props) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/transactions")
      .then((response) => {
        setTransactions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
      });
  }, [props.refreshKey]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      axios
        .delete(`http://localhost:8080/api/transactions/${id}`)
        .then(() => {
          setTransactions(transactions.filter((t) => t.id !== id));
        })
        .catch((error) => {
          console.error("Error deleting transaction:", error);
        });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Transactions</h2>
      <table className="w-full bg-white rounded-lg shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Description</th>
            <th className="p-3 text-left">Amount</th>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Type</th>
            <th className="p-3 text-left">Category</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id} className="border-b">
              <td className="p-3">{transaction.description}</td>
              <td className="p-3">${transaction.amount}</td>
              <td className="p-3">{transaction.date}</td>
              <td className="p-3">
                <span
                  className={
                    transaction.type === "INCOME"
                      ? "text-green-600 font-semibold"
                      : "text-red-600 font-semibold"
                  }
                >
                  {transaction.type}
                </span>
              </td>
              <td className="p-3">
                {transaction.category ? transaction.category.name : "-"}
              </td>
              <td className="p-3">
                <button
                  onClick={() => handleDelete(transaction.id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded transition"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionList;
