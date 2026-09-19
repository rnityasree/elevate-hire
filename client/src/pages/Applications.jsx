import { useEffect, useMemo, useState } from "react";
import API from "../services/api";

import {
  Box,
  Typography,
  CircularProgress,
  FormControl,
  Select,
  MenuItem,
  Button,
  Stack,
  Chip,
  Card,
  alpha,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Paper,
} from "@mui/material";

import Business from "@mui/icons-material/Business";
import LocationOn from "@mui/icons-material/LocationOn";
import CalendarMonth from "@mui/icons-material/CalendarMonth";
import Delete from "@mui/icons-material/Delete";
import Timeline from "@mui/icons-material/Timeline";
import TrendingUp from "@mui/icons-material/TrendingUp";
import Bookmark from "@mui/icons-material/Bookmark";
import CheckCircleOutlined from "@mui/icons-material/CheckCircleOutlined";
import RecordVoiceOver from "@mui/icons-material/RecordVoiceOver";
import EmojiEvents from "@mui/icons-material/EmojiEvents";
import EventAvailable from "@mui/icons-material/EventAvailable";

function Applications() {
  const theme = useTheme();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Interview Modal State
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);
  const [interviewDate, setInterviewDate] = useState("");

  const token = localStorage.getItem("token");

  const loadApplications = async () => {
    try {
      const res = await API.get("/applications", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setApplications(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await API.put(
        `/applications/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      loadApplications();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteApplication = async (id) => {
    try {
      await API.delete(`/applications/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      loadApplications();
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatusChange = (app, newStatus) => {
    if (newStatus === "Interview") {
      setSelectedApp(app);
      setScheduleModalOpen(true);
    } else {
      updateStatus(app._id, newStatus);
    }
  };

  const handleSaveInterviewAndSync = async () => {
    if (selectedApp) {
      await updateStatus(selectedApp._id, "Interview");

      if (interviewDate) {
        const title = encodeURIComponent(
          `Interview: ${selectedApp.job?.title || "Role"} at ${
            selectedApp.job?.company || "Company"
          }`
        );
        const details = encodeURIComponent(
          `Interview scheduled via ElevateHire tracker.`
        );
        const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}`;
        window.open(googleCalendarUrl, "_blank");
      }
    }
    setScheduleModalOpen(false);
    setSelectedApp(null);
    setInterviewDate("");
  };

  const stats = useMemo(
    () => [
      {
        label: "Total",
        count: applications.length,
        icon: <TrendingUp />,
        color: "#60a5fa",
      },
      {
        label: "Saved",
        count: applications.filter((a) => a.status === "Saved").length,
        icon: <Bookmark />,
        color: "#3b82f6",
      },
      {
        label: "Applied",
        count: applications.filter((a) => a.status === "Applied").length,
        icon: <CheckCircleOutlined />,
        color: "#10b981",
      },
      {
        label: "Interview",
        count: applications.filter((a) => a.status === "Interview").length,
        icon: <RecordVoiceOver />,
        color: "#f59e0b",
      },
      {
        label: "Offers",
        count: applications.filter((a) => a.status === "Offer").length,
        icon: <EmojiEvents />,
        color: "#a855f7",
      },
    ],
    [applications]
  );

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh" width="100%">
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
        }}
      >
        <Chip
          label="REAL-TIME ANALYTICS"
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
          Application Tracker
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "rgba(203, 213, 225, 0.8)",
            maxWidth: "520px",
            fontSize: { xs: "0.9rem", sm: "1rem" },
            lineHeight: 1.6,
            fontWeight: 400,
          }}
        >
          Track every application, update progress, and manage your complete job search in real-time.
        </Typography>
      </Box>

      {/* Symmetrical 5-Column Stat Grid */}
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
        {stats.map((stat, index) => (
          <Card
            key={index}
            sx={{
              borderRadius: "20px",
              p: 3,
              textAlign: "center",
              bgcolor: "rgba(17, 24, 39, 0.65)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              transition: "all 0.3s ease",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              "&:hover": {
                transform: "translateY(-4px)",
                borderColor: alpha(stat.color, 0.4),
                boxShadow: `0 10px 25px -5px ${alpha(stat.color, 0.25)}`,
              },
            }}
          >
            <Typography variant="h3" fontWeight={800} sx={{ color: stat.color, mb: 0.5 }}>
              {stat.count}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.8px",
              }}
            >
              {stat.label}
            </Typography>
          </Card>
        ))}
      </Box>

      {/* Empty State */}
      {applications.length === 0 && (
        <Card
          sx={{
            width: "100%",
            p: 6,
            textAlign: "center",
            borderRadius: "20px",
            bgcolor: "rgba(17, 24, 39, 0.65)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          <Typography variant="h6" color="text.secondary">
            No job applications found yet. Start applying to populate your tracker!
          </Typography>
        </Card>
      )}

      {/* Glassmorphism List */}
      <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 2.5 }}>
        {applications.map((app) => (
          <Card
            key={app._id}
            sx={{
              width: "100%",
              borderRadius: "20px",
              p: { xs: 2.5, sm: 3.5 },
              bgcolor: "rgba(17, 24, 39, 0.65)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              transition: "all 0.3s ease",
              "&:hover": {
                borderColor: "rgba(255, 255, 255, 0.18)",
                boxShadow: "0 12px 30px rgba(0, 0, 0, 0.4)",
              },
            }}
          >
            {/* Top Row */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2, flexWrap: "wrap", gap: 1 }}>
              <Typography variant="h5" fontWeight={700} sx={{ color: "text.primary" }}>
                {app.job?.title || "Role Title Unavailable"}
              </Typography>

              <Chip
                icon={<Timeline sx={{ fontSize: "16px !important" }} />}
                label={app.status}
                sx={{
                  bgcolor:
                    app.status === "Offer"
                      ? "rgba(168, 85, 247, 0.15)"
                      : app.status === "Interview"
                      ? "rgba(245, 158, 11, 0.15)"
                      : app.status === "Applied"
                      ? "rgba(16, 185, 129, 0.15)"
                      : app.status === "Rejected"
                      ? "rgba(239, 68, 68, 0.15)"
                      : "rgba(59, 130, 246, 0.15)",
                  color:
                    app.status === "Offer"
                      ? "#c084fc"
                      : app.status === "Interview"
                      ? "#fbbf24"
                      : app.status === "Applied"
                      ? "#34d399"
                      : app.status === "Rejected"
                      ? "#f87171"
                      : "#60a5fa",
                  border: "1px solid currentColor",
                  fontWeight: 700,
                  borderRadius: "10px",
                  px: 1,
                }}
              />
            </Box>

            {/* Sub Info Row */}
            <Stack direction="row" spacing={3} flexWrap="wrap" sx={{ color: "text.secondary", mb: 2, rowGap: 1.5 }}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Business sx={{ fontSize: 18, color: theme.palette.primary.light }} />
                <Typography variant="body2">{app.job?.company || "N/A"}</Typography>
              </Stack>

              <Stack direction="row" spacing={1} alignItems="center">
                <LocationOn sx={{ fontSize: 18, color: "#ef4444" }} />
                <Typography variant="body2">{app.job?.location || "N/A"}</Typography>
              </Stack>

              <Stack direction="row" spacing={1} alignItems="center">
                <CalendarMonth sx={{ fontSize: 18, color: "#10b981" }} />
                <Typography variant="body2">
                  {app.appliedDate ? new Date(app.appliedDate).toLocaleDateString() : "Recently"}
                </Typography>
              </Stack>
            </Stack>

            {/* Interview Quick Sync Banner if Status is Interview */}
            {app.status === "Interview" && (
              <Paper
                elevation={0}
                sx={{
                  mb: 2.5,
                  p: 1.5,
                  borderRadius: "12px",
                  bgcolor: "rgba(245, 158, 11, 0.08)",
                  border: "1px solid rgba(245, 158, 11, 0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: 1,
                }}
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  <RecordVoiceOver sx={{ color: "#fbbf24", fontSize: 20 }} />
                  <Typography variant="body2" fontWeight={600} sx={{ color: "#f3f4f6" }}>
                    Interview Stage Active
                  </Typography>
                </Stack>

                <Button
                  size="small"
                  startIcon={<EventAvailable />}
                  sx={{ color: "#fbbf24", fontWeight: 700, textTransform: "none" }}
                  onClick={() => {
                    const title = encodeURIComponent(`Interview: ${app.job?.title} at ${app.job?.company}`);
                    window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}`, "_blank");
                  }}
                >
                  Sync Google Calendar
                </Button>
              </Paper>
            )}

            {/* Actions Bar */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 2,
                pt: 2.5,
                borderTop: "1px solid rgba(255, 255, 255, 0.06)",
              }}
            >
              <FormControl size="small" sx={{ minWidth: 200 }}>
                <Select
                  value={app.status}
                  onChange={(e) => handleStatusChange(app, e.target.value)}
                  sx={{
                    borderRadius: "12px",
                    bgcolor: "rgba(255, 255, 255, 0.03)",
                    color: "text.primary",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(255, 255, 255, 0.12)",
                    },
                  }}
                >
                  <MenuItem value="Saved">Saved</MenuItem>
                  <MenuItem value="Applied">Applied</MenuItem>
                  <MenuItem value="Interview">Interview</MenuItem>
                  <MenuItem value="Offer">Offer</MenuItem>
                  <MenuItem value="Rejected">Rejected</MenuItem>
                </Select>
              </FormControl>

              <Button
                variant="outlined"
                color="error"
                startIcon={<Delete />}
                onClick={() => deleteApplication(app._id)}
                sx={{
                  borderRadius: "12px",
                  borderColor: "rgba(239, 68, 68, 0.3)",
                  color: "#f87171",
                  "&:hover": {
                    bgcolor: "rgba(239, 68, 68, 0.1)",
                    borderColor: "#ef4444",
                  },
                }}
              >
                Delete Application
              </Button>
            </Box>
          </Card>
        ))}
      </Box>

      {/* Schedule Interview Dialog */}
      <Dialog
        open={scheduleModalOpen}
        onClose={() => setScheduleModalOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: "20px",
            bgcolor: "rgba(17, 24, 39, 0.95)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            color: "#fff",
            p: 1,
            width: "100%",
            maxWidth: 480,
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 800 }}>Schedule Interview</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
          <Typography variant="body2" sx={{ color: "rgba(203, 213, 225, 0.8)" }}>
            Select your interview date & time for <strong>{selectedApp?.job?.title}</strong> at{" "}
            <strong>{selectedApp?.job?.company}</strong>.
          </Typography>

          <TextField
            type="datetime-local"
            fullWidth
            value={interviewDate}
            onChange={(e) => setInterviewDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              style: { color: "#fff" },
              sx: {
                borderRadius: "12px",
                bgcolor: "rgba(255, 255, 255, 0.03)",
                "& fieldset": { borderColor: "rgba(255, 255, 255, 0.12)" },
              },
            }}
          />
        </DialogContent>

        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button
            onClick={() => setScheduleModalOpen(false)}
            sx={{ color: "rgba(203, 213, 225, 0.7)", textTransform: "none" }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSaveInterviewAndSync}
            sx={{
              borderRadius: "10px",
              fontWeight: 700,
              background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
            }}
          >
            Save & Sync Calendar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Applications;