import React from "react";
import { Grid } from "@mui/material";

function EqualHeightGrid({
  children,
}) {
  return (
    <Grid
      container
      spacing={4}
      justifyContent="center"
      alignItems="stretch"
    >
      {children}
    </Grid>
  );
}

export default EqualHeightGrid;