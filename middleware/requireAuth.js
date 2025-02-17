require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const jwtSecret = process.env.JWT_SECRET;

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    console.log("No Authorization header found");
    return res.status(401).json({ error: 'Authorization token required' });
  }

  const token = authorization.split(' ')[1]; 

  try {
    const { _id } = jwt.verify(token, jwtSecret);

    req.user = await User.findOne({ _id }).select('_id');
    if (!req.user) {
      return res.status(401).json({ error: 'Request is not authorized' });
    }
    next();
  } catch (error) {
    console.log("JWT verification failed:", error);
    res.status(401).json({ error: 'Request is not authorized' });
  }
};

module.exports = requireAuth;