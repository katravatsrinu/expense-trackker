import React, { useState } from 'react';
import axios from 'axios';

const BudgetForm = ({ fetchBudgets }) => {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category || !amount) return;

    const month = new Date().toLocaleString('default', { month: 'short' });

    try {
      await axios.post(`https://expense-trackker.onrender.com/api/budgets/${month}`, {
        category,
        amount: parseFloat(amount),
      });

      setCategory('');
      setAmount('');
      fetchBudgets(); // refresh chart
    } catch (error) {
      console.error('Error submitting budget:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h4>Set Monthly Budget</h4>
      <div className="row">
        <div className="col-md-4 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="col-md-4 mb-2">
          <input
            type="number"
            className="form-control"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="col-md-4 mb-2">
          <button className="btn btn-primary w-100">Add / Update Budget</button>
        </div>
      </div>
    </form>
  );
};

export default BudgetForm;
