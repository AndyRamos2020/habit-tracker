const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  streak: {
    type: Number,
    default: 0
  },
  completedToday: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model("Habit", habitSchema);
