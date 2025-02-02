// authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../database/models/users");

const authMiddleware = async (req, res, next) => {
  // Get the token from the Authorization header
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "Authentication token missing" });
  }

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user based on the decoded token's _id
    const user = await User.findById(decoded._id);
    if (!user) {
      throw new Error("User not found");
    }

    // Attach the user to the request object
    req.user = user;
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;
