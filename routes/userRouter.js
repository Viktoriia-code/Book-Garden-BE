const express = require('express');
const router = express.Router();
const {
  getUserProfile,
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  updateUserPassword,
  getUserFavorites,
  addFavoriteBook,
  removeFavoriteBook
} = require('../controllers/userControllers');
const requireAuth = require('../middleware/requireAuth');


// POST /users/register
router.post('/register', registerUser);

// POST /users/login
router.post('/login', loginUser);

// GET /users/profile
router.get('/:userId', requireAuth, getUserProfile);

// PATCH /users/:userId
router.patch('/:userId', requireAuth, updateUser);

// DELETE /users/:userId
router.delete('/:userId', requireAuth, deleteUser);

// PATCH /users/:userId/password
router.patch('/:userId/password', requireAuth, updateUserPassword);

// GET /users/favorites/:userId
router.get('/favorites/:userId', requireAuth, getUserFavorites);

// POST /users/favorites
router.post('/favorites', requireAuth, addFavoriteBook);

// DELETE /users/favorites/:userId/:bookId
router.delete('/favorites/:userId/:bookId', requireAuth, removeFavoriteBook);

module.exports = router;