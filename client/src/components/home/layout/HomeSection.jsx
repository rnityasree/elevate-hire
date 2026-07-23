import React from "react";
import { Box, Container } from "@mui/material";

function HomeSection({
  children,
  background = "transparent",
  maxWidth = "lg",
}) {
  return (
    <Box
      component="section"
      sx={{
        py: {
          xs: 10,
          md: 12,
        },
        display: "flex",
        justifyContent: "center",
        bgcolor: background,
      }}
    >
      <Container
        maxWidth={maxWidth}
        sx={{
          px: {
            xs: 3,
            sm: 4,
            md: 5,
          },
        }}
      >
        {children}
      </Container>
    </Box>
  );
}

export default HomeSection;