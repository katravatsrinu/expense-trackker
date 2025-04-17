import React, { useEffect, useState } from "react";
import axios from "axios";

// === Stage 1 Components ===
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import MonthlyChart from "./components/MonthlyChart";

// === Stage 2 Components ===
import SummaryCards from "./components/SummaryCards";
import CategoryPieChart from "./components/CategoryPieChart";

// === Stage 3 Components ===
import BudgetForm from "./components/BudgetForm";
import BudgetChart from "./components/BudgetChart";

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [budgets, setBudgets] = useState([]);

  // === Stage 1: Fetch all transactions ===
  const fetchTransactions = async () => {
    try {
      const res = await axios.get("https://expense-trackker.onrender.com/api/transactions");
      setTransactions(res.data);
    } catch (err) {
      console.error("Failed to fetch transactions:", err.message);
    }
  };

  // === Stage 2: Fetch category breakdown ===
  const fetchCategoryBreakdown = async () => {
    try {
      const res = await axios.get("https://expense-trackker.onrender.com/api/transactions/by-category");
      setCategoryData(res.data);
    } catch (err) {
      console.error("Failed to fetch category data:", err.message);
    }
  };

  // === Stage 3: Fetch budgets ===
  const fetchBudgets = async () => {
    try {
      const res = await axios.get("https://expense-trackker.onrender.com/api/budgets");
      setBudgets(res.data);
    } catch (err) {
      console.error("Failed to fetch budgets:", err.message);
    }
  };

  // === Initial fetch on load ===
  useEffect(() => {
    fetchTransactions();
    fetchCategoryBreakdown();
    fetchBudgets();
  }, []);

  // === Re-fetch category data when transactions change ===
  useEffect(() => {
    fetchCategoryBreakdown();
  }, [transactions]);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Personal Finance Visualizer</h1>

      {/* ===== Stage 1: Basic Transaction Tracking ===== */}
      <TransactionForm fetchTransactions={fetchTransactions} />
      <MonthlyChart transactions={transactions} />
      <TransactionList
        transactions={transactions}
        setTransactions={setTransactions}
        fetchTransactions={fetchTransactions}
      />

      {/* ===== Stage 2: Categories & Dashboard ===== */}
      <SummaryCards transactions={transactions} />
      <CategoryPieChart data={categoryData} />

      {/* ===== Stage 3: Budgeting ===== */}
      <BudgetForm fetchBudgets={fetchBudgets} />
      <BudgetChart transactions={transactions} budgets={budgets} />
    </div>
  );
};

export default App;
