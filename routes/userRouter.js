const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
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

// GET /users/:userId
router.get('/:userId', requireAuth, getUserById);

// PATCH /users/:userId
router.patch('/:userId', requireAuth, updateUser);

// DELETE /users/:userId
router.delete('/:userId', requireAuth, deleteUser);

module.exports = router;