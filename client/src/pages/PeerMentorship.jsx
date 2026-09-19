import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  Grid,
  Button,
  Stack,
  Chip,
  Avatar,
  Rating,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
  Tab,
  Tabs,
  Alert,
  Paper,
  Divider,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";

import SchoolIcon from "@mui/icons-material/School";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import SearchIcon from "@mui/icons-material/Search";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LockIcon from "@mui/icons-material/Lock";

const initialMentors = [
  {
    id: 1,
    name: "Alex Rivera",
    title: "Senior Software Engineer @ Google",
    experienceYears: 3.5,
    domain: "Software Engineering",
    rating: 4.95,
    sessionsCount: 54,
    avatar: "A",
    company: "Google",
    bio: "Ex-college CS lead, helping students crack Big-Tech technical rounds & system design.",
    availableSlots: ["Tomorrow at 4:00 PM", "Friday at 6:00 PM", "Saturday at 11:00 AM"],
  },
  {
    id: 2,
    name: "Ananya Sharma",
    title: "APM @ Microsoft",
    experienceYears: 2.5,
    domain: "Product Management",
    rating: 4.9,
    sessionsCount: 38,
    avatar: "A",
    company: "Microsoft",
    bio: "Specializing in PM product teardowns, behavioral prep, and resume alignment.",
    availableSlots: ["Thursday at 5:00 PM", "Saturday at 2:00 PM"],
  },
  {
    id: 3,
    name: "David Kim",
    title: "ML Researcher @ Nvidia",
    experienceYears: 4.0,
    domain: "Data Science & AI",
    rating: 5.0,
    sessionsCount: 62,
    avatar: "D",
    company: "Nvidia",
    bio: "Guiding students through AI/ML research papers, thesis prep, and industry pipelines.",
    availableSlots: ["Wednesday at 7:00 PM", "Sunday at 10:00 AM"],
  },
];

export default function PeerMentorship() {
  const [mentors] = useState(initialMentors);
  const [activeDomain, setActiveDomain] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Gatekeeper state for becoming a mentor
  const [userExpYears, setUserExpYears] = useState(1);
  const [gatekeeperModalOpen, setGatekeeperModalOpen] = useState(false);
  
  // Booking modal state
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState("");

  const domains = ["All", "Software Engineering", "Product Management", "Data Science & AI"];

  const filteredMentors = mentors.filter((m) => {
    const matchesDomain = activeDomain === "All" || m.domain === activeDomain;
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.company.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDomain && matchesSearch;
  });

  const isEligibleToMentor = userExpYears >= 2;

  const handleBookSession = () => {
    if (!selectedSlot) return;
    setBookingSuccess(
      `Session booked with ${selectedMentor.name} for ${selectedSlot}! Confirmation sent.`
    );
    setSelectedMentor(null);
    setSelectedSlot("");
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
          label="MODULE 5 • PEER MENTORSHIP ECOSYSTEM"
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
          Verified Peer Mentorship
        </Typography>

        <Typography variant="body1" sx={{ color: "rgba(203, 213, 225, 0.8)", maxWidth: "650px", mx: "auto" }}>
          Connect 1-on-1 with verified alumni and senior students with 2+ years of verified domain experience.
        </Typography>
      </Box>

      {/* Mentor Application / Eligibility Bar */}
      <Paper
        elevation={0}
        sx={{
          p: 2.5,
          borderRadius: "16px",
          bgcolor: "rgba(17, 24, 39, 0.65)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar sx={{ bgcolor: "rgba(37, 99, 235, 0.2)", color: "#60a5fa" }}>
            <WorkHistoryIcon />
          </Avatar>
          <Box>
            <Typography variant="subtitle1" fontWeight={800} sx={{ color: "#fff" }}>
              Want to Become a Verified Mentor?
            </Typography>
            <Typography variant="body2" sx={{ color: "rgba(203, 213, 225, 0.7)" }}>
              Requires at least 2+ years of verified industry or leadership experience.
            </Typography>
          </Box>
        </Stack>

        <Button
          variant="contained"
          startIcon={<VerifiedUserIcon />}
          onClick={() => setGatekeeperModalOpen(true)}
          sx={{
            borderRadius: "12px",
            fontWeight: 700,
            px: 3,
            bgcolor: "#2563eb",
            "&:hover": { bgcolor: "#1d4ed8" },
          }}
        >
          Check Eligibility & Apply
        </Button>
      </Paper>

      {bookingSuccess && (
        <Alert severity="success" onClose={() => setBookingSuccess("")} sx={{ borderRadius: "12px" }}>
          {bookingSuccess}
        </Alert>
      )}

      {/* Search & Domain Filter Bar */}
      <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems="center" gap={2}>
        <Tabs
          value={activeDomain}
          onChange={(e, val) => setActiveDomain(val)}
          sx={{
            "& .MuiTab-root": { color: "rgba(203, 213, 225, 0.7)", fontWeight: 700, textTransform: "none" },
            "& .Mui-selected": { color: "#60a5fa" },
          }}
        >
          {domains.map((dom) => (
            <Tab key={dom} label={dom} value={dom} />
          ))}
        </Tabs>

        <TextField
          size="small"
          placeholder="Search mentor name, title, or company..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "rgba(255,255,255,0.4)" }} />
              </InputAdornment>
            ),
            sx: { borderRadius: "12px", bgcolor: "rgba(255,255,255,0.03)", color: "#fff", width: 280 },
          }}
        />
      </Stack>

      {/* Mentors Grid */}
      <Grid container spacing={3}>
        {filteredMentors.map((mentor) => (
          <Grid item xs={12} sm={6} md={4} key={mentor.id}>
            <Card
              sx={{
                borderRadius: "20px",
                p: 3,
                height: "100%",
                bgcolor: "rgba(17, 24, 39, 0.65)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "all 0.2s ease",
                "&:hover": {
                  borderColor: "rgba(96, 165, 250, 0.4)",
                  transform: "translateY(-4px)",
                },
              }}
            >
              <Box>
                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                  <Avatar sx={{ bgcolor: "#2563eb", width: 50, height: 50, fontWeight: 800 }}>
                    {mentor.avatar}
                  </Avatar>
                  <Box sx={{ overflow: "hidden" }}>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <Typography variant="h6" fontWeight={800} sx={{ color: "#fff", fontSize: "1.1rem" }} noWrap>
                        {mentor.name}
                      </Typography>
                      <CheckCircleIcon sx={{ fontSize: 18, color: "#60a5fa" }} />
                    </Stack>
                    <Typography variant="caption" sx={{ color: "#93c5fd", fontWeight: 700 }} display="block" noWrap>
                      {mentor.title}
                    </Typography>
                  </Box>
                </Stack>

                <Typography variant="body2" sx={{ color: "rgba(203, 213, 225, 0.75)", mb: 2.5, minHeight: 40 }}>
                  {mentor.bio}
                </Typography>

                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                  <Rating value={mentor.rating} precision={0.05} size="small" readOnly />
                  <Typography variant="caption" fontWeight={800} sx={{ color: "#f59e0b" }}>
                    {mentor.rating} ({mentor.sessionsCount} sessions)
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={1} flexWrap="wrap" rowGap={1}>
                  <Chip
                    label={`${mentor.experienceYears}+ Yrs Exp`}
                    size="small"
                    sx={{ fontWeight: 700, bgcolor: "rgba(37, 99, 235, 0.15)", color: "#60a5fa" }}
                  />
                  <Chip
                    label={mentor.domain}
                    size="small"
                    sx={{ fontWeight: 700, bgcolor: "rgba(255,255,255,0.05)", color: "rgba(203, 213, 225, 0.8)" }}
                  />
                </Stack>
              </Box>

              <Box sx={{ pt: 2 }}>
                <Divider sx={{ my: 1.5, borderColor: "rgba(255, 255, 255, 0.08)" }} />
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<EventAvailableIcon />}
                  onClick={() => setSelectedMentor(mentor)}
                  sx={{ borderRadius: "10px", fontWeight: 700, textTransform: "none", bgcolor: "#2563eb" }}
                >
                  Book Session
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Gatekeeper Modal */}
      <Dialog
        open={gatekeeperModalOpen}
        onClose={() => setGatekeeperModalOpen(false)}
        PaperProps={{
          sx: { borderRadius: "20px", p: 2, bgcolor: "#111827", color: "#fff", maxWidth: 450, width: "100%" },
        }}
      >
        <DialogTitle fontWeight={800} sx={{ px: 0 }}>
          Mentor Eligibility Verification
        </DialogTitle>
        <DialogContent sx={{ px: 0, pt: 1, display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography variant="body2" sx={{ color: "rgba(203, 213, 225, 0.8)" }}>
            To ensure high mentoring quality, ElevateHire requires mentors to have a minimum of 2 years of domain experience.
          </Typography>

          <TextField
            label="Years of Experience"
            type="number"
            value={userExpYears}
            onChange={(e) => setUserExpYears(Number(e.target.value))}
            fullWidth
            InputProps={{
              sx: { color: "#fff", borderRadius: "12px" },
            }}
          />

          {!isEligibleToMentor ? (
            <Alert severity="warning" icon={<LockIcon />} sx={{ borderRadius: "12px" }}>
              You currently have <strong>{userExpYears} years</strong> of experience. You need <strong>2+ years</strong> to apply.
            </Alert>
          ) : (
            <Alert severity="success" icon={<CheckCircleIcon />} sx={{ borderRadius: "12px" }}>
              Eligibility Verified! You qualify to become a mentor.
            </Alert>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 0, pb: 1 }}>
          <Button onClick={() => setGatekeeperModalOpen(false)} sx={{ color: "rgba(255,255,255,0.6)" }}>
            Close
          </Button>
          <Button
            variant="contained"
            disabled={!isEligibleToMentor}
            onClick={() => {
              setGatekeeperModalOpen(false);
              setBookingSuccess("Your Mentor Profile Application has been submitted for review!");
            }}
            sx={{ borderRadius: "10px", fontWeight: 700 }}
          >
            Submit Application
          </Button>
        </DialogActions>
      </Dialog>

      {/* Booking Calendar Slot Modal */}
      <Dialog
        open={Boolean(selectedMentor)}
        onClose={() => setSelectedMentor(null)}
        PaperProps={{
          sx: { borderRadius: "20px", p: 2, bgcolor: "#111827", color: "#fff", maxWidth: 450, width: "100%" },
        }}
      >
        <DialogTitle fontWeight={800} sx={{ px: 0 }}>
          Schedule Session with {selectedMentor?.name}
        </DialogTitle>
        <DialogContent sx={{ px: 0, pt: 1, display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography variant="body2" sx={{ color: "rgba(203, 213, 225, 0.8)" }}>
            Select an available time slot from their calendar:
          </Typography>

          <FormControl fullWidth>
            <InputLabel sx={{ color: "rgba(255,255,255,0.6)" }}>Available Slot</InputLabel>
            <Select
              value={selectedSlot}
              onChange={(e) => setSelectedSlot(e.target.value)}
              sx={{ color: "#fff", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.2)" }}
            >
              {selectedMentor?.availableSlots.map((slot, idx) => (
                <MenuItem key={idx} value={slot}>
                  {slot}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ px: 0, pb: 1 }}>
          <Button onClick={() => setSelectedMentor(null)} sx={{ color: "rgba(255,255,255,0.6)" }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            disabled={!selectedSlot}
            onClick={handleBookSession}
            sx={{ borderRadius: "10px", fontWeight: 700, bgcolor: "#2563eb" }}
          >
            Confirm Reservation
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}