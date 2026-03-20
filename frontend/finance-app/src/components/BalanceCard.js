import React, { useState, useEffect } from "react";
import axios from "axios";

function BalanceCard({ refreshKey }) {
  const [balance, setBalance] = useState({
    income: 0,
    expense: 0,
    balance: 0,
  });

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/transactions/balance")
      .then((response) => {
        setBalance(response.data);
      })
      .catch((error) => {
        console.error("Error fetching balance:", error);
      });
  }, [refreshKey]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Income Card */}
      <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl shadow-lg border border-green-200">
        <p className="text-sm text-green-700 font-medium mb-1">
          💰 Total Income
        </p>
        <p className="text-3xl font-bold text-green-600">
          ${balance.income.toFixed(2)}
        </p>
      </div>

      {/* Expense Card */}
      <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl shadow-lg border border-red-200">
        <p className="text-sm text-red-700 font-medium mb-1">
          💸 Total Expenses
        </p>
        <p className="text-3xl font-bold text-red-600">
          ${balance.expense.toFixed(2)}
        </p>
      </div>

      {/* Balance Card */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl shadow-lg border border-blue-200">
        <p className="text-sm text-blue-700 font-medium mb-1">
          💵 Current Balance
        </p>
        <p
          className={`text-3xl font-bold ${balance.balance >= 0 ? "text-blue-600" : "text-red-600"}`}
        >
          ${balance.balance.toFixed(2)}
        </p>
      </div>
    </div>
  );
}

export default BalanceCard;
