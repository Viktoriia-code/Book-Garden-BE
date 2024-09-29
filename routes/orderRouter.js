const express = require('express');
const router = express.Router();
const {
  getOrdersByUserId,
  createOrder,
} = require('../controllers/orderControllers');
const requireAuth = require('../middleware/requireAuth');

// GET /orders/:userId
router.get('/:userId', requireAuth, getOrdersByUserId);

// POST /orders
router.post('/', requireAuth, createOrder);

module.exports = router;