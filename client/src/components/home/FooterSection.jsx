import React from "react";
import {
  Box,
  Container,
  Typography,
  Stack,
  Divider,
  alpha,
  useTheme,
  Link as MuiLink,
} from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

function FooterSection() {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        pt: { xs: 8, md: 10 },
        pb: 4,
        borderTop: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
        background:
          "linear-gradient(180deg, rgba(15, 23, 42, 0) 0%, rgba(15, 23, 42, 0.8) 100%)",
      }}
    >
      <Container maxWidth="lg">
        {/* Main Footer Layout - 3 Symmetrical Centered Columns */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "2fr 1fr 1fr",
            },
            gap: { xs: 4, md: 6 },
            justifyContent: "center",
            alignItems: "start",
            mb: 6,
          }}
        >
          {/* Brand Info Column */}
          <Box sx={{ maxWidth: 360 }}>
            <Stack direction="row" spacing={1.5} alignItems="center" mb={2}>
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: "10px",
                  background:
                    "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 12px rgba(37, 99, 235, 0.3)",
                }}
              >
                <AutoAwesomeIcon sx={{ color: "#fff", fontSize: 20 }} />
              </Box>
              <Typography
                variant="h6"
                fontWeight={800}
                sx={{
                  color: "#f8fafc",
                  letterSpacing: "-0.5px",
                }}
              >
                ElevateHire
              </Typography>
            </Stack>

            <Typography
              variant="body2"
              sx={{ color: "#94a3b8", lineHeight: 1.7, fontSize: "0.9rem" }}
            >
              AI-powered career platform helping students and professionals build
              stronger resumes, prepare for interviews, and land better career
              opportunities.
            </Typography>
          </Box>

          {/* Quick Links Column */}
          <Box>
            <Typography
              variant="subtitle1"
              fontWeight={700}
              color="#f8fafc"
              mb={2.5}
            >
              Quick Links
            </Typography>
            <Stack spacing={1.5}>
              {["Home", "Login", "Register", "Employer Portal"].map((item) => (
                <MuiLink
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                  underline="none"
                  sx={{
                    color: "#94a3b8",
                    fontSize: "0.9rem",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      color: "#60a5fa",
                      transform: "translateX(3px)",
                    },
                  }}
                >
                  {item}
                </MuiLink>
              ))}
            </Stack>
          </Box>

          {/* Contact Info Column */}
          <Box>
            <Typography
              variant="subtitle1"
              fontWeight={700}
              color="#f8fafc"
              mb={2.5}
            >
              Contact
            </Typography>
            <Stack spacing={1.5}>
              <Typography variant="body2" color="#94a3b8" fontSize="0.9rem">
                support@elevatehire.com
              </Typography>
              <Typography variant="body2" color="#94a3b8" fontSize="0.9rem">
                Bengaluru, India
              </Typography>
              <Typography variant="body2" color="#94a3b8" fontSize="0.9rem">
                AI Career Platform
              </Typography>
            </Stack>
          </Box>
        </Box>

        <Divider
          sx={{
            borderColor: alpha(theme.palette.divider, 0.1),
            mb: 4,
          }}
        />

        {/* Centered Copyright & Bottom Bar */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
            textAlign: "center",
          }}
        >
          <Typography variant="body2" color="#64748b" fontSize="0.85rem">
            © 2026 ElevateHire. All Rights Reserved.
          </Typography>

          <Stack direction="row" spacing={3}>
            {["Privacy Policy", "Terms of Service", "Cookie Settings"].map(
              (item) => (
                <MuiLink
                  key={item}
                  href="#"
                  underline="none"
                  sx={{
                    color: "#64748b",
                    fontSize: "0.85rem",
                    transition: "color 0.2s ease",
                    "&:hover": {
                      color: "#94a3b8",
                    },
                  }}
                >
                  {item}
                </MuiLink>
              )
            )}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}

export default FooterSection;