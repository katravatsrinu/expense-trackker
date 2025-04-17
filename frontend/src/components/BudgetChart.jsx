import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const BudgetChart = ({ transactions }) => {
  const [budgetData, setBudgetData] = useState([]);

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const res = await axios.get("https://expense-trackker.onrender.com/api/budgets");
        const budgets = res.data;

        const spendingByCategory = {};
        transactions.forEach((t) => {
          if (!spendingByCategory[t.category]) {
            spendingByCategory[t.category] = 0;
          }
          spendingByCategory[t.category] += t.amount;
        });

        const combinedData = budgets.map((b) => ({
          category: b.category,
          budget: b.amount,
          spent: spendingByCategory[b.category] || 0,
        }));

        setBudgetData(combinedData);
      } catch (err) {
        console.error("Error fetching budgets:", err);
      }
    };

    fetchBudgets();
  }, [transactions]);

  return (
    <div className="mb-4">
      <h2>Budget vs Actual Spending</h2>
      {budgetData.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={budgetData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="budget" fill="#8884d8" name="Budget" />
            <Bar dataKey="spent" fill="#82ca9d" name="Spent" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p>No budget data available.</p>
      )}
    </div>
  );
};

export default BudgetChart;
