const Transaction = require('../models/Transaction');

exports.createTransaction = async (req, res) => {
    try {
        const newTransaction = new Transaction(req.body);
        await newTransaction.save();
        res.status(201).json(newTransaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find().sort({ date: -1 });
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateTransaction = async (req, res) => {
    try {
        const updated = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteTransaction = async (req, res) => {
    try {
        await Transaction.findByIdAndDelete(req.params.id);
        res.json({ message: 'Transaction deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Stage 2: Added controller to fetch aggregated category-wise expense
exports.getByCategory = async (req, res) => {
    try {
      const transactions = await Transaction.find();
      const categoryTotals = {};
  
      transactions.forEach((tx) => {
        const category = tx.category || 'Uncategorized';
        categoryTotals[category] = (categoryTotals[category] || 0) + Number(tx.amount);
      });
  
      res.json(categoryTotals);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  
  