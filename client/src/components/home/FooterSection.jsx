import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Container,
  Divider,
  Grid,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

function FooterSection() {
  return (
    <Box
      component="footer"
      sx={{
        mt: 6,
        py: 8,
        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={5}
          justifyContent="space-between"
        >
          <Grid item xs={12} md={4}>
            <Stack
              direction="row"
              spacing={1.5}
              alignItems="center"
              mb={3}
            >
              <AutoAwesomeIcon
                color="primary"
                sx={{ fontSize: 32 }}
              />

              <Typography
                variant="h5"
                fontWeight={800}
              >
                ElevateHire
              </Typography>
            </Stack>

            <Typography
              color="text.secondary"
              sx={{
                lineHeight: 1.9,
                maxWidth: 340,
              }}
            >
              AI-powered career platform helping students and
              professionals build stronger resumes, prepare for
              interviews and discover better career opportunities.
            </Typography>
          </Grid>

          <Grid item xs={6} md={3}>
            <Typography
              variant="h6"
              fontWeight={700}
              mb={3}
            >
              Quick Links
            </Typography>

            <Stack spacing={2}>
              <Link component={RouterLink} to="/" underline="hover">
                Home
              </Link>

              <Link component={RouterLink} to="/login" underline="hover">
                Login
              </Link>

              <Link component={RouterLink} to="/register" underline="hover">
                Register
              </Link>
            </Stack>
          </Grid>

          <Grid item xs={6} md={3}>
            <Typography
              variant="h6"
              fontWeight={700}
              mb={3}
            >
              Contact
            </Typography>

            <Stack spacing={2}>
              <Typography color="text.secondary">
                support@elevatehire.com
              </Typography>

              <Typography color="text.secondary">
                Bengaluru, India
              </Typography>

              <Typography color="text.secondary">
                AI Career Platform
              </Typography>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: 5 }} />

        <Typography
          textAlign="center"
          color="text.secondary"
        >
          © {new Date().getFullYear()} ElevateHire. All Rights Reserved.
        </Typography>
      </Container>
    </Box>
  );
}

export default FooterSection;