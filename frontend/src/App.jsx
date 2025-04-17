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

  const currentMonth = new Date().toLocaleString('default', { month: 'short' });

  // Stage 1
  const fetchTransactions = async () => {
    try {
      const res = await axios.get("https://expense-trackker.onrender.com/api/transactions");
      setTransactions(res.data);
    } catch (err) {
      console.error("Failed to fetch transactions:", err.message);
    }
  };

  // Stage 2
  const fetchCategoryBreakdown = async () => {
    try {
      const res = await axios.get("https://expense-trackker.onrender.com/api/transactions/by-category");
      setCategoryData(res.data);
    } catch (err) {
      console.error("Failed to fetch category data:", err.message);
    }
  };

  // ✅ Stage 3: Fetch Budgets for current month
  const fetchBudgets = async () => {
    try {
      const res = await axios.get(`https://expense-trackker.onrender.com/api/budgets/${currentMonth}`);
      setBudgets(res.data);
    } catch (err) {
      console.error("Failed to fetch budgets:", err.message);
    }
  };

  useEffect(() => {
    fetchTransactions();
    fetchCategoryBreakdown();
    fetchBudgets();
  }, []);

  useEffect(() => {
    fetchCategoryBreakdown();
  }, [transactions]);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Personal Finance Visualizer</h1>

      <TransactionForm fetchTransactions={fetchTransactions} />
      <MonthlyChart transactions={transactions} />
      <TransactionList
        transactions={transactions}
        setTransactions={setTransactions}
        fetchTransactions={fetchTransactions}
      />

      <SummaryCards transactions={transactions} />
      <CategoryPieChart data={categoryData} />

      <BudgetForm fetchBudgets={fetchBudgets} />
      <BudgetChart budgets={budgets} transactions={transactions} />
    </div>
  );
};

export default App;
