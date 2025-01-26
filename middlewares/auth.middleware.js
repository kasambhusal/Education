const jwt = require('jsonwebtoken');
const userService = require('./user.service');  // Ensure correct import of userService

const validateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header
  
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: Token missing' });
  }

  // Check if the token is blacklisted
  if (userService.isTokenBlacklisted(token)) {
    return res.status(403).json({ error: 'Token has been invalidated. Please log in again.' });
  }

  try {
    // Verify the token using JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Add the decoded user data to the request object
    next(); // Allow the request to proceed to the next handler
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

module.exports = { validateToken };
