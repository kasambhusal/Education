const jwt = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({ error: "Authorization header missing" });
    }

    // Extract token from "Bearer {token}" format
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Token missing" });
    }

    // Verify the token
    const secretKey = process.env.JWT_SECRET; 
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: "Invalid or expired token" });
      }

      // Attach user info to the request object for downstream use
      req.user = decoded;
      next(); // Proceed to the next middleware or controller
    });
  } catch (error) {
    console.error("Error in validateToken middleware:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = validateToken;
