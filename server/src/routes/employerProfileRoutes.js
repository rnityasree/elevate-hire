const express = require("express");
const router = express.Router();

const {
    getCompanyProfile,
    updateCompanyProfile,
} = require("../controllers/employerProfileController");

const { protect } = require("../middleware/authMiddleware");

// Get Company Profile
router.get("/", protect, getCompanyProfile);

// Update Company Profile
router.put("/", protect, updateCompanyProfile);

module.exports = router;