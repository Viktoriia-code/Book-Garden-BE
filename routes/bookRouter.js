const express = require('express');
const router = express.Router();
const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} = require('../controllers/bookControllers');

/*const {
  middleware3,
  middleware4,
  middleware5,
  middlewareNoNext,
} = require('../middleware/customMiddlewares');  middleware instance */ 

//router.use(middleware3);

// GET /books
router.get('/', getAllBooks);

// POST /books
router.post('/', createBook);

// GET /books/:bookId
router.get('/:bookId', getBookById);

// PUT /books/:bookId
router.put('/:bookId', updateBook);

// DELETE /books/:bookId
router.delete('/:bookId', deleteBook);

module.exports = router;