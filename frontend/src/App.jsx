import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import SummaryCards from './components/SummaryCards';
import CategoryPieChart from './components/CategoryPieChart';

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  const fetchTransactions = async () => {
    const res = await axios.get('https://expense-trackker.onrender.com/api/transactions');
    setTransactions(res.data);
  };

  const fetchCategoryBreakdown = async () => {
    const res = await axios.get('https://expense-trackker.onrender.com/api/transactions/by-category');
    setCategoryData(res.data);
  };

  useEffect(() => {
    fetchTransactions();
    fetchCategoryBreakdown();
  }, []);

  useEffect(() => {
    fetchCategoryBreakdown();
  }, [transactions]);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Personal Finance Visualizer</h1>
      <TransactionForm fetchTransactions={fetchTransactions} />
      <SummaryCards transactions={transactions} />
      <CategoryPieChart data={categoryData} />
      <TransactionList transactions={transactions} setTransactions={setTransactions} fetchTransactions={fetchTransactions} />
    </div>
  );
};

export default App;
