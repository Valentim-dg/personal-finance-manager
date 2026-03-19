import React, { useState, useEffect } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import Toast from "./Toast";
import ConfirmModal from "./ConfirmModal";
import TransactionFilters from "./TransactionFilters";

function TransactionList(props) {
  const [transactions, setTransactions] = useState([]);
  const [toast, setToast] = useState(null);
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    transactionId: null,
  });
  const [filters, setFilters] = useState({
    type: "",
    startDate: "",
    endDate: "",
    category: "",
  });

  useEffect(() => {
    let url = "http://localhost:8080/api/transactions";
    const params = new URLSearchParams();

    if (filters.type) params.append("type", filters.type);
    if (filters.startDate) params.append("startDate", filters.startDate);
    if (filters.endDate) params.append("endDate", filters.endDate);
    if (filters.category) params.append("categoryId", filters.category);

    if (params.toString()) {
      url = `http://localhost:8080/api/transactions/filter?${params.toString()}`;
    }

    axios
      .get(url)
      .then((response) => {
        setTransactions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
      });
  }, [props.refreshKey, filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleDeleteClick = (id) => {
    setConfirmModal({ isOpen: true, transactionId: id });
  };

  const handleConfirmDelete = () => {
    const id = confirmModal.transactionId;
    setConfirmModal({ isOpen: false, transactionId: null });

    axios
      .delete(`http://localhost:8080/api/transactions/${id}`)
      .then(() => {
        setTransactions(transactions.filter((t) => t.id !== id));
        showToast("Transaction deleted successfully!", "success");
      })
      .catch((error) => {
        console.error("Error deleting transaction:", error);
        showToast("Error deleting transaction. Please try again.", "error");
      });
  };

  const handleCancelDelete = () => {
    setConfirmModal({ isOpen: false, transactionId: null });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <ConfirmModal
        isOpen={confirmModal.isOpen}
        title="Delete Transaction"
        message="Are you sure you want to delete this transaction? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />

      <h2 className="text-2xl font-bold mb-4">Transactions</h2>
      <TransactionFilters onFilterChange={handleFilterChange} />
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
                  onClick={() => handleDeleteClick(transaction.id)}
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
