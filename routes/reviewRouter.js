const express = require('express');
const router = express.Router();
const {
  getAllReviews,
  getReviewsByUserId,
  createReview,
  updateReview,
  deleteReview,
} = require('../controllers/reviewControllers');
const requireAuth = require('../middleware/requireAuth');

// GET /reviews
router.get('/', getAllReviews);

// POST /reviews
router.post('/', requireAuth, createReview);

// GET /reviews/user/:userId
router.get('/user/:userId', requireAuth, getReviewsByUserId);

// PATCH /reviews/:reviewId
router.patch('/:reviewId', requireAuth, updateReview);

// DELETE /reviews/:reviewId
router.delete('/:reviewId', requireAuth, deleteReview);

module.exports = router;