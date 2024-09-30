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
  createBook,
  updateBook,
  deleteBook,
  getReviewsByBookId,
} = require('../controllers/bookControllers');
// const requireAuth = require('../middleware/requireAuth');
// const requireAdmin = require('../middleware/requireAdmin');

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

// require auth with admin account for the rest of operations (will be uncommented after development)
// router.use(requireAuth, requireAdmin);

// POST /books
router.post('/', createBook);

// PATCH /books/:bookId
router.patch('/:bookId', updateBook);

// DELETE /books/:bookId
router.delete('/:bookId', deleteBook);

module.exports = router;