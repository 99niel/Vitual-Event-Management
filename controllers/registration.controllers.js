const Registration = require("../database/models/registration");
const Event = require("../database/models/events");
const User = require("../database/models/users");
const joi = require("joi");
const logger = require("../utils/logger");

// Register participant for an event
async function registerForEvent(req, res) {
  const { eventId } = req.body;
  try {
    // Validate eventId
    const schema = joi.object({
      eventId: joi.string().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Check if event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    const user = req.user;

    // Check if the user has already registered for the event
    const existingRegistration = await Registration.findOne({
      userId: user._id,
      eventId,
    });

    if (existingRegistration) {
      return res
        .status(400)
        .json({ error: "Already registered for this event" });
    }

    // Register the participant
    const registration = await Registration.create({
      userId: user._id,
      eventId,
    });

    return res.status(201).json({
      message: "Successfully registered for the event",
      registration,
    });
  } catch (error) {
    logger.error("Error during registration:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// Cancel participant's registration for an event
async function cancelRegistration(req, res) {
  const { eventId } = req.body;
  try {
    const schema = joi.object({
      eventId: joi.string().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Check if registration exists
    const registration = await Registration.findOneAndUpdate(
      { userId: req.user._id, eventId },
      { status: "canceled" },
      { new: true },
    );

    if (!registration) {
      return res
        .status(404)
        .json({ error: "No registration found for this event" });
    }

    return res.status(200).json({
      message: "Successfully canceled registration",
      registration,
    });
  } catch (error) {
    logger.error("Error during cancellation:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

exports.registerForEvent = registerForEvent;
exports.cancelRegistration = cancelRegistration;
