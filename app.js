// Description: This file is the entry point of the application.
require("dotenv").config();
const express = require("express");
const userRoutes = require("./routes/users");
const eventRoutes = require("./routes/events");
const resgistrationRoutes = require("./routes/registration");

const port = process.env.PORT || 3000;
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongoConnection = require("./database/connection");
// Start the server after DB connection is successful
app.listen(port, (err) => {
  if (err) {
    console.error("Error starting the server:", err);
  }
  console.log(`Server is running on port ${port}`);
});

mongoConnection();

app.use("/users", userRoutes);
app.use("/events", eventRoutes);
app.use("/registration", resgistrationRoutes);

// Export the app for use in other files
module.exports = app;
