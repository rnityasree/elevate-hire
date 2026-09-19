import React from 'react';
import { Grid } from '@mui/material';

export default function EqualHeightGrid({ children, spacing = 4, ...props }) {
  return (
    <Grid
      container
      spacing={spacing}
      justifyContent="center"
      alignItems="stretch"
      sx={{
        width: '100%',
        margin: 0,
        boxSizing: 'border-box'
      }}
      {...props}
    >
      {React.Children.map(children, (child) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          sx={{
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {child}
        </Grid>
      ))}
    </Grid>
  );
}