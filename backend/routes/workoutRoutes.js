const express = require("express");
const requireAuth = require("../middleware/requireAuth");

// Controller functions
const {
	getWorkouts,
	getWorkout,
	createWorkout,
	deleteWorkout,
	updateWorkout,
} = require("../controllers/workoutController");

const router = express.Router();

// Require Auth to protect all workout API routes
router.use(requireAuth);

// GET all workouts
router.get("/", getWorkouts);

// GET single workout
router.get("/:id", getWorkout);

// POST new workout
router.post("/", createWorkout);

// DELETE single workout
router.delete("/:id", deleteWorkout);

// UPDATE single workout
router.patch("/:id", updateWorkout);

module.exports = router;
