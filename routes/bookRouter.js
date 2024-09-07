const express = require('express');
const router = express.Router();
const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} = require('../controllers/bookControllers');

const {
  middleware3,
  middleware4,
  middleware5,
  middlewareNoNext,
} = require('../middleware/customMiddlewares');

router.use(middleware3);

// GET /books
router.get('/', getAllBooks);


router.use(middleware4);

// POST /books
router.post('/', createBook);

// GET /books/:bookId
router.get('/:bookId', middleware5, getBookById);

// PUT /books/:bookId
router.put('/:bookId', updateBook);

// DELETE /books/:bookId
router.delete('/:bookId', deleteBook);

module.exports = router;