const express = require('express');
const { getTransactionHistory, cancelExchange } = require('../controllers/transactionController');
const router = express.Router();

router.get('/history', getTransactionHistory);
router.put('/cancel/:id', cancelExchange);

module.exports = router;
