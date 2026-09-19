import { useEffect, useState } from "react";
import axios from "axios";

import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  LinearProgress,
  Chip,
  Stack,
  Alert,
} from "@mui/material";

import PsychologyIcon from "@mui/icons-material/Psychology";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import DescriptionIcon from "@mui/icons-material/Description";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

const ResumeImprovement = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSuggestions();
  }, []);

  const fetchSuggestions = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "http://localhost:5000/api/ai/resume-improvement",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(res.data);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to generate AI feedback."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="70vh"
      >
        <CircularProgress size={70} sx={{ color: "#60a5fa" }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ width: "100%", maxWidth: 1280, mx: "auto", p: 2 }}>
        <Alert
          severity="error"
          sx={{
            borderRadius: "16px",
            bgcolor: "rgba(239, 68, 68, 0.12)",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            color: "#f87171",
          }}
        >
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", maxWidth: 1280, mx: "auto", px: { xs: 2, sm: 3 }, py: 3 }}>
      {/* Hero Header */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, sm: 5 },
          mb: 4,
          borderRadius: "20px",
          color: "#fff",
          background: "linear-gradient(135deg, rgba(37, 99, 235, 0.9), rgba(67, 56, 202, 0.9), rgba(124, 58, 237, 0.9))",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          boxShadow: "0 10px 30px rgba(37, 99, 235, 0.2)",
        }}
      >
        <Typography variant="h3" fontWeight={800} gutterBottom sx={{ fontSize: { xs: "2rem", sm: "2.75rem" } }}>
          AI Resume Improvement
        </Typography>

        <Typography variant="h6" sx={{ color: "rgba(255, 255, 255, 0.9)", fontWeight: 400, fontSize: "1.05rem" }}>
          Gemini AI analyzed your resume and generated personalized ATS recommendations, recruiter feedback, and optimization suggestions.
        </Typography>
      </Paper>

      {/* Score Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              borderRadius: "20px",
              bgcolor: "rgba(17, 24, 39, 0.65)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <CardContent sx={{ textAlign: "center", p: 3 }}>
              <TrendingUpIcon sx={{ fontSize: 42, color: "#34d399", mb: 1 }} />
              <Typography variant="h3" fontWeight={800} sx={{ color: "#ffffff" }}>
                {data?.atsScore ?? "-"}
              </Typography>
              <Typography sx={{ color: "rgba(203, 213, 225, 0.8)", fontWeight: 600, mt: 0.5 }}>
                ATS Score
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card
            sx={{
              borderRadius: "20px",
              bgcolor: "rgba(17, 24, 39, 0.65)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <CardContent sx={{ textAlign: "center", p: 3 }}>
              <PsychologyIcon sx={{ fontSize: 42, color: "#60a5fa", mb: 1 }} />
              <Typography variant="h3" fontWeight={800} sx={{ color: "#ffffff" }}>
                {data?.resumeScore ?? "-"}
              </Typography>
              <Typography sx={{ color: "rgba(203, 213, 225, 0.8)", fontWeight: 600, mt: 0.5 }}>
                AI Resume Score
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card
            sx={{
              borderRadius: "20px",
              bgcolor: "rgba(17, 24, 39, 0.65)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <CardContent sx={{ textAlign: "center", p: 3 }}>
              <DescriptionIcon sx={{ fontSize: 42, color: "#c084fc", mb: 1 }} />
              <Typography variant="h3" fontWeight={800} sx={{ color: "#ffffff" }}>
                {data?.resumeLength ?? 0}
              </Typography>
              <Typography sx={{ color: "rgba(203, 213, 225, 0.8)", fontWeight: 600, mt: 0.5 }}>
                Characters
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Quality Meter */}
      <Paper
        elevation={0}
        sx={{
          p: 4,
          mb: 4,
          borderRadius: "20px",
          bgcolor: "rgba(17, 24, 39, 0.65)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
        }}
      >
        <Typography variant="h5" fontWeight={700} sx={{ color: "#ffffff" }} gutterBottom>
          Overall Resume Quality
        </Typography>

        <LinearProgress
          variant="determinate"
          value={data?.resumeScore || 0}
          sx={{
            height: 12,
            borderRadius: 10,
            mt: 2,
            bgcolor: "rgba(255, 255, 255, 0.08)",
            "& .MuiLinearProgress-bar": {
              borderRadius: 10,
              background: "linear-gradient(90deg, #2563eb, #60a5fa, #34d399)",
            },
          }}
        />
      </Paper>

      {/* Breakdown Grid */}
      <Grid container spacing={3}>
        {/* Professional Summary */}
        <Grid item xs={12}>
          <Card
            sx={{
              borderRadius: "20px",
              bgcolor: "rgba(17, 24, 39, 0.65)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <CardContent sx={{ p: 3.5 }}>
              <Typography variant="h5" fontWeight={700} sx={{ color: "#ffffff" }} gutterBottom>
                Professional Summary
              </Typography>

              <Typography
                sx={{
                  mt: 2,
                  lineHeight: 1.9,
                  color: "rgba(203, 213, 225, 0.9)",
                  fontSize: "0.95rem",
                }}
              >
                {data?.professionalSummary || "No summary available."}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Improved Experience */}
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
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h5" fontWeight={700} sx={{ color: "#ffffff" }} gutterBottom>
                Improved Experience
              </Typography>

              <Stack spacing={2} mt={3}>
                {data?.improvedExperience?.map((item, index) => (
                  <Paper
                    key={index}
                    elevation={0}
                    sx={{
                      p: 2,
                      borderRadius: "12px",
                      bgcolor: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                    }}
                  >
                    <Typography sx={{ color: "#f3f4f6", lineHeight: 1.6, fontSize: "0.9rem" }}>
                      • {item}
                    </Typography>
                  </Paper>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Missing Skills */}
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
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h5" fontWeight={700} sx={{ color: "#ffffff" }} gutterBottom>
                Missing Skills
              </Typography>

              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap mt={3}>
                {data?.missingSkills?.map((skill, index) => (
                  <Chip
                    key={index}
                    label={skill}
                    sx={{
                      bgcolor: "rgba(239, 68, 68, 0.15)",
                      color: "#f87171",
                      border: "1px solid rgba(239, 68, 68, 0.3)",
                      fontWeight: 600,
                      borderRadius: "10px",
                    }}
                  />
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* ATS Suggestions */}
        <Grid item xs={12}>
          <Card
            sx={{
              borderRadius: "20px",
              bgcolor: "rgba(17, 24, 39, 0.65)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <CardContent sx={{ p: 3.5 }}>
              <Typography variant="h5" fontWeight={700} sx={{ color: "#ffffff" }} gutterBottom>
                ATS Suggestions
              </Typography>

              <Stack spacing={2} mt={3}>
                {data?.atsSuggestions?.map((item, index) => (
                  <Paper
                    key={index}
                    elevation={0}
                    sx={{
                      p: 2,
                      borderRadius: "12px",
                      bgcolor: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                    }}
                  >
                    <Typography sx={{ color: "#f3f4f6", lineHeight: 1.6, fontSize: "0.9rem" }}>
                      • {item}
                    </Typography>
                  </Paper>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Recruiter Feedback */}
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
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h5" fontWeight={700} sx={{ color: "#ffffff" }} gutterBottom>
                Recruiter Feedback
              </Typography>

              <Stack spacing={2} mt={3}>
                {data?.recruiterFeedback?.map((item, index) => (
                  <Paper
                    key={index}
                    elevation={0}
                    sx={{
                      p: 2,
                      borderRadius: "12px",
                      bgcolor: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                    }}
                  >
                    <Typography sx={{ color: "#f3f4f6", lineHeight: 1.6, fontSize: "0.9rem" }}>
                      • {item}
                    </Typography>
                  </Paper>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Suggested Keywords */}
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
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h5" fontWeight={700} sx={{ color: "#ffffff" }} gutterBottom>
                Suggested Keywords
              </Typography>

              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap mt={3}>
                {data?.keywords?.map((item, index) => (
                  <Chip
                    key={index}
                    icon={<AutoAwesomeIcon sx={{ fontSize: "14px !important", color: "#60a5fa" }} />}
                    label={item}
                    sx={{
                      bgcolor: "rgba(37, 99, 235, 0.15)",
                      color: "#60a5fa",
                      border: "1px solid rgba(37, 99, 235, 0.3)",
                      fontWeight: 600,
                      borderRadius: "10px",
                    }}
                  />
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* AI Insight Footer */}
        <Grid item xs={12}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: "20px",
              bgcolor: "rgba(37, 99, 235, 0.1)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(96, 165, 250, 0.25)",
            }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <AutoAwesomeIcon sx={{ fontSize: 40, color: "#60a5fa" }} />

              <Box>
                <Typography variant="h5" fontWeight={700} sx={{ color: "#60a5fa" }}>
                  AI Insight
                </Typography>

                <Typography sx={{ color: "rgba(203, 213, 225, 0.9)", mt: 1, fontSize: "0.95rem" }}>
                  Focus on incorporating the suggested keywords, strengthening your experience bullet points with measurable achievements, and following the ATS recommendations to improve your resume's visibility and recruiter appeal.
                </Typography>
              </Box>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ResumeImprovement;