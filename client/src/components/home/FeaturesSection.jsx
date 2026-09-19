import React from "react";
import {
  Box,
  Paper,
  Typography,
  alpha,
  useTheme,
  Container,
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
    icon: <Description sx={{ fontSize: 28 }} />,
    title: "Resume Analysis",
    description:
      "Receive detailed AI-powered insights into your resume and identify key improvement opportunities.",
  },
  {
    icon: <TrendingUp sx={{ fontSize: 28 }} />,
    title: "ATS Optimization",
    description:
      "Increase your ATS score with intelligent keyword and formatting suggestions tailored to job specs.",
  },
  {
    icon: <Psychology sx={{ fontSize: 28 }} />,
    title: "AI Interview Prep",
    description:
      "Practice technical and HR interviews using realistic, role-specific AI-generated questions.",
  },
  {
    icon: <Work sx={{ fontSize: 28 }} />,
    title: "Smart Job Matching",
    description:
      "Discover active tech and business roles matched precisely to your experience level and skills.",
  },
  {
    icon: <School sx={{ fontSize: 28 }} />,
    title: "Career Guidance",
    description:
      "Follow personalized learning roadmaps to accelerate your professional growth.",
  },
  {
    icon: <AutoAwesome sx={{ fontSize: 28 }} />,
    title: "AI Cover Letter",
    description:
      "Generate custom, high-converting cover letters in seconds with advanced AI.",
  },
];

function FeaturesSection() {
  const theme = useTheme();

  return (
    <HomeSection id="features" sx={{ py: { xs: 8, md: 10 } }}>
      <Container maxWidth="lg">
        <SectionHeader
          title="Powerful Features"
          subtitle="Everything you need to launch your career with confidence."
        />

        {/* Responsive CSS Grid for equal sizing and multi-column centering */}
        <Box
          sx={{
            mt: 4,
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: 3,
            justifyContent: "center",
            alignItems: "stretch",
            width: "100%",
          }}
        >
          {features.map((feature) => (
            <Paper
              key={feature.title}
              elevation={0}
              sx={{
                borderRadius: "16px",
                p: { xs: 3, sm: 3.5 },
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                bgcolor: "rgba(15, 23, 42, 0.6)",
                backdropFilter: "blur(12px)",
                border: `1px solid ${alpha(theme.palette.primary.main, 0.18)}`,
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
                  width: 52,
                  height: 52,
                  borderRadius: "12px",
                  background:
                    "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
                  color: "#fff",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mb: 2.5,
                  boxShadow: "0 6px 16px rgba(37, 99, 235, 0.35)",
                }}
              >
                {feature.icon}
              </Box>

              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  mb: 1,
                  color: "#f8fafc",
                  fontSize: "1.1rem",
                }}
              >
                {feature.title}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: "#94a3b8",
                  lineHeight: 1.6,
                  fontSize: "0.925rem",
                }}
              >
                {feature.description}
              </Typography>
            </Paper>
          ))}
        </Box>
      </Container>
    </HomeSection>
  );
}

export default FeaturesSection;