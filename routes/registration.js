const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const registrationController = require("../controllers/registration.controllers");
//
router.post(
  "/register",
  authMiddleware,
  registrationController.registerForEvent,
);
router.get("/cancel", registrationController.cancelRegistration);

module.exports = router;
