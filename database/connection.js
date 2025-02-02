require("dotenv").config();
const mongoose = require("mongoose");
const logger = require("../utils/logger");

const mongoConnection = async () => {
  try {
    // Establish database connection
    await mongoose.connect(process.env.mongoURI);
    logger.info("Connected to DB");
  } catch (error) {
    logger.error("Error connecting to DB:", error);
  }
};

module.exports = mongoConnection;
