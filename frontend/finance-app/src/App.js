import "./App.css";
import TransactionList from "./components/TransactionList";
import TransactionForm from "./components/TransactionForm";
import { useState } from "react";

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleTransactionAdded = () => {
    setRefreshKey((oldKey) => oldKey + 1);
  };
  return (
    <div className="App">
      <h1>Finance App</h1>
      <TransactionForm onTransactionAdded={handleTransactionAdded} />
      <TransactionList refreshKey={refreshKey} />
    </div>
  );
}

export default App;
