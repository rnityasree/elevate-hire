const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
    getResumeAnalysis
} = require("../controllers/resumeAnalysisController");

router.get("/", protect, getResumeAnalysis);

module.exports = router;