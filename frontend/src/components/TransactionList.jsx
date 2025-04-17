import React, { useState } from 'react';
import axios from 'axios';

const TransactionList = ({ transactions, setTransactions }) => {
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [editForm, setEditForm] = useState({
    description: '',
    amount: '',
    date: '',
  });

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/transactions/${id}`);
      setTransactions((prev) => prev.filter((t) => t._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const openEditModal = (transaction) => {
    setEditingTransaction(transaction);
    setEditForm({
      description: transaction.description,
      amount: transaction.amount,
      date: transaction.date.slice(0, 10), // format to yyyy-mm-dd
    });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8080/api/transactions/${editingTransaction._id}`,
        {
          ...editForm,
          amount: parseFloat(editForm.amount),
        }
      );
      setTransactions((prev) =>
        prev.map((t) =>
          t._id === editingTransaction._id ? response.data : t
        )
      );
      setEditingTransaction(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mb-4">
      <h2>Transaction List</h2>
      <ul className="list-group">
        {transactions.map((transaction) => (
          <li
            key={transaction._id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <h5>{transaction.description}</h5>
              <small>{new Date(transaction.date).toLocaleDateString()}</small>
            </div>
            <div>
              <span className="badge bg-success me-2">{transaction.amount} /-</span>
              <button
                className="btn btn-primary btn-sm me-1"
                onClick={() => openEditModal(transaction)}
                data-bs-toggle="modal"
                data-bs-target="#editModal"
              >
                Edit
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(transaction._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Edit Modal */}
      {editingTransaction && (
        <div
          className="modal fade"
          id="editModal"
          tabIndex="-1"
          aria-labelledby="editModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <form className="modal-content" onSubmit={handleEditSubmit}>
              <div className="modal-header">
                <h5 className="modal-title" id="editModalLabel">Edit Transaction</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setEditingTransaction(null)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label>Description</label>
                  <input
                    type="text"
                    className="form-control"
                    name="description"
                    value={editForm.description}
                    onChange={handleEditChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label>Amount</label>
                  <input
                    type="number"
                    className="form-control"
                    name="amount"
                    value={editForm.amount}
                    onChange={handleEditChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label>Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="date"
                    value={editForm.date}
                    onChange={handleEditChange}
                    required
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={() => setEditingTransaction(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-success" data-bs-dismiss="modal">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionList;
