import React from 'react';

const SummaryCards = ({ transactions }) => {
  const total = transactions.reduce((acc, t) => acc + parseFloat(t.amount), 0);
  const recent = transactions.slice(0, 3);

  return (
    <div className="row mb-4">
      <div className="col-md-4">
        <div className="card bg-success text-white">
          <div className="card-body">
            <h5>Total Expenses</h5>
            <h3>₹{total.toFixed(2)}</h3>
          </div>
        </div>
      </div>
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h5>Recent Transactions</h5>
            <ul className="list-group">
              {recent.map((item) => (
                <li key={item._id} className="list-group-item d-flex justify-content-between">
                  {item.description} <span className="text-danger">₹{item.amount}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;
