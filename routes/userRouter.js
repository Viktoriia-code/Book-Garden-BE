const express = require('express');
const router = express.Router();

const {
  getAllUsers,
  getUserById,
  signupUser,
  loginUser,
  updateUser,
  deleteUser,
} = require('../controllers/userControllers');

const User = require('../models/userModel');

// GET /users
router.get('/', getAllUsers);

// POST /users/signup
router.post('/signup', signupUser);

// POST /users/login
router.post('/login', loginUser);

// GET /users/:userId
router.get('/:userId', getUserById);

// PUT /users/:userId
router.put('/:userId', updateUser);

// DELETE /users/:userId
router.delete('/:userId', deleteUser);

module.exports = router;