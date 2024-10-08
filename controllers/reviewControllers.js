const Review = require("../models/reviewModel");
const Book = require("../models/bookModel");
const mongoose = require("mongoose");

// GET /reviews
const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find({}).sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve reviews" });
  }
};

// POST /reviews
const createReview = async (req, res) => {
  try {
    const newReview = await Review.create({ ...req.body });
    res.status(201).json(newReview);
  } catch (error) {
    res.status(400).json({ message: "Failed to create review", error: error.message });
  }
};

// GET /reviews/user/:userId
const getReviewsByUserId = async (req, res) => {
  const { userId } = req.params;

  // Validate the user ID
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    // Check if the userId in the params matches the authenticated user's ID
    if (req.user._id.toString() !== userId) {
      return res.status(403).json({ message: "You are not allowed to see other users' reviews list" });
    }

    // Find all reviews associated with the given user ID
    const reviews = await Review.find({ user: userId }).populate('book', 'title author');

    if (reviews.length > 0) {
      res.status(200).json(reviews);
    } else {
      res.status(404).json({ message: "The user doesn't have reviews yet." });
    }
  } catch (error) {
    console.error("Error retrieving reviews:", error.message);
    res.status(500).json({ message: "Failed to retrieve reviews", error: error.message });
  }
};

// PATCH /reviews/:reviewId
const updateReview = async (req, res) => {
  const { reviewId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(reviewId)) {
    return res.status(400).json({ message: "Invalid review ID" });
  }

  try {
    const existingReview = await Review.findById(reviewId);
    if (!existingReview) {
      return res.status(404).json({ message: "Review not found" });
    }

    const updatedReview = await Review.findOneAndUpdate(
      { _id: reviewId },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    const book = await Book.findById(existingReview.book);
    if (book) {
      const reviews = await Review.find({ book: book._id });

      const totalSum = reviews.reduce((acc, currReview) => acc + currReview.rating, 0);
      const newAverageRating = reviews.length > 0 ? (totalSum / reviews.length).toFixed(1) : '0.0';

      book.rating = parseFloat(newAverageRating);
      await book.save();
    }

    res.status(200).json(updatedReview);
  } catch (error) {
    res.status(500).json({ message: "Failed to update review" });
  }
};

// DELETE /reviews/:reviewId
const deleteReview = async (req, res) => {
  const { reviewId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(reviewId)) {
    return res.status(400).json({ message: "Invalid review ID" });
  }

  try {
    const deletedReview = await Review.findOneAndDelete({ _id: reviewId });

    if (!deletedReview) {
      return res.status(404).json({ message: "Review not found" });
    }

    const book = await Book.findById(deletedReview.book);
    if (book) {
      const reviews = await Review.find({ book: deletedReview.book });

      const totalSum = reviews.reduce((acc, currReview) => acc + currReview.rating, 0);
      const newAverageRating = reviews.length > 0 ? (totalSum / reviews.length).toFixed(1) : '0.0';

      book.rating = parseFloat(newAverageRating);
      await book.save();
    }

    res.status(200).json({ message: "Review deleted successfully" });

  } catch (error) {
    console.error('Error deleting review:', error.message);
    res.status(500).json({ message: "Failed to delete review" });
  }
};

module.exports = {
  getAllReviews,
  getReviewsByUserId,
  createReview,
  updateReview,
  deleteReview,
};