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
} from "@mui/material";

import StorefrontIcon from "@mui/icons-material/Storefront";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import StarIcon from "@mui/icons-material/Star";
import VerifiedIcon from "@mui/icons-material/Verified";
import CodeIcon from "@mui/icons-material/Code";
import RateReviewIcon from "@mui/icons-material/RateReview";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";

const initialServices = [
  {
    id: 1,
    sellerName: "Sarah Chen",
    role: "Incoming SDE @ Amazon",
    avatar: "S",
    title: "1-on-1 Frontend System Design & React Code Review",
    category: "Code Review",
    rating: 4.9,
    reviewsCount: 28,
    price: 35,
    skills: ["React", "System Design", "JavaScript"],
    response: "< 2 hours",
  },
  {
    id: 2,
    sellerName: "Marcus Vance",
    role: "Ex-Meta Intern",
    avatar: "M",
    title: "Faang-Style Behavioral & Technical Mock Interview",
    category: "Mock Interview",
    rating: 5.0,
    reviewsCount: 42,
    price: 50,
    skills: ["Algorithms", "Behavioral", "DSA"],
    response: "< 1 hour",
  },
  {
    id: 3,
    sellerName: "Priya Patel",
    role: "Product Design Fellow",
    avatar: "P",
    title: "Complete Glassmorphic Portfolio & Resume Line-by-Line Critique",
    category: "Resume Review",
    rating: 4.8,
    reviewsCount: 19,
    price: 25,
    skills: ["UI/UX", "Resume", "Figma"],
    response: "< 4 hours",
  },
];

const Marketplace = () => {
  const [services, setServices] = useState(initialServices);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [userTokens, setUserTokens] = useState(120);

  // Modal State
  const [openModal, setOpenModal] = useState(false);
  const [newService, setNewService] = useState({
    title: "",
    category: "Code Review",
    price: 30,
    skills: "",
  });

  const [notification, setNotification] = useState("");

  // Categories
  const categories = ["All", "Code Review", "Mock Interview", "Resume Review"];

  const filteredServices = services.filter((item) => {
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sellerName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCreateService = () => {
    if (!newService.title.trim()) return;

    const created = {
      id: Date.now(),
      sellerName: "You (Student)",
      role: "Computer Science Major",
      avatar: "Y",
      title: newService.title,
      category: newService.category,
      rating: 5.0,
      reviewsCount: 0,
      price: Number(newService.price),
      skills: newService.skills.split(",").map((s) => s.trim()).filter(Boolean),
      response: "< 1 hour",
    };

    setServices([created, ...services]);
    setOpenModal(false);
    setNewService({ title: "", category: "Code Review", price: 30, skills: "" });
    setNotification("Your micro-service listing is live on the marketplace!");
  };

  const handleBookSession = (service) => {
    if (userTokens < service.price) {
      setNotification("Insufficient tokens! Complete micro-projects to earn more credits.");
      return;
    }
    setUserTokens((prev) => prev - service.price);
    setNotification(`Successfully booked session with ${service.sellerName}! ${service.price} tokens deducted.`);
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
          label="MODULE 4 • PEER MONETIZATION"
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
          Peer-to-Peer Career Marketplace
        </Typography>

        <Typography variant="body1" sx={{ color: "rgba(203, 213, 225, 0.8)", maxWidth: "600px", mx: "auto" }}>
          Exchange peer services, book mock interviews, or monetize your own coding and resume review skills.
        </Typography>
      </Box>

      {/* Top Controls Banner */}
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
          <Paper
            elevation={0}
            sx={{
              px: 2,
              py: 1,
              borderRadius: "12px",
              bgcolor: "rgba(37, 99, 235, 0.15)",
              border: "1px solid rgba(96, 165, 250, 0.3)",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <MonetizationOnIcon sx={{ color: "#f59e0b" }} />
            <Box>
              <Typography variant="caption" sx={{ color: "#93c5fd", fontWeight: 700, display: "block" }}>
                WALLET BALANCE
              </Typography>
              <Typography variant="subtitle1" fontWeight={900} sx={{ color: "#fff", lineHeight: 1 }}>
                {userTokens} Tokens
              </Typography>
            </Box>
          </Paper>
        </Stack>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenModal(true)}
          sx={{
            borderRadius: "12px",
            fontWeight: 700,
            px: 3,
            bgcolor: "#2563eb",
            "&:hover": { bgcolor: "#1d4ed8" },
          }}
        >
          List a Service
        </Button>
      </Paper>

      {notification && (
        <Alert severity="info" onClose={() => setNotification("")} sx={{ borderRadius: "12px" }}>
          {notification}
        </Alert>
      )}

      {/* Filter Tabs & Search */}
      <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems="center" gap={2}>
        <Tabs
          value={activeCategory}
          onChange={(e, val) => setActiveCategory(val)}
          sx={{
            "& .MuiTab-root": { color: "rgba(203, 213, 225, 0.7)", fontWeight: 700, textTransform: "none" },
            "& .Mui-selected": { color: "#60a5fa" },
          }}
        >
          {categories.map((cat) => (
            <Tab key={cat} label={cat} value={cat} />
          ))}
        </Tabs>

        <TextField
          size="small"
          placeholder="Search tutors, skills..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "rgba(255,255,255,0.4)" }} />
              </InputAdornment>
            ),
            sx: { borderRadius: "12px", bgcolor: "rgba(255,255,255,0.03)", color: "#fff" },
          }}
        />
      </Stack>

      {/* Service Listings Grid */}
      <Grid container spacing={3}>
        {filteredServices.map((service) => (
          <Grid item xs={12} sm={6} md={4} key={service.id}>
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
                {/* Seller Info */}
                <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
                  <Avatar sx={{ bgcolor: "#2563eb", fontWeight: 800 }}>{service.avatar}</Avatar>
                  <Box sx={{ overflow: "hidden" }}>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <Typography variant="subtitle2" fontWeight={800} sx={{ color: "#fff" }} noWrap>
                        {service.sellerName}
                      </Typography>
                      <VerifiedIcon sx={{ fontSize: 16, color: "#60a5fa" }} />
                    </Stack>
                    <Typography variant="caption" sx={{ color: "rgba(203, 213, 225, 0.6)" }} noWrap display="block">
                      {service.role}
                    </Typography>
                  </Box>
                </Stack>

                <Typography variant="h6" fontWeight={800} sx={{ color: "#fff", fontSize: "1.05rem", mb: 1, lineHeight: 1.3 }}>
                  {service.title}
                </Typography>

                {/* Rating & Response Time */}
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                  <Rating value={service.rating} precision={0.1} size="small" readOnly />
                  <Typography variant="caption" fontWeight={800} sx={{ color: "#f59e0b" }}>
                    {service.rating} ({service.reviewsCount})
                  </Typography>
                </Stack>

                {/* Skills Tags */}
                <Stack direction="row" spacing={1} flexWrap="wrap" rowGap={1} sx={{ mb: 2 }}>
                  {service.skills.map((skill, idx) => (
                    <Chip
                      key={idx}
                      label={skill}
                      size="small"
                      sx={{
                        fontSize: "0.68rem",
                        fontWeight: 700,
                        bgcolor: "rgba(255, 255, 255, 0.05)",
                        color: "rgba(203, 213, 225, 0.8)",
                      }}
                    />
                  ))}
                </Stack>
              </Box>

              <Box>
                <Divider sx={{ my: 1.5, borderColor: "rgba(255, 255, 255, 0.08)" }} />
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="caption" sx={{ color: "rgba(203, 213, 225, 0.5)", display: "block" }}>
                      SESSION FEE
                    </Typography>
                    <Typography variant="h6" fontWeight={900} sx={{ color: "#60a5fa" }}>
                      {service.price} Tokens
                    </Typography>
                  </Box>

                  <Button
                    variant="contained"
                    onClick={() => handleBookSession(service)}
                    sx={{ borderRadius: "10px", fontWeight: 700, textTransform: "none" }}
                  >
                    Book Session
                  </Button>
                </Stack>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* List Service Dialog */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)} PaperProps={{ sx: { borderRadius: "20px", p: 1 } }}>
        <DialogTitle fontWeight={800}>List Your Micro-Service</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
          <TextField
            label="Service Title"
            fullWidth
            placeholder="e.g., Python LeetCode Problem Solving & Code Review"
            value={newService.title}
            onChange={(e) => setNewService({ ...newService, title: e.target.value })}
          />
          <TextField
            label="Token Fee"
            type="number"
            fullWidth
            value={newService.price}
            onChange={(e) => setNewService({ ...newService, price: e.target.value })}
          />
          <TextField
            label="Skills Offered (comma-separated)"
            fullWidth
            placeholder="React, Node.js, System Design"
            value={newService.skills}
            onChange={(e) => setNewService({ ...newService, skills: e.target.value })}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setOpenModal(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleCreateService}>
            Publish Listing
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Marketplace;