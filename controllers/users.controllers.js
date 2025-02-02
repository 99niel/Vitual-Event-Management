require("dotenv").config();

const joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../database/models/users"); // Import User model
const logger = require("../utils/logger"); // Import logger

// Register User
async function registerUser(req, res) {
  const schema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    role: joi.string().valid("organizer", "participant").required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { name, email, password, role } = req.body;

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
    return res.status(201).json({ user });
  } catch (error) {
    logger.error("Error creating user:", error); // Log error
    return res.status(500).json({ error: "Internal server error" });
  }
}

// Login User
async function loginUser(req, res) {
  // Define the validation schema
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
  });

  // Validate the request body
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { email, password } = req.body;

  try {
    // Fetch the user from the database
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Check JWT_SECRET from environment variables
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      logger.error(
        "ERROR: JWT_SECRET is not defined in the environment variables.",
      );
      return res
        .status(500)
        .json({ error: "Internal server error, JWT_SECRET missing" });
    }

    // Issue the JWT token
    const JWT_EXPIRATION = "1d";
    const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRATION,
    });

    // Optionally, store user in session (not needed if using JWT)
    // req.session.user = user;

    return res.status(200).json({
      message: "User logged in successfully",
      token,
    });
  } catch (err) {
    logger.error("Error during login:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// Logout User
async function logoutUser(req, res) {
  try {
    // Clear the JWT from the client side (you can send a response telling the client to remove it)
    res.clearCookie("jwt", {
      // Clear the JWT cookie if you're storing it in a cookie
      path: "/",
      httpOnly: true,
      secure: false, // Set to true in production if using HTTPS
      sameSite: "Strict",
    });

    // Alternatively, you can also send a message to the client to delete the JWT from localStorage or sessionStorage
    return res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

// Get User Profile
async function getUserProfile(req, res) {
  const id = req.params.id;
  logger.info("Fetching user with id:", id);
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    logger.error("Error fetching user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// Get All User Profiles
async function getAllUserProfile(req, res) {
  try {
    const users = await User.find();
    if (!users) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json({ users });
  } catch (error) {
    logger.error("Error fetching user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

exports.registerUser = registerUser;
exports.loginUser = loginUser;
exports.logoutUser = logoutUser;
exports.getUserProfile = getUserProfile;
exports.getAllUserProfile = getAllUserProfile;
