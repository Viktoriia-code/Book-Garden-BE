const Review = require("../models/reviewModel");

// GET /reviews
const getAllReviews = (req, res) => {
  const reviews = Review.getAll();
  res.json(reviews);
};

// POST /reviews
const createReview = (req, res) => {
  const newReview = Review.addOne({ ...req.body }); // Spread the req.body object

  if (newReview) {
    res.json(newReview);
  } else {
    // Handle error (e.g., failed to create user)
    res.status(500).json({ message: "Failed to create user" });
  }
};

// GET /reviews/:ReviewId
const getReviewById = (req, res) => {
  const reviewId = req.params.reviewId;
  const user = Review.findById(reviewId);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "Review not found" });
  }
};

// PUT /reviews/:reviewId
const updateReview = (req, res) => {
  const reviewId = req.params.reviewId;
  const updatedReview = Review.updateOneById(reviewId, { ...req.body }); // Spread the req.body object

  if (updatedReview) {
    res.json(updatedReview);
  } else {
    // Handle update failure (e.g., user not found)
    res.status(404).json({ message: "Review not found" });
  }
};

// DELETE /reviews/:reviewId
const deleteReview = (req, res) => {
  const reviewId = req.params.reviewId;
  const isDeleted = Review.deleteOneById(reviewId);

  if (isDeleted) {
    res.json({ message: "Review deleted successfully" });
  } else {
    // Handle deletion failure (e.g., user not found)
    res.status(404).json({ message: "Review not found" });
  }
};

module.exports = {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
};