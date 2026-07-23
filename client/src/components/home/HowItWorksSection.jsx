import React from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";

import HomeSection from "./layout/HomeSection";
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
      "Our AI evaluates your resume, checks ATS compatibility, and recommends improvements.",
  },
  {
    number: "03",
    title: "Improve & Prepare",
    description:
      "Optimize your resume, generate cover letters, and practice AI-powered interview questions.",
  },
  {
    number: "04",
    title: "Apply & Grow",
    description:
      "Apply confidently, monitor applications, and continue improving your career profile.",
  },
];

function HowItWorksSection() {
  const theme = useTheme();

  return (
    <HomeSection>
      <SectionHeader
        title="How It Works"
        subtitle="Start your career journey in four simple steps."
      />

      <Grid container spacing={4}>
        {steps.map((step) => (
          <Grid
            item
            xs={12}
            sm={6}
            lg={3}
            key={step.number}
            sx={{ display: "flex" }}
          >
            <Paper
              elevation={0}
              sx={{
                width: "100%",
                borderRadius: 6,
                p: 5,
                border: `1px solid ${alpha(
                  theme.palette.primary.main,
                  0.08
                )}`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                transition: ".3s",

                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: theme.shadows[8],
                },
              }}
            >
              <Box
                sx={{
                  width: 72,
                  height: 72,
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg,#2563EB,#7C3AED)",
                  color: "#fff",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: 800,
                  fontSize: "1.5rem",
                  mb: 4,
                }}
              >
                {step.number}
              </Box>

              <Typography
                variant="h5"
                fontWeight={700}
                mb={2}
              >
                {step.title}
              </Typography>

              <Typography
                color="text.secondary"
                sx={{ lineHeight: 1.9 }}
              >
                {step.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </HomeSection>
  );
}

export default HowItWorksSection;