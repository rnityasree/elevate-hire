import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Typography,
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
  return (
    <Box
      sx={{
        py: 12,
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h3"
          textAlign="center"
          fontWeight={800}
          mb={2}
        >
          Frequently Asked Questions
        </Typography>

        <Typography
          textAlign="center"
          color="text.secondary"
          sx={{
            maxWidth: 720,
            mx: "auto",
            mb: 7,
            lineHeight: 1.8,
            fontSize: "1.08rem",
          }}
        >
          Everything you need to know before getting started with
          ElevateHire.
        </Typography>

        {faqs.map((faq) => (
          <Accordion
            key={faq.question}
            disableGutters
            sx={{
              mb: 2,
              borderRadius: "16px !important",
              overflow: "hidden",
              boxShadow: 2,

              "&:before": {
                display: "none",
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                px: 3,
                py: 1,
              }}
            >
              <Typography
                fontWeight={700}
              >
                {faq.question}
              </Typography>
            </AccordionSummary>

            <AccordionDetails
              sx={{
                px: 3,
                pb: 3,
              }}
            >
              <Typography
                color="text.secondary"
                lineHeight={1.8}
              >
                {faq.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>
    </Box>
  );
}

export default FAQSection;