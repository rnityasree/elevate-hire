import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  Grid,
  TextField,
  Button,
  Stack,
  Chip,
  Divider,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";

import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import WorkIcon from "@mui/icons-material/Work";
import CodeIcon from "@mui/icons-material/Code";
import PersonIcon from "@mui/icons-material/Person";

const ResumeBuilder = () => {
  const [loadingAi, setLoadingAi] = useState(false);
  const [aiNotice, setAiNotice] = useState("");

  // Live Resume Form State
  const [resumeData, setResumeData] = useState({
    fullName: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 019-2834",
    summary:
      "Passionate Software Engineer skilled in React, Node.js, and modern full-stack web applications with a focus on scalable UI components.",
    skills: ["JavaScript", "React", "Node.js", "MongoDB", "MUI", "Git"],
    experience: [
      {
        id: 1,
        role: "Frontend Developer Intern",
        company: "Tech Solutions Inc.",
        duration: "2025 - Present",
        details: "Built responsive dashboards using React and Material-UI.",
      },
    ],
    education: [
      {
        id: 1,
        degree: "B.S. in Computer Science",
        school: "State University",
        year: "2022 - 2026",
      },
    ],
  });

  const [newSkill, setNewSkill] = useState("");

  // AI Instant Summarizer / Enhancer
  const handleAiEnhanceSummary = async () => {
    setLoadingAi(true);
    setAiNotice("");
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setResumeData((prev) => ({
        ...prev,
        summary:
          "Results-driven Full-Stack Software Engineer specializing in modern MERN architectures, responsive UI/UX systems, and API optimization. Proven track record in designing high-performance React applications with glassmorphic design standards.",
      }));
      setAiNotice("Summary enhanced with high-impact keywords!");
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingAi(false);
    }
  };

  // Add & Remove Skills
  const handleAddSkill = () => {
    if (newSkill.trim() && !resumeData.skills.includes(newSkill.trim())) {
      setResumeData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));
      setNewSkill("");
    }
  };

  const handleDeleteSkill = (skillToDelete) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skillToDelete),
    }));
  };

  // Print / Export to PDF using browser print
  const handleExportPdf = () => {
    window.print();
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
          label="AI POWERED EDITOR"
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
          AI Resume Builder
        </Typography>

        <Typography variant="body1" sx={{ color: "rgba(203, 213, 225, 0.8)", maxWidth: "560px", mx: "auto" }}>
          Edit your sections live, refine your content with one-click AI prompts, and export to PDF instantly.
        </Typography>
      </Box>

      {/* Top Action Bar */}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" fontWeight={800} sx={{ color: "#fff" }}>
          Live Interactive Canvas
        </Typography>
        <Button
          variant="contained"
          startIcon={<PictureAsPdfIcon />}
          onClick={handleExportPdf}
          sx={{
            borderRadius: "12px",
            fontWeight: 700,
            px: 3,
            background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
          }}
        >
          Export PDF
        </Button>
      </Stack>

      {aiNotice && (
        <Alert severity="success" onClose={() => setAiNotice("")} sx={{ borderRadius: "12px" }}>
          {aiNotice}
        </Alert>
      )}

      {/* Grid: Editor Left, Live Preview Right */}
      <Grid container spacing={3}>
        {/* Editor Column */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              borderRadius: "20px",
              p: 3,
              bgcolor: "rgba(17, 24, 39, 0.65)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            {/* Personal Details Section */}
            <Box>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
                <PersonIcon sx={{ color: "#60a5fa" }} />
                <Typography variant="subtitle1" fontWeight={800} sx={{ color: "#fff" }}>
                  Personal Information
                </Typography>
              </Stack>

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Full Name"
                    fullWidth
                    size="small"
                    value={resumeData.fullName}
                    onChange={(e) => setResumeData({ ...resumeData, fullName: e.target.value })}
                    InputLabelProps={{ style: { color: "rgba(203, 213, 225, 0.7)" } }}
                    InputProps={{
                      style: { color: "#fff" },
                      sx: { borderRadius: "10px", bgcolor: "rgba(255, 255, 255, 0.03)" },
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Email"
                    fullWidth
                    size="small"
                    value={resumeData.email}
                    onChange={(e) => setResumeData({ ...resumeData, email: e.target.value })}
                    InputLabelProps={{ style: { color: "rgba(203, 213, 225, 0.7)" } }}
                    InputProps={{
                      style: { color: "#fff" },
                      sx: { borderRadius: "10px", bgcolor: "rgba(255, 255, 255, 0.03)" },
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Phone"
                    fullWidth
                    size="small"
                    value={resumeData.phone}
                    onChange={(e) => setResumeData({ ...resumeData, phone: e.target.value })}
                    InputLabelProps={{ style: { color: "rgba(203, 213, 225, 0.7)" } }}
                    InputProps={{
                      style: { color: "#fff" },
                      sx: { borderRadius: "10px", bgcolor: "rgba(255, 255, 255, 0.03)" },
                    }}
                  />
                </Grid>
              </Grid>
            </Box>

            <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.08)" }} />

            {/* AI Summary Section */}
            <Box>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.5 }}>
                <Typography variant="subtitle1" fontWeight={800} sx={{ color: "#fff" }}>
                  Professional Summary
                </Typography>

                <Button
                  size="small"
                  startIcon={loadingAi ? <CircularProgress size={14} color="inherit" /> : <AutoAwesomeIcon />}
                  onClick={handleAiEnhanceSummary}
                  disabled={loadingAi}
                  sx={{
                    color: "#c084fc",
                    bgcolor: "rgba(192, 132, 252, 0.1)",
                    fontWeight: 700,
                    textTransform: "none",
                    borderRadius: "8px",
                    "&:hover": { bgcolor: "rgba(192, 132, 252, 0.2)" },
                  }}
                >
                  AI Polish
                </Button>
              </Stack>

              <TextField
                multiline
                rows={3}
                fullWidth
                value={resumeData.summary}
                onChange={(e) => setResumeData({ ...resumeData, summary: e.target.value })}
                InputProps={{
                  style: { color: "#fff" },
                  sx: { borderRadius: "10px", bgcolor: "rgba(255, 255, 255, 0.03)" },
                }}
              />
            </Box>

            <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.08)" }} />

            {/* Skills Input */}
            <Box>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
                <CodeIcon sx={{ color: "#34d399" }} />
                <Typography variant="subtitle1" fontWeight={800} sx={{ color: "#fff" }}>
                  Skills & Expertise
                </Typography>
              </Stack>

              <Stack direction="row" spacing={1} sx={{ mb: 1.5 }}>
                <TextField
                  size="small"
                  fullWidth
                  placeholder="Add a skill (e.g., Python)..."
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAddSkill()}
                  InputProps={{
                    style: { color: "#fff" },
                    sx: { borderRadius: "10px", bgcolor: "rgba(255, 255, 255, 0.03)" },
                  }}
                />
                <Button
                  variant="outlined"
                  startIcon={<AddCircleOutlinedIcon />}
                  onClick={handleAddSkill}
                  sx={{ borderRadius: "10px", color: "#34d399", borderColor: "rgba(52, 211, 153, 0.3)" }}
                >
                  Add
                </Button>
              </Stack>

              <Stack direction="row" spacing={1} flexWrap="wrap" rowGap={1}>
                {resumeData.skills.map((skill, idx) => (
                  <Chip
                    key={idx}
                    label={skill}
                    onDelete={() => handleDeleteSkill(skill)}
                    sx={{
                      bgcolor: "rgba(52, 211, 153, 0.15)",
                      color: "#34d399",
                      fontWeight: 700,
                      borderRadius: "8px",
                      "& .MuiChip-deleteIcon": { color: "#34d399" },
                    }}
                  />
                ))}
              </Stack>
            </Box>
          </Card>
        </Grid>

        {/* Real-time Document Paper Preview */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={10}
            sx={{
              p: 4,
              borderRadius: "16px",
              bgcolor: "#ffffff",
              color: "#1f2937",
              minHeight: 520,
              boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
            }}
          >
            {/* Header Preview */}
            <Box sx={{ borderBottom: "2px solid #2563eb", pb: 2, mb: 2 }}>
              <Typography variant="h4" fontWeight={900} sx={{ color: "#1e3a8a" }}>
                {resumeData.fullName || "Your Name"}
              </Typography>
              <Typography variant="body2" sx={{ color: "#4b5563" }}>
                {resumeData.email} • {resumeData.phone}
              </Typography>
            </Box>

            {/* Summary */}
            <Box sx={{ mb: 2.5 }}>
              <Typography variant="subtitle2" fontWeight={800} sx={{ color: "#2563eb", textTransform: "uppercase" }}>
                Professional Summary
              </Typography>
              <Typography variant="body2" sx={{ color: "#374151", mt: 0.5, lineHeight: 1.5 }}>
                {resumeData.summary}
              </Typography>
            </Box>

            {/* Skills */}
            <Box sx={{ mb: 2.5 }}>
              <Typography variant="subtitle2" fontWeight={800} sx={{ color: "#2563eb", textTransform: "uppercase", mb: 0.5 }}>
                Skills
              </Typography>
              <Typography variant="body2" sx={{ color: "#374151" }}>
                {resumeData.skills.join(" • ")}
              </Typography>
            </Box>

            {/* Experience */}
            <Box sx={{ mb: 2.5 }}>
              <Typography variant="subtitle2" fontWeight={800} sx={{ color: "#2563eb", textTransform: "uppercase", mb: 0.5 }}>
                Experience
              </Typography>
              {resumeData.experience.map((exp) => (
                <Box key={exp.id} sx={{ mb: 1 }}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" fontWeight={700}>
                      {exp.role} - {exp.company}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#6b7280" }}>
                      {exp.duration}
                    </Typography>
                  </Stack>
                  <Typography variant="caption" sx={{ color: "#4b5563", display: "block" }}>
                    {exp.details}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Education */}
            <Box>
              <Typography variant="subtitle2" fontWeight={800} sx={{ color: "#2563eb", textTransform: "uppercase", mb: 0.5 }}>
                Education
              </Typography>
              {resumeData.education.map((edu) => (
                <Box key={edu.id}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" fontWeight={700}>
                      {edu.degree}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#6b7280" }}>
                      {edu.year}
                    </Typography>
                  </Stack>
                  <Typography variant="caption" sx={{ color: "#4b5563", display: "block" }}>
                    {edu.school}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ResumeBuilder;