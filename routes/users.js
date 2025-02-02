const express = require("express");
const router = express.Router();
const userController = require("../controllers/users.controllers");

router.post("/signup", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/logout", userController.logoutUser);
router.get("/profile/:id", userController.getUserProfile);
router.get("/profiles", userController.getAllUserProfile);

module.exports = router;
