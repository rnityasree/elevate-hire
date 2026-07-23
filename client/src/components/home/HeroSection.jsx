import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import {
  ArrowForward,
  AutoAwesome,
  Psychology,
} from "@mui/icons-material";

function HeroSection() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        pt: { xs: 12, md: 16 },
        pb: { xs: 8, md: 10 },
      }}
    >
      {/* Background Blur */}

      <Box
        sx={{
          position: "absolute",
          width: 450,
          height: 450,
          borderRadius: "50%",
          background: "#2563EB",
          filter: "blur(120px)",
          opacity: 0.12,
          top: -180,
          left: -150,
        }}
      />

      <Box
        sx={{
          position: "absolute",
          width: 420,
          height: 420,
          borderRadius: "50%",
          background: "#06B6D4",
          filter: "blur(120px)",
          opacity: 0.12,
          bottom: -150,
          right: -120,
        }}
      />

      <Container maxWidth="lg">
        <Grid
          container
          spacing={8}
          alignItems="center"
        >
          {/* LEFT */}

          <Grid
            item
            xs={12}
            md={6}
          >
            <Chip
              icon={<AutoAwesome />}
              label="AI Powered Career Platform"
              sx={{
                mb: 4,
                px: 1,
                py: 2.6,
                fontWeight: 700,
              }}
            />

            <Typography
              sx={{
                fontWeight: 900,
                lineHeight: 1.05,
                fontSize: {
                  xs: "3rem",
                  sm: "4rem",
                  md: "5.4rem",
                },
              }}
            >
              Land Your

              <Box
                component="span"
                sx={{
                  display: "block",
                  background:
                    "linear-gradient(90deg,#2563EB,#7C3AED)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Dream Job
              </Box>

              with AI
            </Typography>

            <Typography
              sx={{
                mt: 4,
                mb: 5,
                fontSize: "1.15rem",
                color: "text.secondary",
                lineHeight: 1.9,
                maxWidth: 560,
              }}
            >
              ElevateHire uses Artificial Intelligence to analyze resumes,
              improve ATS scores, generate cover letters, prepare you for
              interviews, and help you secure your dream career faster than
              ever.
            </Typography>

            <Stack
              direction={{
                xs: "column",
                sm: "row",
              }}
              spacing={2}
            >
              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowForward />}
                onClick={() => navigate("/register")}
                sx={{
                  borderRadius: 3,
                  px: 5,
                  py: 1.7,
                  fontWeight: 700,
                }}
              >
                Get Started
              </Button>

              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate("/login")}
                sx={{
                  borderRadius: 3,
                  px: 5,
                  py: 1.7,
                }}
              >
                Login
              </Button>
            </Stack>
          </Grid>

          {/* RIGHT */}

          <Grid
            item
            xs={12}
            md={6}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  width: {
                    xs: 240,
                    sm: 300,
                    md: 380,
                  },
                  height: {
                    xs: 240,
                    sm: 300,
                    md: 380,
                  },
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg,#2563EB,#06B6D4)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow:
                    "0 25px 60px rgba(37,99,235,.25)",
                }}
              >
                <Psychology
                  sx={{
                    color: "#fff",
                    fontSize: {
                      xs: 90,
                      sm: 120,
                      md: 150,
                    },
                  }}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default HeroSection;