import React from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";

const stats = [
  { number: "25K+", title: "Resumes Analyzed" },
  { number: "95%", title: "ATS Accuracy" },
  { number: "15K+", title: "Jobs Matched" },
  { number: "4.9★", title: "User Rating" },
];

function StatsSection() {
  const theme = useTheme();

  return (
    <Box sx={{ py: { xs: 6, md: 8 }, px: 2, width: "100%" }}>
      <Container maxWidth="lg">
        <Paper
          elevation={0}
          sx={{
            borderRadius: "20px",
            overflow: "hidden",
            border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
            bgcolor: "rgba(15, 23, 42, 0.6)",
            backdropFilter: "blur(16px)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
          }}
        >
          {/* Symmetrical 4-Column Layout */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(4, 1fr)",
              },
              width: "100%",
            }}
          >
            {stats.map((item, index) => (
              <Box
                key={item.title}
                sx={{
                  py: 4,
                  px: 2,
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRight: {
                    md:
                      index !== stats.length - 1
                        ? `1px solid ${alpha(theme.palette.divider, 0.12)}`
                        : "none",
                  },
                  borderBottom: {
                    xs:
                      index < stats.length - 1
                        ? `1px solid ${alpha(theme.palette.divider, 0.12)}`
                        : "none",
                    sm:
                      index < 2
                        ? `1px solid ${alpha(theme.palette.divider, 0.12)}`
                        : "none",
                    md: "none",
                  },
                  transition: "background-color 0.25s ease",

                  "&:hover": {
                    bgcolor: alpha(theme.palette.primary.main, 0.05),
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: {
                      xs: "2rem",
                      md: "2.5rem",
                    },
                    fontWeight: 800,
                    background:
                      "linear-gradient(135deg, #60a5fa 0%, #a855f7 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {item.number}
                </Typography>

                <Typography
                  sx={{
                    mt: 0.8,
                    color: "#94a3b8",
                    fontSize: "0.9rem",
                    fontWeight: 500,
                  }}
                >
                  {item.title}
                </Typography>
              </Box>
            ))}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default StatsSection;