import React, { useState } from 'react';
import axios from 'axios';

const TransactionForm = ({ setTransactions }) => {
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    date: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://expense-trackker.onrender.com/api/transactions', formData);
      setTransactions((prev) => [...prev, response.data]);
      setFormData({ amount: '', description: '', date: '' }); // Clear form
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mb-4">
      <h2>Add Transaction</h2>
      <form onSubmit={handleSubmit} className="bg-light p-3 rounded">
        <div className="mb-3">
          <label htmlFor="amount" className="form-label">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            className="form-control"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            className="form-control"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            className="form-control"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Transaction</button>
      </form>
    </div>
  );
};

export default TransactionForm;
