import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const BudgetChart = ({ transactions }) => {
  const [budgets, setBudgets] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const res = await axios.get('https://expense-trackker.onrender.com/api/budgets');
        setBudgets(res.data);
      } catch (err) {
        console.error('Error fetching budgets:', err);
      }
    };

    fetchBudgets();
  }, []);

  useEffect(() => {
    if (!budgets.length || !transactions.length) return;

    const spendingMap = {};
    transactions.forEach(({ category, amount }) => {
      if (!category || isNaN(amount)) return;
      spendingMap[category] = (spendingMap[category] || 0) + amount;
    });

    const chartData = budgets.map(({ category, amount }) => ({
      category,
      Budget: amount,
      Actual: Number((spendingMap[category] || 0).toFixed(2))
    }));

    setData(chartData);
  }, [budgets, transactions]);

  return (
    <div className="mb-4">
      <h2>Budget vs Actual Spending</h2>
      {data.length === 0 ? (
        <p className="text-muted">No data to display</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Budget" fill="#82ca9d" />
            <Bar dataKey="Actual" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default BudgetChart;
