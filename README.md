Personal Finance Visualizer
------------------------------------------
A modern web application to track expenses, visualize spending, set category-wise budgets, and compare them with actual expenditures.

Features
=> Add income and expense transactions
=> View monthly total income, expenses, and balance
=> Get category-wise breakdown in pie chart
=> Set monthly budgets for different categories
=> Visualize budget vs actual spending in bar chart
=> Responsive design and interactive charts

Technologies Used
=> Frontend: React, Recharts, Bootstrap, Shadcn/ui
=> Backend: Node.js, Express.js, MongoDB
=> Hosting: Render.com

Folder Structure
=> client/ – React frontend
=> server/ – Node.js backend

Setup Instructions
Backend
=> Navigate to server folder
=> Run npm install to install dependencies
=> Create .env file with MONGO_URI and PORT
=> Run npm start to start the backend

Frontend
=> Navigate to client folder
=> Run npm install to install dependencies
=> Run npm start to launch frontend

API Endpoints
=> POST /api/transactions – Add a new transaction
=> GET /api/transactions – Fetch all transactions
=> GET /api/transactions/by-category – Get category-wise totals
=> GET /api/budgets/:month – Get all budgets for a month
=> POST /api/budgets/:month – Add or update budget for a month

Project Stages
Stage 1: Basic Tracking
=> Add transactions with category, amount, type, and date
=> Visualize monthly expenses/income

Stage 2: Categorization & Breakdown
=> Show category-wise totals in pie chart
=> Show summary cards for totals

Stage 3: Budgeting
=> Set monthly budgets for categories
=> Compare budgets vs actual expenses

Deployment
=> Backend hosted on Render: https://expense-trackker.onrender.com
=> Frontend can be deployed via Vercel, Netlify, or your preferred provider