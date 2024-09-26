const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUserProfile,
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  getUserFavorites,
  addFavoriteBook,
  removeFavoriteBook
} = require('../controllers/userControllers');
const User = require('../models/userModel');
const requireAuth = require('../middleware/requireAuth');
//const requireAdmin = require('../middleware/requireAdmin');

// GET /users
// router.get('/', requireAuth, requireAdmin, getAllUsers); <- works for auth admin account only, this line will be uncommented once the developemtn will be finished
router.get('/', getAllUsers);

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

// GET /users/:userId/favorites
router.get('/:userId/favorites', requireAuth, getUserFavorites);

// POST /users/:userId/favorites
router.post('/:userId/favorites', requireAuth, addFavoriteBook);

// DELETE /users/:userId/favorites
router.delete('/:userId/favorites', requireAuth, removeFavoriteBook);

module.exports = router;