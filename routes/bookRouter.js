const express = require('express');
const router = express.Router();
const {
  getAllBooks,
  getBookById,
  getNewBooks,
  getTopBooks,
  getBooksByGenre,
  getBooksBySearch,
  getUniqueByFieldName,
  getReviewsByBookId,
} = require('../controllers/bookControllers');


// GET /books
router.get('/', getAllBooks);

// GET /books/new
router.get('/new', getNewBooks);

// GET /books/topsellers
router.get('/topsellers', getTopBooks);

// GET /books/:bookId/reviews
router.get('/:bookId/reviews', getReviewsByBookId);

// GET /books/:bookId
router.get('/:bookId', getBookById);

// GET /books/genre/:genre
router.get('/genre/:genre', getBooksByGenre);

// GET /books/search/:searchQuery
router.get('/search/:searchQuery', getBooksBySearch);

// GET /books/unique/:fieldName
router.get('/unique/:fieldName', getUniqueByFieldName);

module.exports = router;