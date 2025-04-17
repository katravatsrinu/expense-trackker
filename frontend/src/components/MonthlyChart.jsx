import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer
} from 'recharts';
import axios from 'axios';

const MonthlyChart = () => {
  const [chartData, setChartData] = useState([]);

  const months = [
    '', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://expense-trackker.onrender.com/api/transactions/by-month');
        const formatted = res.data.map(item => ({
          month: months[item.month],
          expense: Number(item.total.toFixed(2))
        }));
        setChartData(formatted);
      } catch (err) {
        console.error('Error fetching monthly data:', err.message);
      }
    };

    fetchData();
  }, []);

  if (chartData.length === 0) {
    return <p className="text-muted">No monthly expense data available.</p>;
  }

  return (
    <div className="mb-4 card p-3 shadow-sm">
      <h4 className="mb-3">Monthly Expenses</h4>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="expense" fill="#0d6efd" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyChart;
