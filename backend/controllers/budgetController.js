const Budget = require('../models/Budget');

// Create or update a budget
exports.setBudget = async (req, res) => {
  const { category, amount, month } = req.body;

  try {
    const existing = await Budget.findOne({ category, month });

    if (existing) {
      existing.amount = amount;
      await existing.save();
      return res.json(existing);
    }

    const budget = new Budget({ category, amount, month });
    await budget.save();
    res.status(201).json(budget);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all budgets for a month
exports.getBudgetsByMonth = async (req, res) => {
  const { month } = req.params;

  try {
    const budgets = await Budget.find({ month });
    res.json(budgets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
