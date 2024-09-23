const express = require('express');
const router = express.Router();
const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} = require('../controllers/bookControllers');

// GET /books
router.get('/', getAllBooks);

// POST /books
router.post('/', createBook);

// GET /books/:bookId
router.get('/:bookId', getBookById);

// PATCH /books/:bookId
router.patch('/:bookId', updateBook);

// DELETE /books/:bookId
router.delete('/:bookId', deleteBook);

module.exports = router;