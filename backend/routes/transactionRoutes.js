const express = require('express');
const router = express.Router();
const {
    createTransaction,
    getTransactions,
    updateTransaction,
    deleteTransaction,
    getByCategory
} = require('../controllers/transactionController');

router.post('/', createTransaction);
router.get('/', getTransactions);
router.put('/:id', updateTransaction);
router.delete('/:id', deleteTransaction);
router.get('/by-category', getByCategory);

module.exports = router;
