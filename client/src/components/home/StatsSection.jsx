import React from "react";
import {
  Box,
  Container,
  Grid,
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
    <Box sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <Paper
          elevation={0}
          sx={{
            borderRadius: 6,
            overflow: "hidden",
            border: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
            bgcolor: "background.paper",
          }}
        >
          <Grid container>
            {stats.map((item, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                key={item.title}
              >
                <Box
                  sx={{
                    py: 5,
                    px: 4,
                    textAlign: "center",
                    height: "100%",
                    borderRight: {
                      md:
                        index !== stats.length - 1
                          ? `1px solid ${alpha(
                              theme.palette.divider,
                              0.6
                            )}`
                          : "none",
                    },
                    borderBottom: {
                      xs:
                        index < stats.length - 1
                          ? `1px solid ${alpha(
                              theme.palette.divider,
                              0.6
                            )}`
                          : "none",
                      sm:
                        index < 2
                          ? `1px solid ${alpha(
                              theme.palette.divider,
                              0.6
                            )}`
                          : "none",
                      md: "none",
                    },
                    transition: "0.25s",

                    "&:hover": {
                      bgcolor: alpha(
                        theme.palette.primary.main,
                        0.03
                      ),
                    },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: {
                        xs: "2.5rem",
                        md: "3.2rem",
                      },
                      fontWeight: 800,
                      color: "primary.main",
                    }}
                  >
                    {item.number}
                  </Typography>

                  <Typography
                    sx={{
                      mt: 1,
                      color: "text.secondary",
                      fontSize: "1rem",
                    }}
                  >
                    {item.title}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}

export default StatsSection;