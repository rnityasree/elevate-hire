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
  InputAdornment,
  Alert,
  Paper,
  Stack,
  useTheme,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import SyncIcon from "@mui/icons-material/Sync";
import WorkIcon from "@mui/icons-material/Work";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BusinessIcon from "@mui/icons-material/Business";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import LaunchIcon from "@mui/icons-material/Launch";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";

import axios from "axios";

const GovJobs = () => {
  const theme = useTheme();
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sectorFilter, setSectorFilter] = useState("All");
  const [error, setError] = useState("");

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const fetchOpportunities = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.get("http://localhost:5000/api/opportunities", {
        headers: getAuthHeaders(),
      });

      const data = Array.isArray(res.data)
        ? res.data
        : res.data?.opportunities || [];
      setOpportunities(data);
    } catch (err) {
      console.error("Fetch Opportunities Error:", err.response || err);
      setError("Failed to fetch opportunities. Check backend status.");
      setOpportunities([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSync = async () => {
    try {
      setSyncing(true);
      setError("");

      await axios.post(
        "http://localhost:5000/api/opportunities/sync-gov",
        {},
        { headers: getAuthHeaders() }
      );

      await fetchOpportunities();
    } catch (err) {
      console.error("Sync Error:", err.response || err);
      setError("Failed to sync live data.");
    } finally {
      setSyncing(false);
    }
  };

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const safeOpportunities = Array.isArray(opportunities) ? opportunities : [];
  const filteredJobs = safeOpportunities.filter((job) => {
    const matchesSearch =
      (job?.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (job?.company || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (job?.location || "").toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSector =
      sectorFilter === "All" ||
      (job?.category || "Government").toLowerCase() === sectorFilter.toLowerCase();

    return matchesSearch && matchesSector;
  });

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
          label="LIVE INDIAN OPPORTUNITIES HUB"
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

        {/* Display Title */}
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
          Fetch Jobs
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "rgba(203, 213, 225, 0.8)",
            maxWidth: "580px",
            fontSize: { xs: "0.9rem", sm: "1rem" },
            lineHeight: 1.6,
            fontWeight: 400,
            mb: 2.5,
          }}
        >
          Aggregated live listings across Public, PSU, Government, and Corporate sectors in India.
        </Typography>

        <Button
          variant="contained"
          startIcon={<SyncIcon />}
          onClick={handleSync}
          disabled={syncing}
          sx={{
            borderRadius: "12px",
            px: 3.5,
            py: 1,
            fontWeight: 700,
            bgcolor: "rgba(37, 99, 235, 0.85)",
            "&:hover": { bgcolor: "#2563eb" },
          }}
        >
          {syncing ? "Syncing Live Data..." : "Sync Live Opportunities"}
        </Button>
      </Box>

      {/* Error Banner */}
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

      {/* Filter and Search Container Bar */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2.5, sm: 3 },
          borderRadius: "20px",
          bgcolor: "rgba(17, 24, 39, 0.65)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2.5,
        }}
      >
        {/* Sector Tabs Toggle */}
        <ToggleButtonGroup
          value={sectorFilter}
          exclusive
          onChange={(e, newSector) => newSector && setSectorFilter(newSector)}
          sx={{
            bgcolor: "rgba(255, 255, 255, 0.03)",
            p: 0.5,
            borderRadius: "14px",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            width: { xs: "100%", md: "auto" },
            display: "flex",
            justifyContent: "center",
            "& .MuiToggleButton-root": {
              flex: 1,
              border: "none",
              borderRadius: "10px !important",
              color: "text.secondary",
              fontWeight: 700,
              fontSize: "0.85rem",
              px: { xs: 1.5, sm: 2.5 },
              py: 0.8,
              "&.Mui-selected": {
                bgcolor: "rgba(37, 99, 235, 0.25)",
                color: "#60a5fa",
                border: "1px solid rgba(96, 165, 250, 0.3)",
              },
            },
          }}
        >
          <ToggleButton value="All">
            <WorkIcon sx={{ mr: 0.8, fontSize: 16 }} /> All Sectors
          </ToggleButton>
          <ToggleButton value="Government">
            <AccountBalanceIcon sx={{ mr: 0.8, fontSize: 16 }} /> Government
          </ToggleButton>
          <ToggleButton value="Private">
            <CorporateFareIcon sx={{ mr: 0.8, fontSize: 16 }} /> Private
          </ToggleButton>
        </ToggleButtonGroup>

        {/* Search Bar */}
        <Box sx={{ width: { xs: "100%", md: "480px" } }}>
          <TextField
            fullWidth
            placeholder="Search by job title, company, or location (e.g. Bengaluru, SBI)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "text.secondary" }} />
                </InputAdornment>
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

      {/* Cards Grid Content */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "40vh" }}>
          <CircularProgress size={60} sx={{ color: theme.palette.primary.main }} />
        </Box>
      ) : filteredJobs.length === 0 ? (
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
          <WorkIcon sx={{ fontSize: 60, color: "text.secondary", mb: 2, opacity: 0.7 }} />
          <Typography variant="h6" color="text.secondary">
            No opportunities found.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Click "Sync Live Opportunities" to fetch updated Indian listings.
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
          {filteredJobs.map((job, idx) => {
            const isPrivate = job.category === "Private";

            return (
              <Card
                key={job._id || idx}
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
                    borderColor: isPrivate ? "rgba(168, 85, 247, 0.4)" : "rgba(96, 165, 250, 0.4)",
                    boxShadow: "0 12px 30px rgba(0, 0, 0, 0.4)",
                    transform: "translateY(-4px)",
                  },
                }}
              >
                <CardContent sx={{ p: 2.5 }}>
                  <Box sx={{ mb: 2 }}>
                    <Chip
                      icon={
                        isPrivate ? (
                          <CorporateFareIcon sx={{ fontSize: "14px !important" }} />
                        ) : (
                          <AccountBalanceIcon sx={{ fontSize: "14px !important" }} />
                        )
                      }
                      label={job.category || "Government"}
                      size="small"
                      sx={{
                        bgcolor: isPrivate ? "rgba(168, 85, 247, 0.15)" : "rgba(37, 99, 235, 0.15)",
                        color: isPrivate ? "#c084fc" : "#60a5fa",
                        border: `1px solid ${isPrivate ? "rgba(168, 85, 247, 0.3)" : "rgba(37, 99, 235, 0.3)"}`,
                        fontWeight: 700,
                        borderRadius: "10px",
                        px: 0.5,
                      }}
                    />
                  </Box>

                  <Typography variant="h5" fontWeight={800} sx={{ color: "text.primary", mb: 0.8 }}>
                    {job.title || "Untitled Opportunity"}
                  </Typography>

                  <Stack direction="row" spacing={2.5} flexWrap="wrap" rowGap={1} sx={{ mt: 1.5, color: "text.secondary" }}>
                    <Stack direction="row" spacing={0.8} alignItems="center">
                      <BusinessIcon sx={{ fontSize: 18, color: theme.palette.primary.light }} />
                      <Typography variant="body2" fontWeight={600}>
                        {job.company || "Organization"}
                      </Typography>
                    </Stack>

                    <Stack direction="row" spacing={0.8} alignItems="center">
                      <LocationOnIcon sx={{ fontSize: 18, color: "#ef4444" }} />
                      <Typography variant="body2">{job.location || "India"}</Typography>
                    </Stack>
                  </Stack>
                </CardContent>

                <CardActions sx={{ p: 2.5, pt: 0 }}>
                  <Button
                    variant="outlined"
                    fullWidth
                    endIcon={<LaunchIcon />}
                    href={job.applicationLink || "#"}
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
                    View & Apply
                  </Button>
                </CardActions>
              </Card>
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default GovJobs;