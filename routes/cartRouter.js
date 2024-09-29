const express = require('express');
const router = express.Router();
const {
  getCart,
  addBookToCart,
  reduceBookQuantity,
  removeBookFromCart
} = require('../controllers/cartControllers');
const requireAuth = require('../middleware/requireAuth');

// GET /cart
router.get('/', requireAuth, getCart);

// POST /cart/add
router.post('/add', requireAuth, addBookToCart);

// POST /cart/reduce (Reduce book quantity by 1)
router.post('/reduce', requireAuth, reduceBookQuantity);

// DELETE /cart/remove (Remove the book completely)
router.post('/remove', requireAuth, removeBookFromCart);

module.exports = router;