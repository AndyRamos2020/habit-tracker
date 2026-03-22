const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  createHabit,
  getHabits,
  completeHabit
} = require("../controllers/habitController");

router.post("/", auth, createHabit);
router.get("/", auth, getHabits);
router.put("/:id", auth, completeHabit);

module.exports = router;