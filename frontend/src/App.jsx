import React, { useState, useEffect } from 'react';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import MonthlyChart from './components/MonthlyChart';
import axios from 'axios';

const App = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/transactions');
        setTransactions(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTransactions();
  }, []);

  return (
    <div className="container">
      <h1 className="text-center my-4">Personal Finance Visualizer</h1>
      <TransactionForm setTransactions={setTransactions} />
      <TransactionList transactions={transactions} setTransactions={setTransactions} />
      <MonthlyChart transactions={transactions} />
    </div>
  );
};

export default App;
