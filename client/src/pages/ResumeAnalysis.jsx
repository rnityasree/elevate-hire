import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Box,
  Paper,
  Typography,
  Chip,
  CircularProgress,
  Stack,
  LinearProgress,
  useTheme,
} from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PsychologyIcon from "@mui/icons-material/Psychology";
import SchoolIcon from "@mui/icons-material/School";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import WorkIcon from "@mui/icons-material/Work";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

const ResumeAnalysis = () => {
  const theme = useTheme();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/resume-analysis", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(res.data);
      } catch (err) {
        console.error("Resume Analysis Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <CircularProgress size={60} sx={{ color: theme.palette.primary.main }} />
      </Box>
    );
  }

  // Fallbacks for data safety
  const skills = data?.skills || [];
  const projects = data?.projects || [];
  const education = data?.education || [];
  const certifications = data?.certifications || [];
  const experience = data?.experience || [];
  const atsScore = data?.atsScore || 0;

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
      <Box
        sx={{
          textAlign: "center",
          width: "100%",
          pt: 1,
          pb: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Chip
          icon={<AutoAwesomeIcon sx={{ fontSize: "14px !important", color: "#60a5fa" }} />}
          label="AI ATS PARSER & INTELLIGENCE"
          size="small"
          sx={{
            mb: 2,
            fontWeight: 800,
            fontSize: "0.7rem",
            letterSpacing: "1.2px",
            color: "#60a5fa",
            bgcolor: "rgba(37, 99, 235, 0.12)",
            border: "1px solid rgba(96, 165, 250, 0.3)",
            borderRadius: "20px",
            px: 1,
          }}
        />

        <Typography
          variant="h3"
          fontWeight={900}
          sx={{
            background: "linear-gradient(135deg, #FFFFFF 20%, #93C5FD 60%, #60A5FA 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-1px",
            fontSize: { xs: "2rem", sm: "2.75rem", md: "3.25rem" },
            filter: "drop-shadow(0 10px 20px rgba(37, 99, 235, 0.2))",
            mb: 1,
          }}
        >
          Resume Analysis
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "rgba(203, 213, 225, 0.8)",
            maxWidth: "640px",
            fontSize: { xs: "0.9rem", sm: "1rem" },
            lineHeight: 1.6,
            fontWeight: 400,
          }}
        >
          ElevateHire has analyzed your resume using AI. Review your ATS score, detected skills, projects, education, and experience below.
        </Typography>
      </Box>

      {/* ATS Score Overview Card */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, sm: 4 },
          borderRadius: "20px",
          bgcolor: "rgba(17, 24, 39, 0.65)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "260px 1fr" },
          gap: 4,
          alignItems: "center",
        }}
      >
        {/* Gauge Chart Box */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: 180,
              height: 180,
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Background Circle Track */}
            <CircularProgress
              variant="determinate"
              value={100}
              size={180}
              thickness={4}
              sx={{
                position: "absolute",
                color: "rgba(255, 255, 255, 0.05)",
              }}
            />
            {/* Active Determinate Score Progress */}
            <CircularProgress
              variant="determinate"
              value={atsScore}
              size={180}
              thickness={4}
              sx={{
                position: "absolute",
                color: "#2563eb",
                strokeLinecap: "round",
              }}
            />
            <Typography
              variant="h3"
              fontWeight={800}
              sx={{
                position: "absolute",
                color: "text.primary",
                zIndex: 1,
              }}
            >
              {atsScore}%
            </Typography>
          </Box>
        </Box>

        {/* ATS Progress Details */}
        <Box>
          <Typography variant="h4" fontWeight={800} sx={{ color: "text.primary", mb: 1 }}>
            ATS Resume Score
          </Typography>

          <Typography variant="body2" sx={{ color: "text.secondary", mb: 3, lineHeight: 1.6 }}>
            This score estimates how effectively your resume matches Applicant Tracking Systems (ATS) utilized by enterprise recruiters and automated hiring filters.
          </Typography>

          <LinearProgress
            variant="determinate"
            value={atsScore}
            sx={{
              height: 8,
              borderRadius: "10px",
              bgcolor: "rgba(255, 255, 255, 0.08)",
              "& .MuiLinearProgress-bar": {
                borderRadius: "10px",
                background: "linear-gradient(90deg, #2563eb, #60a5fa)",
              },
            }}
          />

          <Stack direction="row" spacing={1.5} flexWrap="wrap" rowGap={1} sx={{ mt: 3 }}>
            <Chip
              icon={<CheckCircleIcon sx={{ fontSize: "16px !important", color: "#34d399" }} />}
              label="Resume Parsed"
              sx={{
                bgcolor: "rgba(52, 211, 153, 0.12)",
                color: "#34d399",
                border: "1px solid rgba(52, 211, 153, 0.3)",
                fontWeight: 700,
                borderRadius: "10px",
              }}
            />
            <Chip
              icon={<PsychologyIcon sx={{ fontSize: "16px !important", color: "#60a5fa" }} />}
              label="AI Analyzed"
              sx={{
                bgcolor: "rgba(37, 99, 235, 0.12)",
                color: "#60a5fa",
                border: "1px solid rgba(96, 165, 250, 0.3)",
                fontWeight: 700,
                borderRadius: "10px",
              }}
            />
          </Stack>
        </Box>
      </Paper>

      {/* Grid Breakdowns */}
      <Box
        sx={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
          gap: 3,
        }}
      >
        {/* Skills Card */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: "20px",
            bgcolor: "rgba(17, 24, 39, 0.65)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 3 }}>
            <PsychologyIcon sx={{ color: "#60a5fa", fontSize: 28 }} />
            <Typography variant="h6" fontWeight={800} sx={{ color: "text.primary" }}>
              Skills
            </Typography>
          </Stack>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {skills.length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                No skills detected.
              </Typography>
            ) : (
              skills.map((skill) => (
                <Chip
                  key={skill}
                  label={skill}
                  sx={{
                    bgcolor: "rgba(37, 99, 235, 0.15)",
                    color: "#60a5fa",
                    border: "1px solid rgba(37, 99, 235, 0.3)",
                    fontWeight: 600,
                    borderRadius: "10px",
                  }}
                />
              ))
            )}
          </Box>
        </Paper>

        {/* Projects Card */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: "20px",
            bgcolor: "rgba(17, 24, 39, 0.65)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 3 }}>
            <RocketLaunchIcon sx={{ color: "#c084fc", fontSize: 28 }} />
            <Typography variant="h6" fontWeight={800} sx={{ color: "text.primary" }}>
              Projects
            </Typography>
          </Stack>

          {projects.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              No projects detected.
            </Typography>
          ) : (
            <Stack spacing={1.5}>
              {projects.map((project, idx) => (
                <Paper
                  key={idx}
                  elevation={0}
                  sx={{
                    p: 2,
                    borderRadius: "12px",
                    bgcolor: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                  }}
                >
                  <Typography variant="body2" fontWeight={600} sx={{ color: "text.primary" }}>
                    • {project}
                  </Typography>
                </Paper>
              ))}
            </Stack>
          )}
        </Paper>

        {/* Education Card */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: "20px",
            bgcolor: "rgba(17, 24, 39, 0.65)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 3 }}>
            <SchoolIcon sx={{ color: "#34d399", fontSize: 28 }} />
            <Typography variant="h6" fontWeight={800} sx={{ color: "text.primary" }}>
              Education
            </Typography>
          </Stack>

          {education.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              No education detected.
            </Typography>
          ) : (
            <Stack spacing={1.5}>
              {education.map((edu, idx) => (
                <Paper
                  key={idx}
                  elevation={0}
                  sx={{
                    p: 2,
                    borderRadius: "12px",
                    bgcolor: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                  }}
                >
                  <Typography variant="body2" fontWeight={600} sx={{ color: "text.primary" }}>
                    • {edu}
                  </Typography>
                </Paper>
              ))}
            </Stack>
          )}
        </Paper>

        {/* Certifications Card */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: "20px",
            bgcolor: "rgba(17, 24, 39, 0.65)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 3 }}>
            <WorkspacePremiumIcon sx={{ color: "#fbbf24", fontSize: 28 }} />
            <Typography variant="h6" fontWeight={800} sx={{ color: "text.primary" }}>
              Certifications
            </Typography>
          </Stack>

          {certifications.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              No certifications detected.
            </Typography>
          ) : (
            <Stack spacing={1.5}>
              {certifications.map((cert, idx) => (
                <Paper
                  key={idx}
                  elevation={0}
                  sx={{
                    p: 2,
                    borderRadius: "12px",
                    bgcolor: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                  }}
                >
                  <Typography variant="body2" fontWeight={600} sx={{ color: "text.primary" }}>
                    • {cert}
                  </Typography>
                </Paper>
              ))}
            </Stack>
          )}
        </Paper>
      </Box>

      {/* Full Width Experience Card */}
      <Paper
        elevation={0}
        sx={{
          p: 3.5,
          borderRadius: "20px",
          bgcolor: "rgba(17, 24, 39, 0.65)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
        }}
      >
        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 3 }}>
          <WorkIcon sx={{ color: "#60a5fa", fontSize: 28 }} />
          <Typography variant="h6" fontWeight={800} sx={{ color: "text.primary" }}>
            Experience
          </Typography>
        </Stack>

        {experience.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No professional experience detected.
          </Typography>
        ) : (
          <Stack spacing={1.5}>
            {experience.map((exp, idx) => (
              <Paper
                key={idx}
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: "12px",
                  bgcolor: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                }}
              >
                <Typography variant="body2" fontWeight={600} sx={{ color: "text.primary" }}>
                  • {exp}
                </Typography>
              </Paper>
            ))}
          </Stack>
        )}
      </Paper>

      {/* Summary Stat Grid Section */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, sm: 4 },
          borderRadius: "20px",
          bgcolor: "rgba(17, 24, 39, 0.65)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
        }}
      >
        <Typography variant="h5" fontWeight={800} sx={{ color: "text.primary", mb: 1 }}>
          Resume Summary
        </Typography>

        <Typography variant="body2" sx={{ color: "text.secondary", mb: 3, lineHeight: 1.6 }}>
          Your resume has been parsed and analyzed. The extracted metrics below power your ATS optimization, job matching recommendations, and interview preparation.
        </Typography>

        <Box
          sx={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)",
              sm: "repeat(3, 1fr)",
              md: "repeat(5, 1fr)",
            },
            gap: 2,
          }}
        >
          <Paper
            elevation={0}
            sx={{
              p: 2,
              textAlign: "center",
              borderRadius: "14px",
              bgcolor: "rgba(255, 255, 255, 0.02)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <Typography variant="h4" fontWeight={800} sx={{ color: "#60a5fa" }}>
              {skills.length}
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700 }}>
              Skills
            </Typography>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              p: 2,
              textAlign: "center",
              borderRadius: "14px",
              bgcolor: "rgba(255, 255, 255, 0.02)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <Typography variant="h4" fontWeight={800} sx={{ color: "#c084fc" }}>
              {projects.length}
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700 }}>
              Projects
            </Typography>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              p: 2,
              textAlign: "center",
              borderRadius: "14px",
              bgcolor: "rgba(255, 255, 255, 0.02)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <Typography variant="h4" fontWeight={800} sx={{ color: "#34d399" }}>
              {education.length}
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700 }}>
              Education
            </Typography>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              p: 2,
              textAlign: "center",
              borderRadius: "14px",
              bgcolor: "rgba(255, 255, 255, 0.02)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <Typography variant="h4" fontWeight={800} sx={{ color: "#fbbf24" }}>
              {certifications.length}
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700 }}>
              Certificates
            </Typography>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              p: 2,
              textAlign: "center",
              borderRadius: "14px",
              bgcolor: "rgba(255, 255, 255, 0.02)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <Typography variant="h4" fontWeight={800} sx={{ color: "#f87171" }}>
              {experience.length}
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700 }}>
              Experience
            </Typography>
          </Paper>
        </Box>
      </Paper>
    </Box>
  );
};

export default ResumeAnalysis;