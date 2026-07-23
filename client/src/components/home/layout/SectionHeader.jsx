import React from "react";
import { Box, Typography } from "@mui/material";

function SectionHeader({
  title,
  subtitle,
}) {
  return (
    <Box
      sx={{
        mb: 8,
        textAlign: "center",
      }}
    >
      <Typography
        variant="h3"
        fontWeight={800}
        gutterBottom
      >
        {title}
      </Typography>

      <Typography
        color="text.secondary"
        sx={{
          maxWidth: 720,
          mx: "auto",
          lineHeight: 1.8,
          fontSize: "1.05rem",
        }}
      >
        {subtitle}
      </Typography>
    </Box>
  );
}

export default SectionHeader;