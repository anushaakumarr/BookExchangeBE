const express = require('express');
const { sendRequest, updateRequest, getUserTransactions } = require('../controllers/exchangeController');
const router = express.Router();

router.post('/', sendRequest);
router.put('/:id', updateRequest);
router.get('/transactions', getUserTransactions);

module.exports = router;
