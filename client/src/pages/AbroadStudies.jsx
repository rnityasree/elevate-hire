import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Chip,
  CircularProgress,
  TextField,
  MenuItem,
  ToggleButtonGroup,
  ToggleButton,
  Paper,
  Alert,
  Stack,
  useTheme,
  alpha,
} from "@mui/material";

import PublicIcon from "@mui/icons-material/Public";
import SchoolIcon from "@mui/icons-material/School";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SearchIcon from "@mui/icons-material/Search";
import SyncIcon from "@mui/icons-material/Sync";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import LaunchIcon from "@mui/icons-material/Launch";
import axios from "axios";

const countries = ["All", "Germany", "United States", "Canada", "Australia"];
const disciplines = [
  "All",
  "Computer Science",
  "Software Engineering",
  "Data Science",
  "Cybersecurity",
];

const AbroadStudies = () => {
  const theme = useTheme();
  const [searchMode, setSearchMode] = useState("country");
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [selectedDiscipline, setSelectedDiscipline] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [error, setError] = useState("");

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const fetchPrograms = async () => {
    try {
      setLoading(true);
      setError("");

      const params = {};
      if (searchMode === "country" && selectedCountry !== "All") {
        params.country = selectedCountry;
      }
      if (searchMode === "course" && selectedDiscipline !== "All") {
        params.discipline = selectedDiscipline;
      }
      if (searchTerm) {
        params.search = searchTerm;
      }

      // Root-relative path with leading slash
      const res = await axios.get("/api/abroad", {
        headers: getAuthHeaders(),
        params,
        timeout: 8000,
      });

      setPrograms(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Fetch Error:", err);
      setError("Failed to fetch programs from backend.");
    } finally {
      setLoading(false);
    }
  };

  const handleSeed = async () => {
    try {
      setSeeding(true);
      setError("");

      // Root-relative path with leading slash
      await axios.post(
        "/api/abroad/seed",
        {},
        { headers: getAuthHeaders() }
      );
      await fetchPrograms();
    } catch (err) {
      console.error("Seed Error:", err);
      setError("Failed to seed sample programs. Check server console.");
    } finally {
      setSeeding(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, [searchMode, selectedCountry, selectedDiscipline]);

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
      {/* Aesthetic Header */}
      <Box
        sx={{
          textAlign: "center",
          width: "100%",
          pt: 1,
          pb: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Chip
          icon={<AutoAwesomeIcon sx={{ fontSize: "14px !important", color: "#60a5fa" }} />}
          label="GLOBAL EDUCATION ADVISOR"
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
          Abroad Studies & Career Advisor
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "rgba(203, 213, 225, 0.8)",
            maxWidth: "580px",
            fontSize: { xs: "0.9rem", sm: "1rem" },
            lineHeight: 1.6,
            fontWeight: 400,
            mb: 2,
          }}
        >
          Discover top international Master's programs, university rankings, and post-study work opportunities tailored to your career goals.
        </Typography>

        {/* Sync Button */}
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<SyncIcon />}
          onClick={handleSeed}
          disabled={seeding}
          sx={{
            borderRadius: "12px",
            borderColor: "rgba(168, 85, 247, 0.4)",
            color: "#c084fc",
            fontWeight: 700,
            px: 3,
            "&:hover": {
              borderColor: "#a855f7",
              bgcolor: "rgba(168, 85, 247, 0.12)",
            },
          }}
        >
          {seeding ? "Seeding..." : "Seed Sample Programs"}
        </Button>
      </Box>

      {error && (
        <Alert
          severity="error"
          sx={{
            borderRadius: "16px",
            bgcolor: "rgba(239, 68, 68, 0.12)",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            color: "#f87171",
          }}
          onClose={() => setError("")}
        >
          {error}
        </Alert>
      )}

      {/* Mode Switcher Filter Card */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2.5, sm: 3.5 },
          borderRadius: "20px",
          bgcolor: "rgba(17, 24, 39, 0.65)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          display: "flex",
          flexDirection: "column",
          gap: 2.5,
        }}
      >
        <Typography
          variant="caption"
          fontWeight={800}
          sx={{ color: "text.secondary", letterSpacing: "1px", textTransform: "uppercase" }}
        >
          Choose Search Pathway
        </Typography>

        <ToggleButtonGroup
          value={searchMode}
          exclusive
          onChange={(e, newMode) => newMode && setSearchMode(newMode)}
          sx={{
            bgcolor: "rgba(255, 255, 255, 0.03)",
            p: 0.5,
            borderRadius: "14px",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            width: "fit-content",
            "& .MuiToggleButton-root": {
              border: "none",
              borderRadius: "10px !important",
              color: "text.secondary",
              fontWeight: 700,
              px: { xs: 2, sm: 3 },
              py: 1,
              "&.Mui-selected": {
                bgcolor: "rgba(37, 99, 235, 0.25)",
                color: "#60a5fa",
                border: "1px solid rgba(96, 165, 250, 0.3)",
              },
            },
          }}
        >
          <ToggleButton value="country">
            <PublicIcon sx={{ mr: 1, fontSize: 18 }} /> Country-First Logic
          </ToggleButton>
          <ToggleButton value="course">
            <SchoolIcon sx={{ mr: 1, fontSize: 18 }} /> Course-First Logic
          </ToggleButton>
        </ToggleButtonGroup>

        {/* Dynamic Controls Grid */}
        <Box
          sx={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 2fr" },
            gap: 2,
          }}
        >
          {searchMode === "country" ? (
            <TextField
              select
              fullWidth
              label="Target Country"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "14px",
                  bgcolor: "rgba(255, 255, 255, 0.02)",
                  borderColor: "rgba(255, 255, 255, 0.12)",
                },
              }}
            >
              {countries.map((c) => (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              ))}
            </TextField>
          ) : (
            <TextField
              select
              fullWidth
              label="Target Specialization"
              value={selectedDiscipline}
              onChange={(e) => setSelectedDiscipline(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "14px",
                  bgcolor: "rgba(255, 255, 255, 0.02)",
                  borderColor: "rgba(255, 255, 255, 0.12)",
                },
              }}
            >
              {disciplines.map((d) => (
                <MenuItem key={d} value={d}>
                  {d}
                </MenuItem>
              ))}
            </TextField>
          )}

          <TextField
            fullWidth
            placeholder="Search by university name or program title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchPrograms()}
            InputProps={{
              endAdornment: (
                <Button
                  onClick={fetchPrograms}
                  variant="contained"
                  sx={{
                    borderRadius: "10px",
                    px: 2.5,
                    bgcolor: "rgba(37, 99, 235, 0.8)",
                    minWidth: "auto",
                    "&:hover": { bgcolor: "#2563eb" },
                  }}
                >
                  <SearchIcon />
                </Button>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "14px",
                bgcolor: "rgba(255, 255, 255, 0.02)",
                borderColor: "rgba(255, 255, 255, 0.12)",
              },
            }}
          />
        </Box>
      </Paper>

      {/* Program Display Content */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "40vh" }}>
          <CircularProgress size={60} sx={{ color: theme.palette.primary.main }} />
        </Box>
      ) : programs.length === 0 ? (
        <Paper
          elevation={0}
          sx={{
            textAlign: "center",
            p: 6,
            borderRadius: "20px",
            bgcolor: "rgba(17, 24, 39, 0.65)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          <SchoolIcon sx={{ fontSize: 60, color: "text.secondary", mb: 2, opacity: 0.7 }} />
          <Typography variant="h6" color="text.secondary">
            No university programs found.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Click "Seed Sample Programs" to populate initial international listings.
          </Typography>
        </Paper>
      ) : (
        <Box
          sx={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
            gap: 3,
          }}
        >
          {programs.map((program) => (
            <Card
              key={program._id}
              sx={{
                height: "100%",
                borderRadius: "20px",
                bgcolor: "rgba(17, 24, 39, 0.65)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                transition: "all 0.3s ease",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                p: 1,
                "&:hover": {
                  borderColor: "rgba(96, 165, 250, 0.3)",
                  boxShadow: "0 12px 30px rgba(0, 0, 0, 0.4)",
                  transform: "translateY(-4px)",
                },
              }}
            >
              <CardContent sx={{ p: 2.5 }}>
                {/* Badges Top Header */}
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                  <Chip
                    label={program.country}
                    size="small"
                    icon={<PublicIcon sx={{ fontSize: "14px !important" }} />}
                    sx={{
                      bgcolor: "rgba(37, 99, 235, 0.15)",
                      color: "#60a5fa",
                      border: "1px solid rgba(37, 99, 235, 0.3)",
                      fontWeight: 700,
                      borderRadius: "10px",
                    }}
                  />
                  {program.globalRanking && (
                    <Chip
                      label={`QS Rank #${program.globalRanking}`}
                      size="small"
                      sx={{
                        bgcolor: "rgba(168, 85, 247, 0.15)",
                        color: "#c084fc",
                        border: "1px solid rgba(168, 85, 247, 0.3)",
                        fontWeight: 700,
                        borderRadius: "10px",
                      }}
                    />
                  )}
                </Box>

                {/* Program & University Title */}
                <Typography variant="h5" fontWeight={800} sx={{ color: "text.primary", mb: 0.5 }}>
                  {program.programName}
                </Typography>

                <Typography variant="subtitle1" sx={{ color: "text.secondary", fontWeight: 600, mb: 2.5 }}>
                  {program.universityName} • {program.city}
                </Typography>

                {/* Tuition & Visa Meta Row */}
                <Stack direction="row" spacing={3} flexWrap="wrap" rowGap={1.5} sx={{ mb: 2.5 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                    <MonetizationOnIcon fontSize="small" sx={{ color: "#34d399" }} />
                    <Typography variant="body2" fontWeight={700} sx={{ color: "#34d399" }}>
                      {program.tuitionFeeUSD === 0
                        ? "Tuition Free"
                        : `$${program.tuitionFeeUSD.toLocaleString()}/yr`}
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                    <AccessTimeIcon fontSize="small" sx={{ color: "#fbbf24" }} />
                    <Typography variant="body2" fontWeight={600} sx={{ color: "text.secondary" }}>
                      PSW Visa: {program.postStudyWorkVisaYears} yrs
                    </Typography>
                  </Box>
                </Stack>

                {/* Exams Chips */}
                <Stack direction="row" spacing={1} flexWrap="wrap" rowGap={1}>
                  <Chip
                    label={`IELTS: ${program.examsRequired?.ieltsScore || "N/A"}`}
                    size="small"
                    sx={{
                      bgcolor: "rgba(255, 255, 255, 0.05)",
                      color: "text.primary",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      borderRadius: "8px",
                      fontWeight: 600,
                    }}
                  />
                  {program.examsRequired?.gre && (
                    <Chip
                      label="GRE Required"
                      size="small"
                      sx={{
                        bgcolor: "rgba(245, 158, 11, 0.15)",
                        color: "#fbbf24",
                        border: "1px solid rgba(245, 158, 11, 0.3)",
                        borderRadius: "8px",
                        fontWeight: 700,
                      }}
                    />
                  )}
                </Stack>
              </CardContent>

              {/* Action Link Footer */}
              <CardActions sx={{ p: 2.5, pt: 0 }}>
                <Button
                  variant="outlined"
                  fullWidth
                  endIcon={<LaunchIcon />}
                  href={program.officialWebsite || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    borderRadius: "12px",
                    borderColor: "rgba(37, 99, 235, 0.4)",
                    color: "#60a5fa",
                    fontWeight: 700,
                    "&:hover": {
                      bgcolor: "rgba(37, 99, 235, 0.15)",
                      borderColor: "#2563eb",
                    },
                  }}
                >
                  View Program Details
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default AbroadStudies;