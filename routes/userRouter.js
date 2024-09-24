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

// GET /users
router.get('/', getAllUsers);

// POST /users/register
router.post('/register', registerUser);

// POST /users/login
router.post('/login', loginUser);

// GET /users/:userId
router.get('/:userId', getUserById);

// PATCH /users/:userId
router.patch('/:userId', updateUser);

// DELETE /users/:userId
router.delete('/:userId', deleteUser);

module.exports = router;