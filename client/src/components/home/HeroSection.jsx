import React from "react";
import { Typography, Button, Box, Container, Stack, Chip, Card } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "85vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        py: { xs: 8, md: 12 },
        px: { xs: 2, sm: 4 },
        background: "radial-gradient(circle at 50% 20%, rgba(37, 99, 235, 0.15) 0%, rgba(10, 14, 26, 0) 70%)",
      }}
    >
      <Container maxWidth="lg">
        <Stack
          spacing={4}
          alignItems="center"
          textAlign="center"
          sx={{ mx: "auto", maxWidth: 900 }}
        >
          {/* Top AI Badge */}
          <Chip
            icon={<AutoAwesomeIcon sx={{ fontSize: "16px !important", color: "#60a5fa" }} />}
            label="Next-Gen AI-Powered Career Platform"
            sx={{
              bgcolor: "rgba(59, 130, 246, 0.1)",
              color: "#93c5fd",
              border: "1px solid rgba(59, 130, 246, 0.25)",
              px: 2,
              py: 0.8,
              fontSize: "0.875rem",
              fontWeight: 500,
            }}
          />

          {/* Centered Headline */}
          <Typography
            variant="h1"
            sx={{
              fontWeight: 900,
              fontSize: { xs: "2.25rem", sm: "3.5rem", md: "4.25rem" },
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              background: "linear-gradient(180deg, #ffffff 0%, #94a3b8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Empowering Your Academic & Career Journey
          </Typography>

          {/* Subtitle */}
          <Typography
            variant="h6"
            sx={{
              color: "#94a3b8",
              fontWeight: 400,
              fontSize: { xs: "1rem", sm: "1.2rem" },
              maxWidth: "700px",
              lineHeight: 1.6,
            }}
          >
            Find top global opportunities, optimize your resume with AI precision, and prepare for technical interviews seamlessly.
          </Typography>

          {/* Centered CTA Action Buttons */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2.5}
            justifyContent="center"
            alignItems="center"
            sx={{ pt: 1, width: "100%" }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/register")}
              endIcon={<ArrowForwardIcon />}
              sx={{
                bgcolor: "#2563eb",
                color: "#ffffff",
                px: 4,
                py: 1.75,
                borderRadius: "12px",
                fontSize: "1rem",
                fontWeight: 600,
                textTransform: "none",
                boxShadow: "0 4px 20px rgba(37, 99, 235, 0.4)",
                "&:hover": {
                  bgcolor: "#1d4ed8",
                  boxShadow: "0 6px 24px rgba(37, 99, 235, 0.6)",
                },
              }}
            >
              Get Started Free
            </Button>

            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate("/employer/login")}
              startIcon={<BusinessCenterIcon />}
              sx={{
                color: "#93c5fd",
                borderColor: "rgba(59, 130, 246, 0.4)",
                px: 3.5,
                py: 1.75,
                borderRadius: "12px",
                fontSize: "1rem",
                fontWeight: 500,
                textTransform: "none",
                "&:hover": {
                  borderColor: "#3b82f6",
                  bgcolor: "rgba(59, 130, 246, 0.1)",
                },
              }}
            >
              For Employers
            </Button>
          </Stack>

          {/* Symmetrical Feature Badges/Metrics */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={3}
            justifyContent="center"
            sx={{ pt: 4, width: "100%" }}
          >
            {[
              { title: "AI Resume Match", desc: "Instant Score & Feedback" },
              { title: "Global Opps", desc: "Jobs & Higher Studies" },
              { title: "Mock Interviews", desc: "Real-time AI Audio Prep" },
            ].map((stat, index) => (
              <Card
                key={index}
                sx={{
                  flex: 1,
                  bgcolor: "rgba(15, 23, 42, 0.6)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  p: 2.5,
                  borderRadius: "14px",
                  textAlign: "center",
                }}
              >
                <Typography variant="subtitle1" fontWeight={700} color="#f8fafc">
                  {stat.title}
                </Typography>
                <Typography variant="body2" color="#64748b" sx={{ mt: 0.5 }}>
                  {stat.desc}
                </Typography>
              </Card>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default HeroSection;