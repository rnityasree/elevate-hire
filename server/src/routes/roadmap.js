const express = require('express');
const router = express.Router();

// @route   POST /api/roadmap/generate
// @desc    Generate personalized career roadmap
router.post('/generate', (req, res) => {
  const { targetRole, timeframe } = req.body;

  if (!targetRole) {
    return res.status(400).json({ success: false, message: "Please specify a target career role." });
  }

  res.json({
    success: true,
    data: {
      role: targetRole,
      timeframe: timeframe || "6 Months",
      overview: `Tailored pathway for ${targetRole}.`,
      coreSkills: [
        "Data Structures & Algorithms",
        "Full Stack Architecture",
        "Cloud Infrastructure",
        "CI/CD Automation"
      ],
      certifications: [
        "AWS Certified Developer – Associate",
        "MongoDB Certified Developer",
        "Meta Front-End Professional"
      ],
      practicePlatforms: [
        { name: "LeetCode", focus: "Data Structures & Algorithms" },
        { name: "Frontend Mentor", focus: "Real-world UI Challenges" },
        { name: "SystemDesign.one", focus: "Scalable Architecture" }
      ],
      timeline: [
        { phase: "Phase 1: Core Fundamentals", duration: "Month 1", description: "Master core concepts and language fundamentals." },
        { phase: "Phase 2: Advanced Concepts", duration: "Month 2-3", description: "Build scalable microservices and databases." },
        { phase: "Phase 3: Production Projects", duration: "Month 4-5", description: "Deploy full-stack applications with CI/CD pipelines." },
        { phase: "Phase 4: Placement Prep", duration: "Month 6", description: "Practice mock interviews and algorithm challenges." }
      ]
    }
  });
});

module.exports = router;