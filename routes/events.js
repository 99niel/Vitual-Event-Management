const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const eventController = require("../controllers/events.controllers");

router.post("/create", authMiddleware, eventController.createEvent);
router.get("/all", eventController.getAllEvents);
// router.get("/:id", eventController.getEventById);
// router.put("/:id", eventController.updateEvent);
// router.delete("/:id", eventController.deleteEvent);

module.exports = router;
