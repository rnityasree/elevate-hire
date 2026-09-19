import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  Box,
  Typography,
  Button,
  Paper,
  Stack,
  Chip,
  alpha,
  useTheme,
} from "@mui/material";

import CloudUpload from "@mui/icons-material/CloudUpload";
import Analytics from "@mui/icons-material/Analytics";
import Work from "@mui/icons-material/Work";
import Psychology from "@mui/icons-material/Psychology";
import EmojiEvents from "@mui/icons-material/EmojiEvents";
import AutoAwesome from "@mui/icons-material/AutoAwesome";
import Description from "@mui/icons-material/Description";
import Assessment from "@mui/icons-material/Assessment";
import Code from "@mui/icons-material/Code";
import FolderSpecial from "@mui/icons-material/FolderSpecial";

import DashboardCard from "../components/DashboardCard";

function Dashboard() {
  const theme = useTheme();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [dashboard, setDashboard] = useState({
    resumeStatus: "Loading...",
    atsScore: 0,
    skills: 0,
    projects: 0,
    education: 0,
    certifications: 0,
  });

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDashboard(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 1280,
        mx: "auto",
        px: { xs: 2, sm: 3 },
        py: 3,
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      {/* Hero Header Section */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3.5, sm: 5 },
          borderRadius: "24px",
          background:
            "linear-gradient(135deg, rgba(37, 99, 235, 0.9) 0%, rgba(67, 56, 202, 0.9) 50%, rgba(124, 58, 237, 0.9) 100%)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          color: "#fff",
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
        }}
      >
        <Box sx={{ position: "relative", zIndex: 1, maxWidth: 720 }}>
          <Chip
            icon={<AutoAwesome sx={{ fontSize: "14px !important", color: "#60a5fa" }} />}
            label="AI CAREER HUB"
            size="small"
            sx={{
              mb: 2,
              fontWeight: 800,
              fontSize: "0.7rem",
              letterSpacing: "1.2px",
              color: "#93c5fd",
              bgcolor: "rgba(255, 255, 255, 0.12)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "20px",
              px: 1,
            }}
          />

          <Typography
            variant="h3"
            fontWeight={900}
            sx={{
              fontSize: { xs: "2rem", sm: "2.75rem", md: "3.25rem" },
              letterSpacing: "-1px",
              mb: 1.5,
              textShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
            }}
          >
            Welcome back{user?.name ? `, ${user.name}` : ""} 👋
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "rgba(255, 255, 255, 0.85)",
              fontSize: { xs: "0.95rem", sm: "1.1rem" },
              lineHeight: 1.6,
              mb: 4,
            }}
          >
            Your AI-powered career journey continues today. Upload resumes, improve your ATS score, practice interviews, and land your dream role.
          </Typography>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Button
              variant="contained"
              size="large"
              startIcon={<CloudUpload />}
              onClick={() => navigate("/resume-upload")}
              sx={{
                borderRadius: "14px",
                bgcolor: "#ffffff",
                color: "#1e40af",
                fontWeight: 800,
                px: 3.5,
                py: 1.2,
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
                "&:hover": {
                  bgcolor: "#f8fafc",
                  transform: "translateY(-2px)",
                },
              }}
            >
              Upload Resume
            </Button>

            <Button
              variant="outlined"
              size="large"
              startIcon={<Analytics />}
              onClick={() => navigate("/resume-analysis")}
              sx={{
                borderRadius: "14px",
                color: "#ffffff",
                borderColor: "rgba(255, 255, 255, 0.4)",
                fontWeight: 700,
                px: 3.5,
                py: 1.2,
                backdropFilter: "blur(8px)",
                "&:hover": {
                  borderColor: "#ffffff",
                  bgcolor: "rgba(255, 255, 255, 0.12)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              View Analysis
            </Button>
          </Stack>
        </Box>
      </Paper>

      {/* Metrics Grid */}
      <Box
        sx={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
          },
          gap: 2.5,
        }}
      >
        <DashboardCard
          title="Resume Status"
          value={dashboard.resumeStatus}
          icon={<Description sx={{ fontSize: 28 }} />}
          color="#22c55e"
        />

        <DashboardCard
          title="Skills"
          value={dashboard.skills}
          icon={<Code sx={{ fontSize: 28 }} />}
          color="#3b82f6"
        />

        <DashboardCard
          title="Projects"
          value={dashboard.projects}
          icon={<FolderSpecial sx={{ fontSize: 28 }} />}
          color="#a855f7"
        />

        <DashboardCard
          title="ATS Score"
          value={`${dashboard.atsScore}%`}
          icon={<Assessment sx={{ fontSize: 28 }} />}
          color="#f97316"
        />
      </Box>

      {/* AI Career Tools */}
      <Box sx={{ width: "100%" }}>
        <Typography variant="h5" fontWeight={800} sx={{ color: "text.primary", mb: 2.5, letterSpacing: "-0.5px" }}>
          AI Career Tools
        </Typography>

        <Box
          sx={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              lg: "repeat(4, 1fr)",
            },
            gap: 2.5,
          }}
        >
          {/* Tool 1 */}
          <Paper
            sx={{
              p: 3,
              borderRadius: "20px",
              bgcolor: "rgba(17, 24, 39, 0.65)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              cursor: "pointer",
              transition: "all 0.3s ease",
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
              "&:hover": {
                transform: "translateY(-6px)",
                borderColor: alpha(theme.palette.primary.main, 0.4),
                boxShadow: `0 12px 30px -5px ${alpha(theme.palette.primary.main, 0.25)}`,
              },
            }}
            onClick={() => navigate("/resume-improvement")}
          >
            <AutoAwesome sx={{ fontSize: 38, color: "#60a5fa" }} />
            <Box>
              <Typography variant="h6" fontWeight={700} sx={{ color: "text.primary", mb: 0.5 }}>
                AI Resume Review
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.5 }}>
                Improve your resume using Gemini AI feedback.
              </Typography>
            </Box>
          </Paper>

          {/* Tool 2 */}
          <Paper
            sx={{
              p: 3,
              borderRadius: "20px",
              bgcolor: "rgba(17, 24, 39, 0.65)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              cursor: "pointer",
              transition: "all 0.3s ease",
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
              "&:hover": {
                transform: "translateY(-6px)",
                borderColor: "rgba(16, 185, 129, 0.4)",
                boxShadow: "0 12px 30px -5px rgba(16, 185, 129, 0.25)",
              },
            }}
            onClick={() => navigate("/job-match")}
          >
            <Work sx={{ fontSize: 38, color: "#34d399" }} />
            <Box>
              <Typography variant="h6" fontWeight={700} sx={{ color: "text.primary", mb: 0.5 }}>
                AI Job Match
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.5 }}>
                Find jobs matching your extracted resume skills.
              </Typography>
            </Box>
          </Paper>

          {/* Tool 3 */}
          <Paper
            sx={{
              p: 3,
              borderRadius: "20px",
              bgcolor: "rgba(17, 24, 39, 0.65)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              cursor: "pointer",
              transition: "all 0.3s ease",
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
              "&:hover": {
                transform: "translateY(-6px)",
                borderColor: "rgba(168, 85, 247, 0.4)",
                boxShadow: "0 12px 30px -5px rgba(168, 85, 247, 0.25)",
              },
            }}
            onClick={() => navigate("/interview-prep")}
          >
            <Psychology sx={{ fontSize: 38, color: "#c084fc" }} />
            <Box>
              <Typography variant="h6" fontWeight={700} sx={{ color: "text.primary", mb: 0.5 }}>
                Interview Prep
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.5 }}>
                Practice AI-generated technical interview questions.
              </Typography>
            </Box>
          </Paper>

          {/* Tool 4 */}
          <Paper
            sx={{
              p: 3,
              borderRadius: "20px",
              bgcolor: "rgba(17, 24, 39, 0.65)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              cursor: "pointer",
              transition: "all 0.3s ease",
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
              "&:hover": {
                transform: "translateY(-6px)",
                borderColor: "rgba(245, 158, 11, 0.4)",
                boxShadow: "0 12px 30px -5px rgba(245, 158, 11, 0.25)",
              },
            }}
            onClick={() => navigate("/mock-interview")}
          >
            <EmojiEvents sx={{ fontSize: 38, color: "#fbbf24" }} />
            <Box>
              <Typography variant="h6" fontWeight={700} sx={{ color: "text.primary", mb: 0.5 }}>
                Mock Interview
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.5 }}>
                Practice realistic AI mock interviews in real-time.
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Box>

      {/* Bottom Grid: Overview & Recommendations */}
      <Box
        sx={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 3,
        }}
      >
        {/* Resume Overview */}
        <Paper
          sx={{
            p: { xs: 3, sm: 4 },
            borderRadius: "20px",
            bgcolor: "rgba(17, 24, 39, 0.65)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" fontWeight={800} sx={{ color: "text.primary", mb: 1 }}>
              Resume Overview
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.6 }}>
              Continue refining your resume bullet points and ATS score to maximize interview callback rates.
            </Typography>
          </Box>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Button
              variant="contained"
              startIcon={<CloudUpload />}
              onClick={() => navigate("/resume-upload")}
              sx={{
                borderRadius: "12px",
                px: 3,
                fontWeight: 700,
              }}
            >
              Upload Resume
            </Button>

            <Button
              variant="outlined"
              color="success"
              startIcon={<Analytics />}
              onClick={() => navigate("/resume-analysis")}
              sx={{
                borderRadius: "12px",
                borderColor: "rgba(16, 185, 129, 0.4)",
                color: "#34d399",
                px: 3,
                fontWeight: 700,
                "&:hover": {
                  borderColor: "#10b981",
                  bgcolor: "rgba(16, 185, 129, 0.12)",
                },
              }}
            >
              View Analysis
            </Button>
          </Stack>
        </Paper>

        {/* Recommended Jobs Card */}
        <Paper
          sx={{
            p: { xs: 3, sm: 4 },
            borderRadius: "20px",
            bgcolor: "rgba(17, 24, 39, 0.65)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" fontWeight={800} sx={{ color: "text.primary", mb: 1 }}>
              Recommended Jobs
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.6 }}>
              Discover tech roles matched specifically to your resume skills and target career domain.
            </Typography>
          </Box>

          <Box sx={{ display: "flex" }}>
            <Button
              variant="contained"
              startIcon={<Work />}
              onClick={() => navigate("/jobs")}
              sx={{
                borderRadius: "12px",
                px: 3,
                fontWeight: 700,
                bgcolor: "rgba(37, 99, 235, 0.8)",
                "&:hover": {
                  bgcolor: "#2563eb",
                },
              }}
            >
              View Recommended Jobs
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

export default Dashboard;