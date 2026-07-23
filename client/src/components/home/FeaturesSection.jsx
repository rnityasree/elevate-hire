import React from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";

import {
  Description,
  TrendingUp,
  Psychology,
  Work,
  School,
  AutoAwesome,
} from "@mui/icons-material";

import HomeSection from "./layout/HomeSection";
import SectionHeader from "./layout/SectionHeader";

const features = [
  {
    icon: <Description sx={{ fontSize: 36 }} />,
    title: "Resume Analysis",
    description:
      "Receive detailed AI-powered insights into your resume and identify improvement opportunities.",
  },
  {
    icon: <TrendingUp sx={{ fontSize: 36 }} />,
    title: "ATS Optimization",
    description:
      "Increase your ATS score with intelligent keyword and formatting suggestions.",
  },
  {
    icon: <Psychology sx={{ fontSize: 36 }} />,
    title: "AI Interview Prep",
    description:
      "Practice technical and HR interviews using realistic AI-generated questions.",
  },
  {
    icon: <Work sx={{ fontSize: 36 }} />,
    title: "Smart Job Matching",
    description:
      "Discover jobs tailored to your skills and career goals.",
  },
  {
    icon: <School sx={{ fontSize: 36 }} />,
    title: "Career Guidance",
    description:
      "Personalized learning paths to accelerate your professional growth.",
  },
  {
    icon: <AutoAwesome sx={{ fontSize: 36 }} />,
    title: "AI Cover Letter",
    description:
      "Generate professional cover letters in seconds.",
  },
];

function FeaturesSection() {
  const theme = useTheme();

  return (
    <HomeSection>
      <SectionHeader
        title="Powerful Features"
        subtitle="Everything you need to launch your career with confidence."
      />

      <Grid container spacing={4}>
        {features.map((feature) => (
          <Grid
            item
            xs={12}
            md={6}
            lg={4}
            key={feature.title}
            sx={{ display: "flex" }}
          >
            <Paper
              elevation={0}
              sx={{
                width: "100%",
                borderRadius: 6,
                p: 5,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                border: `1px solid ${alpha(
                  theme.palette.primary.main,
                  0.08
                )}`,
                transition: "0.3s",

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
                  borderRadius: 3,
                  background:
                    "linear-gradient(135deg,#2563EB,#7C3AED)",
                  color: "#fff",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mb: 4,
                }}
              >
                {feature.icon}
              </Box>

              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                }}
              >
                {feature.title}
              </Typography>

              <Typography
                color="text.secondary"
                sx={{
                  lineHeight: 1.9,
                }}
              >
                {feature.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </HomeSection>
  );
}

export default FeaturesSection;