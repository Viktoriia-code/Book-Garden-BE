const User = require('../models/userModel');

const requireAdmin = async (req, res, next) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'Unauthorized: User information is missing' });
    }

    const user = await User.findById(req.user._id).select('isAdmin');

    if (user && user.isAdmin) {
      next();
    } else {
      res.status(403).json({ message: 'Forbidden: Admins only' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = requireAdmin;