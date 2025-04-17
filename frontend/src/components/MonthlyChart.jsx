import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer
} from 'recharts';

const MonthlyChart = ({ transactions }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (!transactions || transactions.length === 0) return;

    const dataMap = {};

    transactions.forEach((transaction) => {
      if (!transaction.date || isNaN(transaction.amount)) return;

      const month = new Date(transaction.date).toLocaleString('default', { month: 'short' });

      if (dataMap[month]) {
        dataMap[month] += transaction.amount;
      } else {
        dataMap[month] = transaction.amount;
      }
    });

    const formatted = Object.keys(dataMap).map((month) => ({
      month,
      expense: Number(dataMap[month].toFixed(2))
    }));

    setChartData(formatted);
  }, [transactions]);

  if (chartData.length === 0) {
    return <p className="text-muted">No data to display</p>;
  }

  return (
    <div className="mb-4">
      <h2>Monthly Expenses</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="expense" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyChart;
