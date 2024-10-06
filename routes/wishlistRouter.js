const express = require('express');
const router = express.Router();
const {
    getWishlist,
    addBookToWishlist,
    removeBookFromWishlist
} = require('../controllers/wishlistControllers');
const requireAuth = require('../middleware/requireAuth');

// GET /wishlist
router.get('/', requireAuth, getWishlist);

// POST /wishlist/add
router.post('/add', requireAuth, addBookToWishlist);

// DELETE /wishlist/remove (Remove the book completely)
router.delete('/remove', requireAuth, removeBookFromWishlist);

module.exports = router;