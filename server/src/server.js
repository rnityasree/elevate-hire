const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

// Import Routes
const authRoutes = require("./routes/authRoutes");
const employerAuthRoutes = require("./routes/employerAuthRoutes");
const employerJobRoutes = require("./routes/employerJobRoutes");
const profileRoutes = require("./routes/profileRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const resumeAnalysisRoutes = require("./routes/resumeAnalysisRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const aiRoutes = require("./routes/aiRoutes");
const employerProfileRoutes = require("./routes/employerProfileRoutes");

const app = express();

// Connect MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// ==============================
// API Routes
// ==============================

// Student Authentication
app.use("/api/auth", authRoutes);

// Employer Authentication
app.use("/api/employer/auth", employerAuthRoutes);

// Employer Job Management
app.use("/api/employer/jobs", employerJobRoutes);

// Student Routes
app.use("/api/profile", profileRoutes);

app.use("/api/resume", resumeRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/resume-analysis", resumeAnalysisRoutes);

app.use("/api/jobs", jobRoutes);

app.use("/api/applications", applicationRoutes);

app.use("/api/ai", aiRoutes);

app.use("/api/employer/profile", employerProfileRoutes);

// Test Route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "ElevateHire API is running successfully"
    });
});

// 404 Route
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});