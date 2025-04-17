const express = require('express');
const router = express.Router();
const { setBudget, getBudgetsByMonth } = require('../controllers/budgetController');

router.post('/', setBudget);
router.get('/:month', getBudgetsByMonth);

module.exports = router;
