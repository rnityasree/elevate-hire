import React from "react";
import {
  Box,
  Paper,
  Typography,
  alpha,
  useTheme,
  Container,
} from "@mui/material";

import SectionHeader from "./layout/SectionHeader";

const steps = [
  {
    number: "01",
    title: "Create Your Profile",
    description:
      "Sign up, complete your profile, and upload your resume to begin your AI-powered career journey.",
  },
  {
    number: "02",
    title: "AI Resume Analysis",
    description:
      "Our AI evaluates your resume, checks ATS compatibility, and recommends targeted improvements.",
  },
  {
    number: "03",
    title: "Improve & Prepare",
    description:
      "Optimize your resume, generate custom cover letters, and practice AI-powered interview questions.",
  },
  {
    number: "04",
    title: "Apply & Grow",
    description:
      "Apply confidently, monitor application responses, and continuously refine your professional standing.",
  },
];

function HowItWorksSection() {
  const theme = useTheme();

  return (
    <Box id="how-it-works" component="section" sx={{ py: { xs: 8, md: 10 }, width: "100%" }}>
      <Container maxWidth="lg">
        <SectionHeader
          title="How It Works"
          subtitle="Start your career journey in four simple steps."
        />

        {/* CSS Grid to force 4 side-by-side columns on desktop */}
        <Box
          sx={{
            mt: 5,
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(4, 1fr)",
            },
            gap: 3,
            justifyContent: "center",
            alignItems: "stretch",
            width: "100%",
          }}
        >
          {steps.map((step) => (
            <Paper
              key={step.number}
              elevation={0}
              sx={{
                borderRadius: "18px",
                p: { xs: 3, sm: 3.5 },
                border: `1px solid ${alpha(theme.palette.primary.main, 0.18)}`,
                bgcolor: "rgba(15, 23, 42, 0.6)",
                backdropFilter: "blur(12px)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                boxSizing: "border-box",

                "&:hover": {
                  transform: "translateY(-6px)",
                  borderColor: alpha(theme.palette.primary.main, 0.45),
                  boxShadow: "0 12px 30px rgba(37, 99, 235, 0.2)",
                  bgcolor: "rgba(15, 23, 42, 0.8)",
                },
              }}
            >
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
                  color: "#fff",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: 800,
                  fontSize: "1.15rem",
                  mb: 2.5,
                  boxShadow: "0 6px 16px rgba(37, 99, 235, 0.35)",
                }}
              >
                {step.number}
              </Box>

              <Typography
                variant="h6"
                fontWeight={700}
                mb={1}
                color="#f8fafc"
                fontSize="1.05rem"
              >
                {step.title}
              </Typography>

              <Typography
                variant="body2"
                sx={{ color: "#94a3b8", lineHeight: 1.6, fontSize: "0.9rem" }}
              >
                {step.description}
              </Typography>
            </Paper>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default HowItWorksSection;