const express = require('express');
const router = express.Router();
const { createNewsletter } = require('../controllers/newsletterControllers');

// POST /newsletter/add
router.post('/add', createNewsletter);

module.exports = router;