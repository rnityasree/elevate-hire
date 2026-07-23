import { useState } from "react";

import {
  Box,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const DRAWER_WIDTH = 270;

function MainLayout({ children }) {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        bgcolor: "background.default",
      }}
    >
      <Navbar onMenuClick={handleDrawerToggle} />

      <Sidebar
        mobileOpen={mobileOpen}
        onClose={handleDrawerToggle}
        drawerWidth={DRAWER_WIDTH}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: {
            md: `calc(100% - ${DRAWER_WIDTH}px)`,
          },
          display: "flex",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        <Toolbar />

        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            overflowX: "hidden",
            p: {
              xs: 2,
              sm: 3,
              md: 4,
            },
          }}
        >
          <Box
            sx={{
              maxWidth: 1600,
              mx: "auto",
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default MainLayout;