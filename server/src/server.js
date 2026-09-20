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
const opportunityRoutes = require("./routes/opportunityRoutes");
const abroadRoutes = require("./routes/abroadRoutes");
const mentorshipRoutes = require("./routes/mentorship");
const roadmapRoutes = require("./routes/roadmap");
const notificationRoutes = require("./routes/notifications"); // Added Notifications Route

const app = express();

// Connect MongoDB
connectDB();

// Allowed Origins for Local Development & Vercel Production
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://elevate-hire-ten.vercel.app"
];

// Middleware - Enable CORS dynamically for local & cloud environments
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, Postman, curl, or server-to-server)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.indexOf(origin) !== -1 || origin.endsWith(".vercel.app")) {
        return callback(null, true);
      }
      
      return callback(new Error("CORS policy blocked this origin"), false);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

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

// Opportunity Aggregator Route
app.use("/api/opportunities", opportunityRoutes);

// Abroad Studies Route
app.use("/api/abroad", abroadRoutes);

// Mentorship & Career Roadmap Routes
app.use("/api/mentorship", mentorshipRoutes);
app.use("/api/roadmap", roadmapRoutes);

// Notification Route (Email & Twilio SMS)
app.use("/api/notifications", notificationRoutes);

// Test Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "ElevateHire API with Notification Service is running successfully",
  });
});

// 404 Catch-All Route (MUST BE AT THE BOTTOM)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  });
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});