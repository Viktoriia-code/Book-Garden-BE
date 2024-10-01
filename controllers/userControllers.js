const User = require("../models/userModel");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const SECRET="secretword";
const saltRounds = 10;

const createToken = (_id) => {
  return jwt.sign({ _id }, SECRET, { expiresIn: '3d' });
};

// GET /users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve users" });
  }
};

// POST /users/register
const registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.register(email, password)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({email, token, userId: user._id})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
};

// POST users/login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({email, token, userId: user._id});
  } catch (error) {
    res.status(400).json({error: error.message})
  }
};

// GET /users/:userId
const getUserProfile = async (req, res) => {
  const { userId } = req.params;

  try {
    // Check if the userId in the params matches the authenticated user's ID
    if (req.user._id.toString() !== userId) {
      return res.status(403).json({ message: "You are not authorized to view this profile" });
    }

    // Fetch the user profile by ID
    const user = await User.findById(userId);

    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// PATCH /users/:userId
const updateUser = async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update user" });
  }
};

// DELETE /users/:userId
const deleteUser = async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const deletedUser = await User.findOneAndDelete({ _id: userId });
    if (deletedUser) {
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user" });
  }
};

// GET /users/favorites/:userId
const getUserFavorites = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Check if the userId in the params matches the authenticated user's ID
    if (req.user._id.toString() !== userId) {
      return res.status(403).json({ message: "You are not authorized to view other user's favorites" });
    }

    const user = await User.findById(userId).populate('favorites'); // Populate the favorites with book data

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user.favorites);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// POST /users/favorites
const addFavoriteBook = async (req, res) => {
  try {
    const { userId } = req.body;
    const { bookId } = req.body;

    // Check if the userId in the params matches the authenticated user's ID
    if (req.user._id.toString() !== userId) {
      return res.status(403).json({ message: "You are not authorized to add favorites for other users" });
    }

    if (!bookId) {
      return res.status(400).json({ message: "Book ID is required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.favorites.includes(bookId)) {
      user.favorites.push(bookId);
      await user.save();
      return res.status(200).json({ message: "Book added to favorites", favorites: user.favorites });
    } else {
      return res.status(400).json({ message: "Book is already in favorites" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// DELETE /users/favorites/:userId/:bookId
const removeFavoriteBook = async (req, res) => {
  try {
    const { userId } = req.params;
    const { bookId } = req.params;

    // Check if the userId in the params matches the authenticated user's ID
    if (req.user._id.toString() !== userId) {
      return res.status(403).json({ message: "You are not authorized to delete favorites for other users" });
    }

    if (!bookId) {
      return res.status(400).json({ message: "Book ID is required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.favorites = user.favorites.filter(favId => favId.toString() !== bookId);
    await user.save();

    return res.status(200).json({ message: "Book removed from favorites", favorites: user.favorites });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserProfile,
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  getUserFavorites,
  addFavoriteBook,
  removeFavoriteBook,
};