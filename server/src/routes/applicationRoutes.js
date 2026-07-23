const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
    saveJob,
    applyJob,
    getApplications,
    updateStatus,
    deleteApplication
} = require("../controllers/applicationController");

// Save a job
router.post("/save", protect, saveJob);

// Apply to a job
router.post("/apply", protect, applyJob);

// Get all applications
router.get("/", protect, getApplications);

// Update application status
router.put("/:id", protect, updateStatus);

// Delete application
router.delete("/:id", protect, deleteApplication);

module.exports = router;