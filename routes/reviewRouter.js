const express = require('express');
const router = express.Router();
const {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
} = require('../controllers/reviewControllers');

// GET /reviews
router.get('/', getAllReviews);

// POST /reviews
router.post('/', createReview);

// GET /reviews/:reviewId
router.get('/:reviewId', getReviewById);

// PUT /reviews/:reviewId
router.put('/:reviewId', updateReview);

// DELETE /reviews/:reviewId
router.delete('/:reviewId', deleteReview);

module.exports = router;