import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";

const CTASection = () => {
  return (
    <Container maxWidth="md" sx={{ py: 8, textAlign: "center" }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Ready to Elevate Your Career?
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Discover international Master's opportunities, optimize your resume, and prepare for interviews.
      </Typography>
      
      {/* Fixed: Moved justifyContent and alignItems into sx */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <Button variant="contained" size="large" href="/register">
          Get Started Free
        </Button>
        <Button variant="outlined" size="large" href="/abroad">
          Explore Abroad Studies
        </Button>
      </Box>
    </Container>
  );
};

export default CTASection;