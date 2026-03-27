const Habit = require("../models/Habit");

exports.createHabit = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Nombre requerido" });
    }

    const habit = new Habit({
      name,
      user: req.user.id,
      streak: 0,
      lastCompleted: null
    });

    await habit.save();
    res.json(habit);
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({ user: req.user.id });
    res.json(habits);
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.completeHabit = async (req, res) => {
  try {
    const habit = await Habit.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!habit) {
      return res.status(404).json({ message: "No encontrado" });
    }

    const today = new Date();
    const todayStr = today.toDateString();

    if (habit.lastCompleted) {
      const lastStr = new Date(habit.lastCompleted).toDateString();

      if (lastStr === todayStr) {
        return res.json({ message: "Ya completado hoy" });
      }

      const yesterday = new Date();
      yesterday.setDate(today.getDate() - 1);
      const yesterdayStr = yesterday.toDateString();

      if (lastStr === yesterdayStr) {
        habit.streak += 1;
      } else {
        habit.streak = 1;
      }
    } else {
      habit.streak = 1;
    }

    habit.lastCompleted = today;

    await habit.save();
    res.json(habit);
  } catch (error) {
    res.status(500).json({ error });
  }
};