import React, { useState } from 'react';
import axios from 'axios';

const BudgetForm = ({ fetchBudgets }) => {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category || !amount) return;

    try {
      const month = new Date().toLocaleString('default', { month: 'short' });
      // Use the correct endpoint with the month in the URL
      const response = await axios.post(
        `https://expense-trackker.onrender.com/api/budgets/${month}`, // Include month in the URL
        {
          category,
          amount: parseFloat(amount),
          month, // You can still send month in the body, but the important part is the URL
        }
      );
      console.log('Budget Added:', response.data); // Log successful response
      setCategory('');
      setAmount('');
      fetchBudgets();
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h4>Set Monthly Budget</h4>
      <div className="row">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <input
            type="number"
            className="form-control"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <button className="btn btn-primary w-100">Add / Update Budget</button>
        </div>
      </div>
    </form>
  );
};

export default BudgetForm;
