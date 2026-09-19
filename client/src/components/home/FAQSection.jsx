import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const faqs = [
  {
    question: "What is ElevateHire?",
    answer:
      "ElevateHire is an AI-powered career platform that helps students and professionals improve resumes, optimize ATS scores, prepare for interviews, and discover better career opportunities.",
  },
  {
    question: "Is ElevateHire free?",
    answer:
      "Yes. The core platform is free to use. Premium AI features will be introduced in future releases.",
  },
  {
    question: "How does ATS Resume Analysis work?",
    answer:
      "Our AI checks your resume for formatting, keywords, readability, and ATS compatibility, then provides actionable suggestions.",
  },
  {
    question: "Can I upload multiple resumes?",
    answer:
      "Yes. You'll be able to manage multiple resumes for different roles and industries.",
  },
  {
    question: "Will employers contact me directly?",
    answer:
      "Yes. In future phases, verified employers will be able to connect with suitable candidates through ElevateHire.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes. Your personal information is securely stored and never shared without your permission.",
  },
];

function FAQSection() {
  const theme = useTheme();

  return (
    <Box
      id="faq"
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="md">
        {/* Header Block with explicit Flex Centering */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            width: "100%",
            mb: 6,
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              color: "#f8fafc",
              letterSpacing: "-0.5px",
              mb: 2,
            }}
          >
            Frequently Asked Questions
          </Typography>

          <Typography
            sx={{
              color: "#94a3b8",
              maxWidth: 640,
              lineHeight: 1.7,
              fontSize: "1.05rem",
            }}
          >
            Everything you need to know before getting started with ElevateHire.
          </Typography>
        </Box>

        {/* Accordions */}
        <Box sx={{ width: "100%" }}>
          {faqs.map((faq) => (
            <Accordion
              key={faq.question}
              disableGutters
              elevation={0}
              sx={{
                mb: 2,
                borderRadius: "16px !important",
                overflow: "hidden",
                bgcolor: "rgba(15, 23, 42, 0.6)",
                backdropFilter: "blur(12px)",
                border: `1px solid ${alpha(theme.palette.primary.main, 0.18)}`,
                color: "#f8fafc",
                transition: "all 0.3s ease",

                "&:before": {
                  display: "none",
                },
                "&:hover": {
                  borderColor: alpha(theme.palette.primary.main, 0.35),
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "#94a3b8" }} />}
                sx={{
                  px: 3,
                  py: 1,
                  "& .MuiAccordionSummary-content": {
                    my: 1.5,
                  },
                }}
              >
                <Typography fontWeight={700} fontSize="1.05rem">
                  {faq.question}
                </Typography>
              </AccordionSummary>

              <AccordionDetails
                sx={{
                  px: 3,
                  pb: 3,
                  pt: 0,
                }}
              >
                <Typography color="#94a3b8" lineHeight={1.8}>
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default FAQSection;