import React from "react";
import {
  Box,
  Paper,
  Stack,
  Typography,
  alpha,
  useTheme,
  Container,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";

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
    traditional: "Hours of Manual Formatting",
    elevate: "Instant AI Improvement",
  },
  {
    traditional: "Random Job Searches",
    elevate: "Smart Job Matching",
  },
  {
    traditional: "No Mock Practice",
    elevate: "AI Interview Preparation",
  },
  {
    traditional: "Unclear Career Direction",
    elevate: "Structured Growth Roadmap",
  },
];

function WhyChooseSection() {
  const theme = useTheme();

  return (
    <Box id="why-choose" component="section" sx={{ py: { xs: 8, md: 10 }, width: "100%" }}>
      <Container maxWidth="lg">
        <SectionHeader
          title="Why Choose ElevateHire?"
          subtitle="Everything you need to launch your career inside one intelligent platform."
        />

        {/* Equal 2-Column CSS Grid centered within container */}
        <Box
          sx={{
            mt: 5,
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(2, 1fr)",
            },
            gap: 4,
            justifyContent: "center",
            alignItems: "stretch",
            maxWidth: 1000,
            mx: "auto",
            width: "100%",
          }}
        >
          {/* Traditional Box */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, sm: 4 },
              borderRadius: "20px",
              height: "100%",
              bgcolor: "rgba(15, 23, 42, 0.5)",
              backdropFilter: "blur(12px)",
              border: `1px solid ${alpha(theme.palette.error.main, 0.25)}`,
              boxSizing: "border-box",
            }}
          >
            <Typography
              variant="h5"
              fontWeight={700}
              mb={3}
              textAlign="center"
              color="#f87171"
            >
              Traditional Process
            </Typography>

            <Stack spacing={2.5}>
              {comparison.map((item) => (
                <Stack
                  key={item.traditional}
                  direction="row"
                  spacing={2}
                  alignItems="center"
                >
                  <Box
                    sx={{
                      minWidth: 28,
                      height: 28,
                      borderRadius: "50%",
                      bgcolor: "rgba(239, 68, 68, 0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#ef4444",
                    }}
                  >
                    <CloseIcon sx={{ fontSize: 18 }} />
                  </Box>
                  <Typography
                    variant="body1"
                    sx={{ color: "#94a3b8", fontWeight: 500 }}
                  >
                    {item.traditional}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Paper>

          {/* ElevateHire Box */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, sm: 4 },
              borderRadius: "20px",
              height: "100%",
              background:
                "linear-gradient(135deg, rgba(37, 99, 235, 0.25) 0%, rgba(124, 58, 237, 0.25) 100%)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(59, 130, 246, 0.4)",
              boxShadow: "0 12px 32px rgba(37, 99, 235, 0.2)",
              boxSizing: "border-box",
            }}
          >
            <Typography
              variant="h5"
              fontWeight={800}
              mb={3}
              textAlign="center"
              sx={{
                background: "linear-gradient(135deg, #60a5fa 0%, #c084fc 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              ElevateHire Experience
            </Typography>

            <Stack spacing={2.5}>
              {comparison.map((item) => (
                <Stack
                  key={item.elevate}
                  direction="row"
                  spacing={2}
                  alignItems="center"
                >
                  <Box
                    sx={{
                      minWidth: 28,
                      height: 28,
                      borderRadius: "50%",
                      bgcolor: "rgba(34, 197, 94, 0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#4ade80",
                    }}
                  >
                    <CheckIcon sx={{ fontSize: 18 }} />
                  </Box>
                  <Typography
                    variant="body1"
                    sx={{ color: "#f8fafc", fontWeight: 600 }}
                  >
                    {item.elevate}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}

export default WhyChooseSection;