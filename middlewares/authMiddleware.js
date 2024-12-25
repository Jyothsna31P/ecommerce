const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const JWT_SECRET = "hdkjbdaquNDSK"; // Replace with `process.env.JWT_SECRET` in production

// Middleware to authenticate users
const authenticate = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (!token) {
      return res.status(403).send("Access denied. No token provided.");
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password"); // Fetch user from database

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    req.user = user; // Attach the full user object to req.user
    next();
  } catch (err) {
    res
      .status(401)
      .json({
        message: "Unauthorized. Invalid or expired token.",
        error: err.message,
      });
  }
};

// Middleware to check if the user is an admin
const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: "Forbidden. Admin access required." });
  }
};

module.exports = { authenticate, isAdmin };
