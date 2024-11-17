const express = require('express');
const { addBook, getBooks, updateBook, deleteBook } = require('../controllers/bookController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, addBook);
router.get('/', getBooks);
router.put('/:id', authMiddleware, updateBook);
router.delete('/:id', authMiddleware, deleteBook);
router.get('/search', searchBooks);

module.exports = router;
