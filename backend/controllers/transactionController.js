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
// Get monthly expense summary
exports.getMonthlySummary = async (req, res) => {
    try {
      const summary = await Transaction.aggregate([
        {
          $group: {
            _id: { $month: { $toDate: "$date" } },
            total: { $sum: "$amount" }
          }
        },
        {
          $project: {
            month: '$_id',
            total: 1,
            _id: 0
          }
        },
        {
          $sort: { month: 1 }
        }
      ]);
      res.json(summary);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  


// Stage 2: Added controller to fetch aggregated category-wise expense
exports.getCategorySummary = async (req, res) => {
    try {
      const result = await Transaction.aggregate([
        {
          $group: {
            _id: "$category",
            total: { $sum: "$amount" }
          }
        }
      ]);
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  
  
  