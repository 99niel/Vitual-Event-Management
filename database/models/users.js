const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    email: {
      type: String,
      required: true,
      min: 6,
      max: 255,
      unique: true, // To ensure email is unique
      match: [/.+@.+\..+/, "Please fill a valid email address"], // Email validation regex
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 1024,
    },
    role: {
      type: String,
      required: true,
      enum: ["organizer", "participant"], // Ensures only valid roles are assigned
      default: "participant", // Default role can be participant if not specified
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);
module.exports = User;
