const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { getRecommendedJobs, createJob } = require("../controllers/jobController");

// @route   GET /api/jobs
// @desc    Get skill-matched job recommendations for students
// @access  Private (Student)
router.get("/", protect, getRecommendedJobs);

// @route   POST /api/jobs
// @desc    Create a new job opportunity & automatically trigger candidate alerts
// @access  Private (Employer)
router.post("/",protect, createJob);

module.exports = router;