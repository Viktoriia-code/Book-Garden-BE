const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const SECRET = "secretword"; // Ideally, store this in an environment variable

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    console.log("No Authorization header found");
    return res.status(401).json({ error: 'Authorization token required' });
  }

  const token = authorization.split(' ')[1]; 

  try {
    const { _id } = jwt.verify(token, SECRET);

    // Set req.user to the user ID for later access in the controller
    req.user = { userId: _id }; // Store the user ID instead of the full user object
    
    const user = await User.findById(_id).select('_id');
    if (!user) {
      return res.status(401).json({ error: 'Request is not authorized' });
    }

    next(); // Proceed to the next middleware/controller
  } catch (error) {
    console.log("JWT verification failed:", error);
    res.status(401).json({ error: 'Request is not authorized' });
  }
};

module.exports = requireAuth;
