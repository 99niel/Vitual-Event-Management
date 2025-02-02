const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    participants: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
