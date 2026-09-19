const express = require('express');
const router = express.Router();

// Mock mentor list
const mentors = [
  { id: 1, name: "Alex Rivera", domain: "Software Engineering", experienceYears: 3.5 },
  { id: 2, name: "Ananya Sharma", domain: "Product Management", experienceYears: 2.5 }
];

// @route   POST /api/mentorship/verify-eligibility
// @desc    Check 2+ years experience gatekeeper rule
router.post('/verify-eligibility', (req, res) => {
  const { experienceYears } = req.body;
  if (experienceYears >= 2) {
    return res.json({ success: true, eligible: true, message: "Verification successful!" });
  }
  return res.status(400).json({
    success: false,
    eligible: false,
    message: "Minimum 2+ years of experience required to become a mentor."
  });
});

// @route   POST /api/mentorship/book-session
// @desc    Reserve session slot
router.post('/book-session', (req, res) => {
  const { mentorId, slot } = req.body;
  res.json({
    success: true,
    message: `Session booked for ${slot}. Check your dashboard for calendar invite details.`
  });
});

module.exports = router;