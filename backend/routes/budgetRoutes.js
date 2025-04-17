const express = require('express');
const Budget = require('../models/Budget'); // Assuming you have a Budget model

const router = express.Router();

// POST route to create or update budget for a given month
router.post('/:month', async (req, res) => {
  const { category, amount } = req.body;
  const { month } = req.params;

  try {
    const existingBudget = await Budget.findOne({ month, category });

    if (existingBudget) {
      // Update the existing budget
      existingBudget.amount = amount;
      await existingBudget.save();
      return res.status(200).json(existingBudget);
    }

    // Create a new budget
    const newBudget = new Budget({
      category,
      amount,
      month,
    });

    await newBudget.save();
    res.status(201).json(newBudget);
  } catch (error) {
    console.error('Error while saving budget:', error);
    res.status(500).json({ message: 'Error creating or updating budget', error });
  }
});

// GET route to fetch budgets for a specific month
router.get('/:month', async (req, res) => {
  const { month } = req.params;

  try {
    const budgets = await Budget.find({ month });
    res.status(200).json(budgets);
  } catch (error) {
    console.error('Error fetching budgets:', error);
    res.status(500).json({ message: 'Error fetching budgets', error });
  }
});

module.exports = router;
