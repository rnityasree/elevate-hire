const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { getRecommendedJobs } = require("../controllers/jobController");

router.get("/", protect, getRecommendedJobs);

module.exports = router;