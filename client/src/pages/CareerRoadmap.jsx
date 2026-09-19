import React, { useState, useRef } from "react";
import {
  Box,
  Typography,
  Card,
  Grid,
  Button,
  Stack,
  Chip,
  TextField,
  Paper,
  Divider,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert,
} from "@mui/material";

import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ImageIcon from "@mui/icons-material/Image";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import CodeIcon from "@mui/icons-material/Code";
import TimelineIcon from "@mui/icons-material/Timeline";

import { toPng } from "html-to-image";

export default function CareerRoadmap() {
  const [targetRole, setTargetRole] = useState("Full Stack MERN Developer");
  const [timeframe, setTimeframe] = useState("6 Months");
  const [loading, setLoading] = useState(false);
  const [exportingImg, setExportingImg] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [roadmap, setRoadmap] = useState(null);

  const roadmapRef = useRef(null);

  const handleGenerateRoadmap = async () => {
    if (!targetRole.trim()) return;

    setLoading(true);
    setErrorMsg("");

    try {
      const response = await fetch("/api/roadmap/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetRole, timeframe }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setRoadmap(result.data);
      } else {
        setErrorMsg(result.message || "Failed to generate AI roadmap. Please try again.");
      }
    } catch (err) {
      console.error("Roadmap Generation Error:", err);
      // Fallback data
      setRoadmap({
        role: targetRole,
        timeframe: timeframe,
        overview: `Tailored pathway for ${targetRole}.`,
        coreSkills: [
          "Data Structures & Algorithms",
          "Full Stack Architecture",
          "Cloud Infrastructure",
          "CI/CD Automation",
        ],
        certifications: [
          "AWS Certified Developer – Associate",
          "MongoDB Certified Developer",
          "Meta Front-End Professional",
        ],
        practicePlatforms: [
          { name: "LeetCode", focus: "Data Structures & Algorithms" },
          { name: "Frontend Mentor", focus: "Real-world UI Challenges" },
          { name: "SystemDesign.one", focus: "Scalable Architecture" },
        ],
        timeline: [
          { phase: "Phase 1: Core Fundamentals", duration: "Month 1", description: "Master core concepts and language fundamentals." },
          { phase: "Phase 2: Advanced Concepts", duration: "Month 2-3", description: "Build scalable microservices and databases." },
          { phase: "Phase 3: Production Projects", duration: "Month 4-5", description: "Deploy full-stack applications with CI/CD pipelines." },
          { phase: "Phase 4: Placement Prep", duration: "Month 6", description: "Practice mock interviews and algorithm challenges." },
        ],
      });
    } finally {
      setLoading(false);
    }
  };

  const handleExportImage = async () => {
    if (!roadmapRef.current) return;
    setExportingImg(true);

    try {
      const dataUrl = await toPng(roadmapRef.current, {
        cacheBust: true,
        backgroundColor: "#0b0f19", // Clean dark background matching theme
      });
      const link = document.createElement("a");
      link.download = `${targetRole.replace(/\s+/g, "_")}_Roadmap.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to export roadmap image:", err);
    } finally {
      setExportingImg(false);
    }
  };

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
      {/* Header */}
      <Box sx={{ textAlign: "center", pt: 1 }}>
        <Chip
          label="AI CAREER ROADMAP ENGINE"
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
            fontSize: { xs: "2rem", sm: "2.75rem", md: "3.25rem" },
            mb: 1,
          }}
        >
          AI-Powered Career Pathway
        </Typography>

        <Typography variant="body1" sx={{ color: "rgba(203, 213, 225, 0.8)", maxWidth: "650px", mx: "auto" }}>
          Input your target job role to generate a personalized learning roadmap, skill progression timeline, and exportable image.
        </Typography>
      </Box>

      {/* Input Control Box */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: "20px",
          bgcolor: "rgba(17, 24, 39, 0.65)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={6}>
            <TextField
              fullWidth
              label="Target Role or Goal"
              placeholder="e.g. Cloud Architect, AI Engineer, Full Stack Developer"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              InputProps={{
                sx: { color: "#fff", borderRadius: "12px" },
              }}
              InputLabelProps={{ sx: { color: "rgba(203, 213, 225, 0.7)" } }}
            />
          </Grid>
          <Grid item xs={12} sm={3} md={3}>
            <TextField
              fullWidth
              label="Target Timeframe"
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              InputProps={{
                sx: { color: "#fff", borderRadius: "12px" },
              }}
              InputLabelProps={{ sx: { color: "rgba(203, 213, 225, 0.7)" } }}
            />
          </Grid>
          <Grid item xs={12} sm={3} md={3}>
            <Button
              fullWidth
              variant="contained"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <AutoAwesomeIcon />}
              onClick={handleGenerateRoadmap}
              sx={{
                py: 1.8,
                borderRadius: "12px",
                fontWeight: 800,
                bgcolor: "#2563eb",
                "&:hover": { bgcolor: "#1d4ed8" },
              }}
            >
              {loading ? "Generating..." : "Generate AI Path"}
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {errorMsg && (
        <Alert severity="error" sx={{ borderRadius: "12px" }}>
          {errorMsg}
        </Alert>
      )}

      {/* Generated Roadmap Display Area */}
      {roadmap && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {/* Action Bar */}
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h5" fontWeight={800} sx={{ color: "#fff" }}>
              Personalized Pathway: <span style={{ color: "#60a5fa" }}>{roadmap.role}</span>
            </Typography>

            <Button
              variant="outlined"
              startIcon={exportingImg ? <CircularProgress size={18} color="inherit" /> : <ImageIcon />}
              onClick={handleExportImage}
              disabled={exportingImg}
              sx={{
                borderRadius: "12px",
                fontWeight: 700,
                color: "#38bdf8",
                borderColor: "rgba(56, 189, 248, 0.4)",
                "&:hover": { borderColor: "#38bdf8", bgcolor: "rgba(56, 189, 248, 0.1)" },
              }}
            >
              Save Image
            </Button>
          </Stack>

          {/* Targeted Export Wrapper */}
          <Box
            ref={roadmapRef}
            sx={{ display: "flex", flexDirection: "column", gap: 3, p: { xs: 0, sm: 2 }, borderRadius: "16px" }}
          >
            <Alert severity="info" sx={{ borderRadius: "12px" }}>
              {roadmap.overview}
            </Alert>

            <Grid container spacing={3}>
              {/* Must-Have Technical Skills */}
              <Grid item xs={12} md={6}>
                <Card
                  sx={{
                    p: 3,
                    borderRadius: "20px",
                    height: "100%",
                    bgcolor: "rgba(17, 24, 39, 0.65)",
                    backdropFilter: "blur(16px)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                  }}
                >
                  <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
                    <CodeIcon sx={{ color: "#60a5fa" }} />
                    <Typography variant="h6" fontWeight={800} sx={{ color: "#fff" }}>
                      Must-Have Technical Skills
                    </Typography>
                  </Stack>
                  <Divider sx={{ mb: 2, borderColor: "rgba(255, 255, 255, 0.08)" }} />
                  <List disablePadding>
                    {roadmap.coreSkills?.map((skill, idx) => (
                      <ListItem key={idx} disableGutters sx={{ py: 0.8 }}>
                        <ListItemIcon sx={{ minWidth: 32, color: "#60a5fa" }}>
                          <CheckCircleOutlinedIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                          primary={skill}
                          primaryTypographyProps={{ fontSize: "0.92rem", color: "rgba(203, 213, 225, 0.9)", fontWeight: 600 }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Card>
              </Grid>

              {/* Target Certifications & Platforms */}
              <Grid item xs={12} md={6}>
                <Card
                  sx={{
                    p: 3,
                    borderRadius: "20px",
                    height: "100%",
                    bgcolor: "rgba(17, 24, 39, 0.65)",
                    backdropFilter: "blur(16px)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
                      <WorkspacePremiumIcon sx={{ color: "#f59e0b" }} />
                      <Typography variant="h6" fontWeight={800} sx={{ color: "#fff" }}>
                        Target Certifications
                      </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} flexWrap="wrap" rowGap={1} sx={{ mb: 3 }}>
                      {roadmap.certifications?.map((cert, idx) => (
                        <Chip
                          key={idx}
                          label={cert}
                          sx={{
                            bgcolor: "rgba(245, 158, 11, 0.12)",
                            color: "#f59e0b",
                            border: "1px solid rgba(245, 158, 11, 0.3)",
                            fontWeight: 700,
                            fontSize: "0.78rem",
                          }}
                        />
                      ))}
                    </Stack>
                  </Box>

                  <Box>
                    <Divider sx={{ my: 2, borderColor: "rgba(255, 255, 255, 0.08)" }} />
                    <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
                      <MenuBookIcon sx={{ color: "#60a5fa" }} />
                      <Typography variant="subtitle1" fontWeight={800} sx={{ color: "#fff" }}>
                        Recommended Practice Platforms
                      </Typography>
                    </Stack>
                    {roadmap.practicePlatforms?.map((platform, idx) => (
                      <Box key={idx} sx={{ mb: 1 }}>
                        <Typography variant="subtitle2" fontWeight={700} sx={{ color: "#60a5fa" }}>
                          {platform.name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: "rgba(203, 213, 225, 0.7)" }}>
                          {platform.focus}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Card>
              </Grid>

              {/* Execution Timeline */}
              <Grid item xs={12}>
                <Card
                  sx={{
                    p: 3,
                    borderRadius: "20px",
                    bgcolor: "rgba(17, 24, 39, 0.65)",
                    backdropFilter: "blur(16px)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                  }}
                >
                  <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 3 }}>
                    <TimelineIcon sx={{ color: "#60a5fa" }} />
                    <Typography variant="h6" fontWeight={800} sx={{ color: "#fff" }}>
                      Execution Timeline
                    </Typography>
                  </Stack>

                  <Grid container spacing={2}>
                    {roadmap.timeline?.map((step, idx) => (
                      <Grid item xs={12} sm={6} md={3} key={idx}>
                        <Paper
                          elevation={0}
                          sx={{
                            p: 2.5,
                            height: "100%",
                            borderRadius: "16px",
                            bgcolor: "rgba(255, 255, 255, 0.03)",
                            border: "1px solid rgba(255, 255, 255, 0.08)",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                          }}
                        >
                          <Box>
                            <Chip
                              label={step.duration}
                              size="small"
                              sx={{
                                mb: 1.5,
                                fontWeight: 800,
                                fontSize: "0.68rem",
                                bgcolor: "rgba(37, 99, 235, 0.2)",
                                color: "#60a5fa",
                              }}
                            />
                            <Typography variant="subtitle2" fontWeight={800} sx={{ color: "#fff", mb: 1 }}>
                              {step.phase}
                            </Typography>
                            <Typography variant="body2" sx={{ color: "rgba(203, 213, 225, 0.7)", fontSize: "0.82rem" }}>
                              {step.description}
                            </Typography>
                          </Box>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Box>
      )}
    </Box>
  );
}