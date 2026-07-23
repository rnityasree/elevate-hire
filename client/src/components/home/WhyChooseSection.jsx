import React from "react";
import {
  Box,
  Grid,
  Paper,
  Stack,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";

import HomeSection from "./layout/HomeSection";
import SectionHeader from "./layout/SectionHeader";

const comparison = [
  {
    traditional: "Generic Resume",
    elevate: "AI Resume Analysis",
  },
  {
    traditional: "Manual ATS Editing",
    elevate: "ATS Optimization",
  },
  {
    traditional: "Hours of Resume Editing",
    elevate: "AI Resume Improvement",
  },
  {
    traditional: "Random Job Search",
    elevate: "Smart Job Matching",
  },
  {
    traditional: "No Interview Practice",
    elevate: "AI Interview Preparation",
  },
  {
    traditional: "No Career Guidance",
    elevate: "Career Growth Roadmap",
  },
];

function WhyChooseSection() {
  const theme = useTheme();

  return (
    <HomeSection>
      <SectionHeader
        title="Why Choose ElevateHire?"
        subtitle="Everything you need to launch your career inside one intelligent platform."
      />

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={0}
            sx={{
              p: 5,
              borderRadius: 6,
              height: "100%",
              border: `1px solid ${alpha(
                theme.palette.error.main,
                0.15
              )}`,
            }}
          >
            <Typography
              variant="h4"
              fontWeight={700}
              mb={4}
              textAlign="center"
            >
              Traditional
            </Typography>

            <Stack spacing={3}>
              {comparison.map((item) => (
                <Typography
                  key={item.traditional}
                  sx={{
                    fontSize: "1.08rem",
                    lineHeight: 1.8,
                  }}
                >
                  ❌ {item.traditional}
                </Typography>
              ))}
            </Stack>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper
            elevation={0}
            sx={{
              p: 5,
              borderRadius: 6,
              height: "100%",
              background:
                "linear-gradient(135deg,#2563EB,#7C3AED)",
              color: "#fff",
            }}
          >
            <Typography
              variant="h4"
              fontWeight={700}
              mb={4}
              textAlign="center"
            >
              ElevateHire
            </Typography>

            <Stack spacing={3}>
              {comparison.map((item) => (
                <Typography
                  key={item.elevate}
                  sx={{
                    fontSize: "1.08rem",
                    lineHeight: 1.8,
                  }}
                >
                  ✅ {item.elevate}
                </Typography>
              ))}
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </HomeSection>
  );
}

export default WhyChooseSection;