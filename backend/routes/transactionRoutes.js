const express = require('express');
const router = express.Router();
const {
    createTransaction,
    getTransactions,
    updateTransaction,
    deleteTransaction,
    getCategorySummary,
    getMonthlySummary,
} = require('../controllers/transactionController');

router.post('/', createTransaction);
router.get('/', getTransactions);
router.put('/:id', updateTransaction);
router.delete('/:id', deleteTransaction);
router.get('/by-month', getMonthlySummary);

router.get('/by-category', getCategorySummary);module.exports = router;

module.exports=router;