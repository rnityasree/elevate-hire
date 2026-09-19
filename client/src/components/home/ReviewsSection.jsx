import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  Rating,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  alpha,
  useTheme,
  Avatar,
  Stack,
} from "@mui/material";
import AddCommentIcon from "@mui/icons-material/AddComment";
import SectionHeader from "./layout/SectionHeader";

// Default initial reviews if local storage is empty
const defaultReviews = [
  {
    id: 1,
    name: "Alex Morgan",
    role: "Software Engineer",
    rating: 5,
    comment:
      "ElevateHire transformed my resume layout and ATS score instantly. Landed 3 interviews within two weeks!",
    date: "2 days ago",
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "Product Designer",
    rating: 5,
    comment:
      "The AI interview prep module helped me practice real scenario questions. Highly recommend it to all job seekers.",
    date: "1 week ago",
  },
];

function ReviewsSection() {
  const theme = useTheme();

  // Load initial reviews from LocalStorage or fall back to defaults
  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem("elevatehire_reviews");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse stored reviews", e);
      }
    }
    return defaultReviews;
  });

  // Modal State
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  // Save to LocalStorage whenever reviews update
  useEffect(() => {
    localStorage.setItem("elevatehire_reviews", JSON.stringify(reviews));
  }, [reviews]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setName("");
    setRole("");
    setRating(5);
    setComment("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    const newReview = {
      id: Date.now(),
      name: name.trim(),
      role: role.trim() || "Job Seeker",
      rating: Number(rating),
      comment: comment.trim(),
      date: "Just now",
    };

    setReviews([newReview, ...reviews]);
    handleClose();
  };

  return (
    <Box
      id="testimonials"
      component="section"
      sx={{ py: { xs: 8, md: 10 }, width: "100%" }}
    >
      <Container maxWidth="lg">
        {/* Properly Spaced Section Header */}
        <SectionHeader
          title="Community Reviews"
          subtitle="See what early job seekers and professionals have to say."
        />

        {/* Action Bar / Add Review Button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mb: 4,
            mt: 2,
          }}
        >
          <Button
            variant="contained"
            startIcon={<AddCommentIcon />}
            onClick={handleOpen}
            sx={{
              borderRadius: "12px",
              px: 3,
              py: 1.2,
              fontWeight: 600,
              textTransform: "none",
              background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
              boxShadow: "0 4px 14px rgba(37, 99, 235, 0.35)",
              "&:hover": {
                background: "linear-gradient(135deg, #1d4ed8 0%, #6d28d9 100%)",
                boxShadow: "0 6px 20px rgba(37, 99, 235, 0.5)",
              },
            }}
          >
            Leave a Review
          </Button>
        </Box>

        {/* Dynamic Reviews Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: 3,
            alignItems: "stretch",
          }}
        >
          {reviews.map((rev) => (
            <Paper
              key={rev.id}
              elevation={0}
              sx={{
                p: 3,
                borderRadius: "18px",
                bgcolor: "rgba(15, 23, 42, 0.6)",
                backdropFilter: "blur(12px)",
                border: `1px solid ${alpha(theme.palette.primary.main, 0.18)}`,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxSizing: "border-box",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  transform: "translateY(-4px)",
                  borderColor: alpha(theme.palette.primary.main, 0.4),
                  boxShadow: "0 10px 25px rgba(37, 99, 235, 0.15)",
                },
              }}
            >
              <Box>
                <Rating
                  value={rev.rating}
                  readOnly
                  precision={0.5}
                  size="small"
                  sx={{ mb: 2, color: "#f59e0b" }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    color: "#cbd5e1",
                    lineHeight: 1.6,
                    fontSize: "0.95rem",
                    mb: 3,
                    fontStyle: "italic",
                  }}
                >
                  "{rev.comment}"
                </Typography>
              </Box>

              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar
                  sx={{
                    bgcolor: alpha(theme.palette.primary.main, 0.8),
                    fontWeight: 700,
                    width: 42,
                    height: 42,
                  }}
                >
                  {rev.name.charAt(0).toUpperCase()}
                </Avatar>
                <Box>
                  <Typography
                    variant="subtitle2"
                    fontWeight={700}
                    color="#f8fafc"
                  >
                    {rev.name}
                  </Typography>
                  <Typography variant="caption" color="#94a3b8">
                    {rev.role} • {rev.date}
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          ))}
        </Box>

        {/* Modal Dialog for Entering Reviews */}
        <Dialog
          open={open}
          onClose={handleClose}
          maxWidth="xs"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: "20px",
              bgcolor: "#0f172a",
              color: "#f8fafc",
              border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
              p: 1,
            },
          }}
        >
          <DialogTitle sx={{ fontWeight: 700, fontSize: "1.25rem" }}>
            Add Your Review
          </DialogTitle>
          <form onSubmit={handleSubmit}>
            <DialogContent
              sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
            >
              <Box>
                <Typography
                  variant="caption"
                  color="#94a3b8"
                  sx={{ mb: 0.5, display: "block" }}
                >
                  Rating
                </Typography>
                <Rating
                  value={rating}
                  onChange={(e, newValue) => setRating(newValue || 5)}
                  size="large"
                  sx={{ color: "#f59e0b" }}
                />
              </Box>

              <TextField
                label="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                fullWidth
                variant="outlined"
                size="small"
                sx={{
                  "& .MuiInputLabel-root": { color: "#94a3b8" },
                  "& .MuiOutlinedInput-root": {
                    color: "#fff",
                    "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
                    "&:hover fieldset": { borderColor: "#2563eb" },
                  },
                }}
              />

              <TextField
                label="Role / Designation (Optional)"
                value={role}
                placeholder="e.g. Frontend Developer"
                onChange={(e) => setRole(e.target.value)}
                fullWidth
                variant="outlined"
                size="small"
                sx={{
                  "& .MuiInputLabel-root": { color: "#94a3b8" },
                  "& .MuiOutlinedInput-root": {
                    color: "#fff",
                    "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
                    "&:hover fieldset": { borderColor: "#2563eb" },
                  },
                }}
              />

              <TextField
                label="Review / Feedback"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
                multiline
                rows={3}
                fullWidth
                variant="outlined"
                sx={{
                  "& .MuiInputLabel-root": { color: "#94a3b8" },
                  "& .MuiOutlinedInput-root": {
                    color: "#fff",
                    "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
                    "&:hover fieldset": { borderColor: "#2563eb" },
                  },
                }}
              />
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 2 }}>
              <Button
                onClick={handleClose}
                sx={{ color: "#94a3b8", textTransform: "none" }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  borderRadius: "10px",
                  px: 3,
                  textTransform: "none",
                  background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
                }}
              >
                Submit Review
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </Container>
    </Box>
  );
}

export default ReviewsSection;