import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Grid,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import BadgeIcon from "@mui/icons-material/Badge";
import WorkIcon from "@mui/icons-material/Work";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import DescriptionIcon from "@mui/icons-material/Description";
import PsychologyIcon from "@mui/icons-material/Psychology";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await API.get("/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(data);
      } catch (err) {
        console.error("Profile fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const atsScore = useMemo(() => {
    return Number(profile?.atsScore || 0);
  }, [profile]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="70vh"
      >
        <CircularProgress size={60} sx={{ color: "#60a5fa" }} />
      </Box>
    );
  }

  if (!profile) {
    return (
      <Box sx={{ width: "100%", maxWidth: 1280, mx: "auto", px: 3, py: 5 }}>
        <Paper
          elevation={0}
          sx={{
            p: 4,
            textAlign: "center",
            borderRadius: "20px",
            bgcolor: "rgba(17, 24, 39, 0.65)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          <Typography variant="h5" fontWeight={700} color="error.main">
            Unable to load profile information.
          </Typography>
        </Paper>
      </Box>
    );
  }

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
      {/* Hero Header */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, sm: 4 },
          borderRadius: "20px",
          color: "#fff",
          background: "linear-gradient(135deg, rgba(37, 99, 235, 0.85), rgba(67, 56, 202, 0.85), rgba(124, 58, 237, 0.85))",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          boxShadow: "0 12px 32px rgba(37, 99, 235, 0.25)",
        }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={3}
          alignItems="center"
        >
          <Avatar
            sx={{
              width: 90,
              height: 90,
              fontSize: 38,
              fontWeight: 800,
              bgcolor: "rgba(255, 255, 255, 0.2)",
              border: "2px solid rgba(255, 255, 255, 0.4)",
              boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
            }}
          >
            {profile.name?.charAt(0)?.toUpperCase() || "U"}
          </Avatar>

          <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
            <Typography
              variant="h3"
              fontWeight={800}
              sx={{
                fontSize: { xs: "1.8rem", sm: "2.5rem" },
                letterSpacing: "-0.5px",
              }}
            >
              {profile.name}
            </Typography>

            <Typography
              variant="h6"
              sx={{ color: "rgba(255, 255, 255, 0.85)", fontWeight: 400, mt: 0.5 }}
            >
              {profile.email}
            </Typography>

            <Chip
              label={profile.role || "User"}
              sx={{
                mt: 2,
                bgcolor: "#ffffff",
                color: "#2563eb",
                fontWeight: 800,
                fontSize: "0.75rem",
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                px: 1,
              }}
            />
          </Box>
        </Stack>
      </Paper>

      {/* Top 4 Quick Statistics Grid */}
      <Grid container spacing={3}>
        <Grid item xs={6} md={3}>
          <Card
            sx={{
              borderRadius: "20px",
              bgcolor: "rgba(17, 24, 39, 0.65)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              transition: "transform 0.2s ease, border-color 0.2s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                borderColor: "rgba(96, 165, 250, 0.4)",
              },
            }}
          >
            <CardContent sx={{ textAlign: "center", p: 3 }}>
              <TrendingUpIcon sx={{ fontSize: 38, color: "#60a5fa", mb: 1 }} />
              <Typography variant="h4" fontWeight={800} sx={{ color: "#ffffff" }}>
                {atsScore}
              </Typography>
              <Typography variant="caption" sx={{ color: "rgba(203, 213, 225, 0.7)", fontWeight: 700, letterSpacing: "0.5px" }}>
                ATS SCORE
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={6} md={3}>
          <Card
            sx={{
              borderRadius: "20px",
              bgcolor: "rgba(17, 24, 39, 0.65)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              transition: "transform 0.2s ease, border-color 0.2s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                borderColor: "rgba(52, 211, 153, 0.4)",
              },
            }}
          >
            <CardContent sx={{ textAlign: "center", p: 3 }}>
              <DescriptionIcon sx={{ fontSize: 38, color: "#34d399", mb: 1 }} />
              <Typography variant="h4" fontWeight={800} sx={{ color: "#ffffff" }}>
                {profile.resumeUploaded ? "Yes" : "No"}
              </Typography>
              <Typography variant="caption" sx={{ color: "rgba(203, 213, 225, 0.7)", fontWeight: 700, letterSpacing: "0.5px" }}>
                RESUME
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={6} md={3}>
          <Card
            sx={{
              borderRadius: "20px",
              bgcolor: "rgba(17, 24, 39, 0.65)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              transition: "transform 0.2s ease, border-color 0.2s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                borderColor: "rgba(251, 191, 36, 0.4)",
              },
            }}
          >
            <CardContent sx={{ textAlign: "center", p: 3 }}>
              <WorkIcon sx={{ fontSize: 38, color: "#fbbf24", mb: 1 }} />
              <Typography variant="h4" fontWeight={800} sx={{ color: "#ffffff" }}>
                {profile.experienceYears ?? 0}
              </Typography>
              <Typography variant="caption" sx={{ color: "rgba(203, 213, 225, 0.7)", fontWeight: 700, letterSpacing: "0.5px" }}>
                YEARS EXP.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={6} md={3}>
          <Card
            sx={{
              borderRadius: "20px",
              bgcolor: "rgba(17, 24, 39, 0.65)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              transition: "transform 0.2s ease, border-color 0.2s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                borderColor: "rgba(192, 132, 252, 0.4)",
              },
            }}
          >
            <CardContent sx={{ textAlign: "center", p: 3 }}>
              <PsychologyIcon sx={{ fontSize: 38, color: "#c084fc", mb: 1 }} />
              <Typography variant="h4" fontWeight={800} sx={{ color: "#ffffff" }}>
                {profile.skills || 0}
              </Typography>
              <Typography variant="caption" sx={{ color: "rgba(203, 213, 225, 0.7)", fontWeight: 700, letterSpacing: "0.5px" }}>
                SKILLS DETECTED
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Details Section */}
      <Grid container spacing={3}>
        {/* Personal Information */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              borderRadius: "20px",
              bgcolor: "rgba(17, 24, 39, 0.65)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              height: "100%",
            }}
          >
            <CardContent sx={{ p: 3.5 }}>
              <Typography variant="h6" fontWeight={800} sx={{ color: "#ffffff", mb: 3 }}>
                Personal Information
              </Typography>

              <Stack spacing={2.5}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box sx={{ p: 1, borderRadius: "10px", bgcolor: "rgba(37, 99, 235, 0.15)" }}>
                    <PersonIcon sx={{ color: "#60a5fa", display: "block" }} />
                  </Box>
                  <Box>
                    <Typography variant="caption" sx={{ color: "rgba(203, 213, 225, 0.6)" }}>
                      Full Name
                    </Typography>
                    <Typography fontWeight={600} sx={{ color: "#f3f4f6" }}>
                      {profile.name}
                    </Typography>
                  </Box>
                </Stack>

                <Stack direction="row" spacing={2} alignItems="center">
                  <Box sx={{ p: 1, borderRadius: "10px", bgcolor: "rgba(37, 99, 235, 0.15)" }}>
                    <EmailIcon sx={{ color: "#60a5fa", display: "block" }} />
                  </Box>
                  <Box>
                    <Typography variant="caption" sx={{ color: "rgba(203, 213, 225, 0.6)" }}>
                      Email Address
                    </Typography>
                    <Typography fontWeight={600} sx={{ color: "#f3f4f6" }}>
                      {profile.email}
                    </Typography>
                  </Box>
                </Stack>

                <Stack direction="row" spacing={2} alignItems="center">
                  <Box sx={{ p: 1, borderRadius: "10px", bgcolor: "rgba(37, 99, 235, 0.15)" }}>
                    <BadgeIcon sx={{ color: "#60a5fa", display: "block" }} />
                  </Box>
                  <Box>
                    <Typography variant="caption" sx={{ color: "rgba(203, 213, 225, 0.6)" }}>
                      Account Role
                    </Typography>
                    <Typography fontWeight={600} sx={{ color: "#f3f4f6" }}>
                      {profile.role || "User"}
                    </Typography>
                  </Box>
                </Stack>

                <Stack direction="row" spacing={2} alignItems="center">
                  <Box sx={{ p: 1, borderRadius: "10px", bgcolor: "rgba(37, 99, 235, 0.15)" }}>
                    <WorkIcon sx={{ color: "#60a5fa", display: "block" }} />
                  </Box>
                  <Box>
                    <Typography variant="caption" sx={{ color: "rgba(203, 213, 225, 0.6)" }}>
                      Experience
                    </Typography>
                    <Typography fontWeight={600} sx={{ color: "#f3f4f6" }}>
                      {profile.experienceYears ?? 0} Years
                    </Typography>
                  </Box>
                </Stack>

                <Stack direction="row" spacing={2} alignItems="center">
                  <Box sx={{ p: 1, borderRadius: "10px", bgcolor: "rgba(37, 99, 235, 0.15)" }}>
                    <CalendarMonthIcon sx={{ color: "#60a5fa", display: "block" }} />
                  </Box>
                  <Box>
                    <Typography variant="caption" sx={{ color: "rgba(203, 213, 225, 0.6)" }}>
                      Joined
                    </Typography>
                    <Typography fontWeight={600} sx={{ color: "#f3f4f6" }}>
                      {profile.joined
                        ? new Date(profile.joined).toLocaleDateString()
                        : "N/A"}
                    </Typography>
                  </Box>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Resume Overview */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              borderRadius: "20px",
              bgcolor: "rgba(17, 24, 39, 0.65)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              height: "100%",
            }}
          >
            <CardContent sx={{ p: 3.5 }}>
              <Typography variant="h6" fontWeight={800} sx={{ color: "#ffffff", mb: 2 }}>
                Resume Overview
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2" sx={{ color: "rgba(203, 213, 225, 0.8)", fontWeight: 600 }}>
                    ATS Optimization Level
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#60a5fa", fontWeight: 800 }}>
                    {atsScore}%
                  </Typography>
                </Stack>

                <LinearProgress
                  variant="determinate"
                  value={atsScore}
                  sx={{
                    mt: 1.5,
                    height: 10,
                    borderRadius: 10,
                    bgcolor: "rgba(255, 255, 255, 0.08)",
                    "& .MuiLinearProgress-bar": {
                      borderRadius: 10,
                      background: "linear-gradient(90deg, #2563eb, #60a5fa, #34d399)",
                    },
                  }}
                />
              </Box>

              <Stack spacing={1.5} flexWrap="wrap">
                <Chip
                  label={profile.resumeUploaded ? "Resume Uploaded" : "Resume Not Uploaded"}
                  sx={{
                    bgcolor: profile.resumeUploaded ? "rgba(52, 211, 153, 0.15)" : "rgba(239, 68, 68, 0.15)",
                    color: profile.resumeUploaded ? "#34d399" : "#f87171",
                    border: `1px solid ${profile.resumeUploaded ? "rgba(52, 211, 153, 0.3)" : "rgba(239, 68, 68, 0.3)"}`,
                    fontWeight: 700,
                    borderRadius: "10px",
                    py: 0.5,
                  }}
                />

                <Chip
                  label={`Skills: ${profile.skills || 0}`}
                  sx={{
                    bgcolor: "rgba(37, 99, 235, 0.15)",
                    color: "#60a5fa",
                    border: "1px solid rgba(37, 99, 235, 0.3)",
                    fontWeight: 700,
                    borderRadius: "10px",
                    py: 0.5,
                  }}
                />

                <Chip
                  label={`Projects: ${profile.projects || 0}`}
                  sx={{
                    bgcolor: "rgba(192, 132, 252, 0.15)",
                    color: "#c084fc",
                    border: "1px solid rgba(192, 132, 252, 0.3)",
                    fontWeight: 700,
                    borderRadius: "10px",
                    py: 0.5,
                  }}
                />

                <Chip
                  label={`Education: ${profile.education || "N/A"}`}
                  sx={{
                    bgcolor: "rgba(52, 211, 153, 0.15)",
                    color: "#34d399",
                    border: "1px solid rgba(52, 211, 153, 0.3)",
                    fontWeight: 700,
                    borderRadius: "10px",
                    py: 0.5,
                  }}
                />

                <Chip
                  label={`Certifications: ${profile.certifications || 0}`}
                  sx={{
                    bgcolor: "rgba(251, 191, 36, 0.15)",
                    color: "#fbbf24",
                    border: "1px solid rgba(251, 191, 36, 0.3)",
                    fontWeight: 700,
                    borderRadius: "10px",
                    py: 0.5,
                  }}
                />
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Navigation Quick Actions */}
      <Box sx={{ mt: 1 }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent="center"
        >
          <Button
            variant="contained"
            size="large"
            startIcon={<DescriptionIcon />}
            sx={{
              borderRadius: "12px",
              px: 4,
              py: 1.5,
              fontWeight: 700,
              background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
              boxShadow: "0 4px 14px rgba(37, 99, 235, 0.3)",
              "&:hover": {
                background: "linear-gradient(135deg, #1d4ed8, #1e40af)",
              },
            }}
            onClick={() => navigate("/resume-upload")}
          >
            Upload Resume
          </Button>

          <Button
            variant="contained"
            size="large"
            startIcon={<TrendingUpIcon />}
            sx={{
              borderRadius: "12px",
              px: 4,
              py: 1.5,
              fontWeight: 700,
              background: "linear-gradient(135deg, #059669, #10b981)",
              boxShadow: "0 4px 14px rgba(16, 185, 129, 0.3)",
              "&:hover": {
                background: "linear-gradient(135deg, #047857, #059669)",
              },
            }}
            onClick={() => navigate("/resume-analysis")}
          >
            Resume Analysis
          </Button>

          <Button
            variant="contained"
            size="large"
            startIcon={<WorkIcon />}
            sx={{
              borderRadius: "12px",
              px: 4,
              py: 1.5,
              fontWeight: 700,
              background: "linear-gradient(135deg, #7c3aed, #8b5cf6)",
              boxShadow: "0 4px 14px rgba(124, 58, 237, 0.3)",
              "&:hover": {
                background: "linear-gradient(135deg, #6d28d9, #7c3aed)",
              },
            }}
            onClick={() => navigate("/jobs")}
          >
            Recommended Jobs
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}

export default Profile;