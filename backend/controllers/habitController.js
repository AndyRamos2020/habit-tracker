const Habit = require("../models/Habit");

exports.createHabit = async (req, res) => {
  try {
    const habit = new Habit({
      userId: req.user.id,
      name: req.body.name
    });

    await habit.save();
    res.json(habit);
  } catch (err) {
    res.status(500).json({ message: "Error al crear hábito" });
  }
};

exports.getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({ userId: req.user.id });
    res.json(habits);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener hábitos" });
  }
};

exports.completeHabit = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);

    const today = new Date();
    const last = habit.lastCompleted;

    if (last) {
      const diff = Math.floor((today - last) / (1000 * 60 * 60 * 24));

      if (diff === 1) {
        habit.streak += 1;
      } else if (diff > 1) {
        habit.streak = 1;
      }
    } else {
      habit.streak = 1;
    }

    habit.lastCompleted = today;
    await habit.save();
    res.json(habit);
  } catch (err) {
    res.status(500).json({ message: "Error al completar hábito" });
  }
};