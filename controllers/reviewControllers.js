const Review = require("../models/reviewModel");
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
    const reviews = await Review.find({ user: userId });

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
    const updatedReview = await Review.findOneAndUpdate(
      { _id: reviewId },
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (updatedReview) {
      res.status(200).json(updatedReview);
    } else {
      res.status(404).json({ message: "Review not found" });
    }
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
    if (deletedReview) {
      res.status(200).json({ message: "Review deleted successfully" });
    } else {
      res.status(404).json({ message: "Review not found" });
    }
  } catch (error) {
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