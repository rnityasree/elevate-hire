import { useEffect, useMemo, useState } from "react";
import API from "../services/api";

import {
  Box,
  Paper,
  Typography,
  Button,
  Chip,
  Stack,
  CircularProgress,
  TextField,
  InputAdornment,
  useTheme,
} from "@mui/material";

import Search from "@mui/icons-material/Search";
import Work from "@mui/icons-material/Work";
import Business from "@mui/icons-material/Business";
import LocationOn from "@mui/icons-material/LocationOn";
import Paid from "@mui/icons-material/Paid";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Launch from "@mui/icons-material/Launch";
import AutoAwesome from "@mui/icons-material/AutoAwesome";
import CheckCircle from "@mui/icons-material/CheckCircle";
import Cancel from "@mui/icons-material/Cancel";

function Jobs() {
  const theme = useTheme();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const res = await API.get("/jobs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setJobs(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const value = search.toLowerCase();
      return (
        job.title?.toLowerCase().includes(value) ||
        job.company?.toLowerCase().includes(value) ||
        job.location?.toLowerCase().includes(value)
      );
    });
  }, [jobs, search]);

  const saveJob = async (jobId) => {
    try {
      await API.post(
        "/applications/save",
        { jobId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Job saved.");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Unable to save job.");
    }
  };

  const applyJob = async (job) => {
    try {
      await API.post(
        "/applications/apply",
        {
          jobId: job._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      window.open(job.applyLink || job.applyUrl, "_blank");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Unable to apply.");
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="70vh"
        width="100%"
      >
        <CircularProgress size={60} sx={{ color: theme.palette.primary.main }} />
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
      {/* Aesthetic Hero Header */}
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
          icon={<AutoAwesome sx={{ fontSize: "14px !important", color: "#60a5fa" }} />}
          label="AI RECOMMENDED OPPORTUNITIES"
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
          Recommended Jobs
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "rgba(203, 213, 225, 0.8)",
            maxWidth: "560px",
            fontSize: { xs: "0.9rem", sm: "1rem" },
            lineHeight: 1.6,
            fontWeight: 400,
            mb: 3,
          }}
        >
          AI matched these opportunities based on your resume, ATS score, and extracted skills.
        </Typography>

        {/* Search Input Bar */}
        <Box sx={{ width: "100%", maxWidth: 640 }}>
          <TextField
            fullWidth
            placeholder="Search by job title, company or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: "text.secondary" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "16px",
                bgcolor: "rgba(17, 24, 39, 0.75)",
                backdropFilter: "blur(12px)",
                borderColor: "rgba(255, 255, 255, 0.1)",
                "&:hover fieldset": {
                  borderColor: "rgba(96, 165, 250, 0.4)",
                },
              },
            }}
          />
        </Box>
      </Box>

      {/* Results Count */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
        <Typography variant="h6" fontWeight={700} sx={{ color: "text.primary" }}>
          {filteredJobs.length} Jobs Found
        </Typography>
      </Box>

      {/* Empty State */}
      {filteredJobs.length === 0 && (
        <Paper
          sx={{
            p: 6,
            borderRadius: "20px",
            textAlign: "center",
            bgcolor: "rgba(17, 24, 39, 0.65)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          <Typography variant="h6" color="text.secondary">
            No matching jobs found.
          </Typography>
        </Paper>
      )}

      {/* Glassmorphic Job List Grid */}
      <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 3 }}>
        {filteredJobs.map((job) => (
          <Paper
            key={job._id}
            elevation={0}
            sx={{
              width: "100%",
              p: { xs: 2.5, sm: 3.5 },
              borderRadius: "20px",
              bgcolor: "rgba(17, 24, 39, 0.65)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              transition: "all 0.3s ease",
              display: "flex",
              flexDirection: "column",
              gap: 2.5,
              "&:hover": {
                borderColor: "rgba(96, 165, 250, 0.3)",
                boxShadow: "0 12px 30px rgba(0, 0, 0, 0.4)",
              },
            }}
          >
            {/* Main Header & Metadata Stack */}
            <Stack
              direction={{ xs: "column", md: "row" }}
              justifyContent="space-between"
              spacing={3}
            >
              <Box flex={1}>
                <Typography variant="h5" fontWeight={800} sx={{ color: "text.primary", mb: 1 }}>
                  {job.title}
                </Typography>

                <Stack
                  direction="row"
                  spacing={2.5}
                  flexWrap="wrap"
                  rowGap={1}
                  sx={{ color: "text.secondary" }}
                >
                  <Stack direction="row" spacing={0.8} alignItems="center">
                    <Business sx={{ fontSize: 18, color: theme.palette.primary.light }} />
                    <Typography variant="body2" fontWeight={600}>
                      {job.company}
                    </Typography>
                  </Stack>

                  <Stack direction="row" spacing={0.8} alignItems="center">
                    <LocationOn sx={{ fontSize: 18, color: "#ef4444" }} />
                    <Typography variant="body2">{job.location}</Typography>
                  </Stack>

                  <Stack direction="row" spacing={0.8} alignItems="center">
                    <Work sx={{ fontSize: 18, color: "#10b981" }} />
                    <Typography variant="body2">
                      {job.employmentType || "Full Time"}
                    </Typography>
                  </Stack>

                  {job.salary && (
                    <Stack direction="row" spacing={0.8} alignItems="center">
                      <Paid sx={{ fontSize: 18, color: "#f59e0b" }} />
                      <Typography variant="body2" fontWeight={600} sx={{ color: "#fbbf24" }}>
                        {job.salary}
                      </Typography>
                    </Stack>
                  )}
                </Stack>

                {job.description && (
                  <Typography
                    variant="body2"
                    sx={{ color: "rgba(203, 213, 225, 0.8)", lineHeight: 1.6, mt: 2 }}
                  >
                    {job.description}
                  </Typography>
                )}
              </Box>

              {/* Match Score & Skill Count Badges */}
              <Stack
                direction="row"
                spacing={1.5}
                alignItems="flex-start"
              >
                {job.matchPercentage && (
                  <Chip
                    icon={<AutoAwesome sx={{ fontSize: "15px !important", color: "#34d399 !important" }} />}
                    label={`ATS Match ${job.matchPercentage}%`}
                    sx={{
                      bgcolor: "rgba(16, 185, 129, 0.15)",
                      color: "#34d399",
                      border: "1px solid rgba(16, 185, 129, 0.3)",
                      fontWeight: 800,
                      borderRadius: "10px",
                      px: 1,
                    }}
                  />
                )}

                <Chip
                  label={`${job.skills?.length || 0} Skills`}
                  sx={{
                    bgcolor: "rgba(37, 99, 235, 0.15)",
                    color: "#60a5fa",
                    border: "1px solid rgba(37, 99, 235, 0.3)",
                    fontWeight: 700,
                    borderRadius: "10px",
                  }}
                />
              </Stack>
            </Stack>

            {/* Skills Sections */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
              {/* Required Skills */}
              {job.skills?.length > 0 && (
                <Box>
                  <Typography
                    variant="caption"
                    fontWeight={700}
                    sx={{ color: "text.secondary", letterSpacing: "0.5px", display: "block", mb: 0.8 }}
                  >
                    REQUIRED SKILLS
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" rowGap={1}>
                    {job.skills.map((skill) => (
                      <Chip
                        key={skill}
                        label={skill}
                        size="small"
                        sx={{
                          bgcolor: "rgba(255, 255, 255, 0.05)",
                          color: "text.primary",
                          border: "1px solid rgba(255, 255, 255, 0.12)",
                          borderRadius: "8px",
                          fontWeight: 600,
                        }}
                      />
                    ))}
                  </Stack>
                </Box>
              )}

              {/* Matched Skills */}
              {job.matchedSkills?.length > 0 && (
                <Box>
                  <Typography
                    variant="caption"
                    fontWeight={700}
                    sx={{ color: "#34d399", letterSpacing: "0.5px", display: "block", mb: 0.8 }}
                  >
                    MATCHED SKILLS
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" rowGap={1}>
                    {job.matchedSkills.map((skill) => (
                      <Chip
                        key={skill}
                        icon={<CheckCircle sx={{ fontSize: "14px !important", color: "#34d399 !important" }} />}
                        label={skill}
                        size="small"
                        sx={{
                          bgcolor: "rgba(16, 185, 129, 0.12)",
                          color: "#34d399",
                          border: "1px solid rgba(16, 185, 129, 0.25)",
                          borderRadius: "8px",
                          fontWeight: 600,
                        }}
                      />
                    ))}
                  </Stack>
                </Box>
              )}

              {/* Missing Skills */}
              {job.missingSkills?.length > 0 && (
                <Box>
                  <Typography
                    variant="caption"
                    fontWeight={700}
                    sx={{ color: "#fbbf24", letterSpacing: "0.5px", display: "block", mb: 0.8 }}
                  >
                    MISSING SKILLS
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" rowGap={1}>
                    {job.missingSkills.map((skill) => (
                      <Chip
                        key={skill}
                        icon={<Cancel sx={{ fontSize: "14px !important", color: "#f59e0b !important" }} />}
                        label={skill}
                        size="small"
                        sx={{
                          bgcolor: "rgba(245, 158, 11, 0.12)",
                          color: "#fbbf24",
                          border: "1px solid rgba(245, 158, 11, 0.25)",
                          borderRadius: "8px",
                          fontWeight: 600,
                        }}
                      />
                    ))}
                  </Stack>
                </Box>
              )}
            </Box>

            {/* Bottom Actions Bar */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                pt: 2,
                borderTop: "1px solid rgba(255, 255, 255, 0.06)",
              }}
            >
              <Button
                variant="contained"
                startIcon={<FavoriteBorder />}
                onClick={() => saveJob(job._id)}
                sx={{
                  borderRadius: "12px",
                  px: 3,
                  bgcolor: "rgba(37, 99, 235, 0.8)",
                  "&:hover": {
                    bgcolor: "#2563eb",
                  },
                }}
              >
                Save Job
              </Button>

              <Button
                variant="outlined"
                endIcon={<Launch />}
                onClick={() => applyJob(job)}
                sx={{
                  borderRadius: "12px",
                  borderColor: "rgba(37, 99, 235, 0.4)",
                  color: "#60a5fa",
                  px: 3,
                  "&:hover": {
                    bgcolor: "rgba(37, 99, 235, 0.15)",
                    borderColor: "#2563eb",
                  },
                }}
              >
                Apply Now
              </Button>
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
}

export default Jobs;