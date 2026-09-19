import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
  Stack,
  Chip,
  Alert,
} from "@mui/material";

import WorkIcon from "@mui/icons-material/Work";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

const ApplyJobModal = ({ open, handleClose, job, onApplySuccess }) => {
  const [coverNote, setCoverNote] = useState("");
  const [interviewDate, setInterviewDate] = useState("");
  const [syncCalendar, setSyncCalendar] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      // Simulate API submit to /api/applications
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (syncCalendar && interviewDate) {
        // Construct Google Calendar Event Creation Link
        const eventTitle = encodeURIComponent(`Interview: ${job?.title || "Job Application"} at ${job?.company || "Company"}`);
        const eventDetails = encodeURIComponent(`Interview scheduled via ElevateHire.\nCover Note: ${coverNote}`);
        const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&details=${eventDetails}`;
        
        window.open(googleCalendarUrl, "_blank");
      }

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setSubmitting(false);
        onApplySuccess && onApplySuccess();
        handleClose();
      }, 1200);
    } catch (err) {
      setSubmitting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: "20px",
          bgcolor: "rgba(17, 24, 39, 0.95)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          color: "#fff",
          p: 1,
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: 800, fontSize: "1.4rem" }}>
        Apply to {job?.title || "Position"}
      </DialogTitle>

      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2.5, pt: 1 }}>
        {success && (
          <Alert severity="success" sx={{ borderRadius: "12px" }}>
            Application submitted & added to tracking!
          </Alert>
        )}

        <Box sx={{ p: 2, borderRadius: "12px", bgcolor: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.08)" }}>
          <Typography variant="subtitle2" fontWeight={700} sx={{ color: "#60a5fa" }}>
            {job?.company || "Company"}
          </Typography>
          <Typography variant="caption" sx={{ color: "rgba(203, 213, 225, 0.7)" }}>
            {job?.location || "Remote"} • {job?.type || "Full-Time"}
          </Typography>
        </Box>

        <TextField
          label="Quick Cover Note / Pitch"
          multiline
          rows={3}
          fullWidth
          value={coverNote}
          onChange={(e) => setCoverNote(e.target.value)}
          placeholder="Briefly explain why you're a fit..."
          InputLabelProps={{ style: { color: "rgba(203, 213, 225, 0.7)" } }}
          InputProps={{
            style: { color: "#fff" },
            sx: {
              borderRadius: "12px",
              bgcolor: "rgba(255, 255, 255, 0.03)",
              "& fieldset": { borderColor: "rgba(255, 255, 255, 0.1)" },
            },
          }}
        />

        <Box>
          <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1, color: "#f3f4f6" }}>
            Optional: Propose Preferred Interview Date
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
                "& fieldset": { borderColor: "rgba(255, 255, 255, 0.1)" },
              },
            }}
          />
        </Box>

        {interviewDate && (
          <Chip
            icon={<CalendarMonthIcon sx={{ fontSize: "16px !important", color: "#60a5fa" }} />}
            label="Will launch Google Calendar Event Sync on submit"
            sx={{
              bgcolor: "rgba(37, 99, 235, 0.15)",
              color: "#60a5fa",
              border: "1px solid rgba(37, 99, 235, 0.3)",
              fontWeight: 600,
            }}
          />
        )}
      </DialogContent>

      <DialogActions sx={{ p: 2.5, pt: 0 }}>
        <Button onClick={handleClose} sx={{ color: "rgba(203, 213, 225, 0.7)", textTransform: "none" }}>
          Cancel
        </Button>
        <Button
          variant="contained"
          disabled={submitting}
          onClick={handleSubmit}
          startIcon={<AutoAwesomeIcon />}
          sx={{
            borderRadius: "10px",
            px: 3,
            fontWeight: 700,
            background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
          }}
        >
          {submitting ? "Submitting..." : "Submit Application"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ApplyJobModal;