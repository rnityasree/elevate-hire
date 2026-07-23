const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
    improveResume,
    jobMatch
} = require("../controllers/aiController");

const {
    generateCoverLetter
} = require("../controllers/coverLetterController");

const {
    generateInterviewQuestions
} = require("../controllers/interviewController");

const {
    startInterview,
    continueInterview
} = require("../controllers/chatbotController");

// ======================================
// AI Resume Improvement
// ======================================

router.get(
    "/resume-improvement",
    protect,
    improveResume
);

// ======================================
// AI Job Match
// ======================================

router.post(
    "/job-match",
    protect,
    jobMatch
);

// ======================================
// AI Cover Letter
// ======================================

router.post(
    "/cover-letter",
    protect,
    generateCoverLetter
);

// ======================================
// AI Interview Questions
// ======================================

router.post(
    "/interview",
    protect,
    generateInterviewQuestions
);

// ======================================
// AI Mock Interview - Start
// ======================================

router.post(
    "/mock-interview/start",
    protect,
    startInterview
);

// ======================================
// AI Mock Interview - Continue
// ======================================

router.post(
    "/mock-interview/continue",
    protect,
    continueInterview
);

module.exports = router;