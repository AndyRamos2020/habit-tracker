const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  name: String,
  streak: { type: Number, default: 0 },
  lastCompleted: Date
});

module.exports = mongoose.model("Habit", habitSchema);