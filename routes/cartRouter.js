const express = require('express');
const router = express.Router();
const {
  getCart,
  addBookToCart,
  removeBookFromCart
} = require('../controllers/cartControllers');
const requireAuth = require('../middleware/requireAuth');

// GET /cart
router.get('/', requireAuth, getCart);

// POST /cart/add
router.post('/add', requireAuth, addBookToCart);

// DELETE /cart/remove
router.post('/remove', requireAuth, removeBookFromCart);

module.exports = router;