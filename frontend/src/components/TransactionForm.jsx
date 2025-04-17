// components/TransactionForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

const TransactionForm = ({ fetchTransactions }) => {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    date: '',
    category: 'Others',
  });

  const categories = ['Food', 'Rent', 'Utilities', 'Transport', 'Entertainment', 'Others'];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.description || !formData.amount || !formData.date) return;

    try {
      await axios.post('https://expense-trackker.onrender.com/api/transactions', formData);
      fetchTransactions();
      setFormData({ description: '', amount: '', date: '', category: 'Others' });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="mb-4" onSubmit={handleSubmit}>
      <div className="mb-2">
        <input
          type="text"
          className="form-control"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      <div className="mb-2">
        <input
          type="number"
          className="form-control"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
        />
      </div>
      <div className="mb-2">
        <input
          type="date"
          className="form-control"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
      </div>
      <div className="mb-2">
        <select className="form-select" name="category" value={formData.category} onChange={handleChange}>
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <button type="submit" className="btn btn-primary">Add Transaction</button>
    </form>
  );
};

export default TransactionForm;
