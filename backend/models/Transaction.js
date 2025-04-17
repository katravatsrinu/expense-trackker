const mongoose = require('mongoose');

// Stage 2: Added category field with enum validation
const transactionSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Food', 'Rent', 'Utilities', 'Transport', 'Entertainment', 'Others'],
    default: 'Others',
  },
});

module.exports = mongoose.model('Transaction', transactionSchema);