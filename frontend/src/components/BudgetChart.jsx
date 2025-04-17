import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const BudgetChart = ({ budgets, transactions }) => {
  const categoryTotals = transactions.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});

  const data = budgets.map(b => ({
    category: b.category,
    budget: b.amount,
    spent: categoryTotals[b.category] || 0,
  }));

  return (
    <div>
      <h4 className="mt-5">Budget vs Actual Spending</h4>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="budget" fill="#8884d8" name="Budget" />
          <Bar dataKey="spent" fill="#82ca9d" name="Spent" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BudgetChart;
