import "./App.css";
import { useState } from "react";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import CategoryForm from "./components/CategoryForm";
import CategoryList from "./components/CategoryList";
import BalanceCard from "./components/BalanceCard";

function App() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [categoryRefreshKey, setCategoryRefreshKey] = useState(0);

  const handleTransactionAdded = () => {
    setRefreshKey((oldKey) => oldKey + 1);
  };

  const handleTransactionDeleted = () => {
    setRefreshKey((oldKey) => oldKey + 1);
  };

  const handleCategoryAdded = () => {
    setCategoryRefreshKey((oldKey) => oldKey + 1);
  };

  const handleCategoryDeleted = () => {
    setCategoryRefreshKey((oldKey) => oldKey + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Personal Finance Manager
              </h1>
              <p className="text-gray-600 text-sm mt-1">
                Track your income and expenses
              </p>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <div className="text-right">
                <p className="text-xs text-gray-500">Today</p>
                <p className="text-sm font-semibold text-gray-700">
                  {new Date().toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar - Transaction Form + Categories */}
          <div className="lg:col-span-1 space-y-6">
            {/* Transaction Form */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4 text-green-600 flex items-center gap-2">
                💵 New Transaction
              </h2>
              <TransactionForm
                onTransactionAdded={handleTransactionAdded}
                categoryRefreshKey={categoryRefreshKey}
              />
            </div>

            {/* Categories */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4 text-indigo-600 flex items-center gap-2">
                📁 Categories
              </h2>
              <CategoryForm onCategoryAdded={handleCategoryAdded} />
              <div className="mt-6">
                <CategoryList
                  refreshKey={categoryRefreshKey}
                  onCategoryDeleted={handleCategoryDeleted}
                />
              </div>
            </div>
          </div>

          {/* Main Area - Balance + Transactions */}
          <div className="lg:col-span-2 space-y-6">
            <BalanceCard refreshKey={refreshKey} />

            <div className="bg-white rounded-xl shadow-lg p-6">
              <TransactionList
                refreshKey={refreshKey}
                onTransactionDeleted={handleTransactionDeleted}
                categoryRefreshKey={categoryRefreshKey}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
