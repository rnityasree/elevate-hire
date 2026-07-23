const express = require("express");

const router = express.Router();

const {
    createJob,
    getEmployerJobs,
    getJobById,
    updateJob,
    deleteJob
} = require("../controllers/employerJobController");

const {
    protect
} = require("../middleware/authMiddleware");

// Protect all routes
router.use(protect);

// Create Job
router.post("/", createJob);

// Get Employer Jobs
router.get("/", getEmployerJobs);

// Get Single Job
router.get("/:id", getJobById);

// Update Job
router.put("/:id", updateJob);

// Delete Job
router.delete("/:id", deleteJob);

module.exports = router;