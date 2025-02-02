require("dotenv").config();
const joi = require("joi");
const Event = require("../database/models/events");
const User = require("../database/models/users");
const logger = require("../utils/logger");

// Create Event
async function createEvent(req, res) {
  const userId = req.user.id;
  const user = await User.findById(userId);
  logger.info(user);
  if (user.role !== "organizer") {
    return res.status(403).json({ error: "Forbidden" });
  }
  const schema = joi.object({
    date: joi.date().required(),
    time: joi.string().required(),
    description: joi.string().min(6).max(255).required(),
    participants: joi.number().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const { date, time, description, hostname, participants } = req.body;
  try {
    const event = await Event.create({
      date,
      time,
      description,
      hostname: hostname || user.name,
      participants,
      createdBy: userId,
    });

    return res.status(201).json({ event });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Internal server error while creating event" });
  }
}

// Get all events
async function getAllEvents(req, res) {
  try {
    const events = await Event.find();
    return res.status(200).json({ events });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Internal server error while fetching events" });
  }
}

exports.createEvent = createEvent;
exports.getAllEvents = getAllEvents;
