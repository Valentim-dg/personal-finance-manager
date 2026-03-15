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

  const handleCategoryAdded = () => {
    setCategoryRefreshKey((oldKey) => oldKey + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            💰 Personal Finance Manager
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar - Categories */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <h2 className="text-2xl font-bold mb-4 text-indigo-600 flex items-center gap-2">
                📁 Categories
              </h2>
              <CategoryForm onCategoryAdded={handleCategoryAdded} />
              <div className="mt-6">
                <CategoryList refreshKey={categoryRefreshKey} />
              </div>
            </div>
          </div>

          {/* Main Area - Transactions */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <BalanceCard refreshKey={refreshKey} />
                <h2 className="text-2xl font-bold mb-4 text-green-600 flex items-center gap-2">
                  💵 Transactions
                </h2>
                <TransactionForm
                  onTransactionAdded={handleTransactionAdded}
                  categoryRefreshKey={categoryRefreshKey}
                />
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <TransactionList refreshKey={refreshKey} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
