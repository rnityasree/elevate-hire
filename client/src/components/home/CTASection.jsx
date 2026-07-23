import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import HomeSection from "./layout/HomeSection";

function CTASection() {
  const navigate = useNavigate();

  return (
    <HomeSection>
      <Box
        sx={{
          maxWidth: 1100,
          mx: "auto",
          borderRadius: 6,
          px: { xs: 4, md: 10 },
          py: { xs: 7, md: 9 },
          textAlign: "center",
          background:
            "linear-gradient(135deg,#2563EB,#7C3AED)",
          color: "#fff",
        }}
      >
        <Typography
          variant="h3"
          fontWeight={800}
          mb={3}
        >
          Ready to Build Your Dream Career?
        </Typography>

        <Typography
          sx={{
            maxWidth: 720,
            mx: "auto",
            mb: 5,
            lineHeight: 1.9,
            fontSize: "1.1rem",
            opacity: 0.95,
          }}
        >
          Join ElevateHire today and use AI-powered resume analysis,
          ATS optimization, interview preparation and smart career
          guidance to land your next opportunity.
        </Typography>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent="center"
        >
          <Button
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            onClick={() => navigate("/register")}
            sx={{
              bgcolor: "#fff",
              color: "primary.main",
              px: 5,
              py: 1.6,
              borderRadius: 3,
              fontWeight: 700,
              minWidth: 220,
              "&:hover": {
                bgcolor: "#f5f5f5",
              },
            }}
          >
            Get Started
          </Button>

          <Button
            variant="outlined"
            onClick={() => navigate("/login")}
            sx={{
              borderColor: "#fff",
              color: "#fff",
              px: 5,
              py: 1.6,
              borderRadius: 3,
              fontWeight: 700,
              minWidth: 220,
              "&:hover": {
                borderColor: "#fff",
                bgcolor: "rgba(255,255,255,.08)",
              },
            }}
          >
            Login
          </Button>
        </Stack>
      </Box>
    </HomeSection>
  );
}

export default CTASection;