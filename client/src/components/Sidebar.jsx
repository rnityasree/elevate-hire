import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Box,
  Avatar,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import DescriptionIcon from "@mui/icons-material/Description";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import ArticleIcon from "@mui/icons-material/Article";
import QuizIcon from "@mui/icons-material/Quiz";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import WorkIcon from "@mui/icons-material/Work";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import PublicIcon from "@mui/icons-material/Public";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import EditNoteIcon from "@mui/icons-material/EditNote";
import VideocamIcon from "@mui/icons-material/Videocam";
import StorefrontIcon from "@mui/icons-material/Storefront";
import GroupsIcon from "@mui/icons-material/Groups";
import TimelineIcon from "@mui/icons-material/Timeline";

import { useNavigate, useLocation } from "react-router-dom";

function Sidebar({ mobileOpen, onClose, drawerWidth = 280 }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);
  const collapsedWidth = 72;
  const currentDesktopWidth = collapsed ? collapsedWidth : drawerWidth;

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const menu = [
    { name: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
    { name: "Abroad Studies", path: "/abroad", icon: <PublicIcon /> },
    { name: "Fetch Jobs", path: "/gov-jobs", icon: <SchoolIcon /> },
    { name: "Resume Upload", path: "/resume-upload", icon: <DescriptionIcon /> },
    { name: "AI Resume Builder", path: "/resume-builder", icon: <EditNoteIcon /> },
    { name: "Video Resume AI", path: "/video-resume", icon: <VideocamIcon /> },
    { name: "Peer Marketplace", path: "/marketplace", icon: <StorefrontIcon /> },
    { name: "Peer Mentorship", path: "/mentorship", icon: <GroupsIcon /> },
    { name: "AI Career Roadmap", path: "/roadmap", icon: <TimelineIcon /> },
    { name: "Resume Analysis", path: "/resume-analysis", icon: <AnalyticsIcon /> },
    { name: "AI Resume", path: "/resume-improvement", icon: <AutoAwesomeIcon /> },
    { name: "AI Job Match", path: "/job-match", icon: <FactCheckIcon /> },
    { name: "AI Cover Letter", path: "/cover-letter", icon: <ArticleIcon /> },
    { name: "AI Interview Prep", path: "/interview-prep", icon: <QuizIcon /> },
    { name: "AI Mock Interview", path: "/mock-interview", icon: <SmartToyIcon /> },
    { name: "Jobs", path: "/jobs", icon: <WorkIcon /> },
    { name: "Applications", path: "/applications", icon: <AssignmentTurnedInIcon /> },
    { name: "Profile", path: "/profile", icon: <PersonIcon /> },
  ];

  const renderDrawerContent = (isCollapsed = false) => (
    <Box
      sx={{
        position: "relative",
        height: "100%",
        pt: { xs: 8, md: 9 },
        display: "flex",
        flexDirection: "column",
      }}
    >
      <IconButton
        onClick={() => setCollapsed(!collapsed)}
        sx={{
          display: { xs: "none", md: "flex" },
          position: "absolute",
          top: 76,
          right: isCollapsed ? 16 : 12,
          zIndex: 10,
          bgcolor: "rgba(255, 255, 255, 0.08)",
          color: "text.primary",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          "&:hover": { bgcolor: "rgba(255, 255, 255, 0.16)" },
        }}
        size="small"
      >
        {isCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
      </IconButton>

      <Box
        sx={{
          p: isCollapsed ? 1.5 : 2.5,
          pt: isCollapsed ? 4 : 1,
          textAlign: "center",
          transition: "all 0.2s",
        }}
      >
        <Avatar
          sx={{
            width: isCollapsed ? 40 : 56,
            height: isCollapsed ? 40 : 56,
            mx: "auto",
            mb: isCollapsed ? 0 : 1.5,
            bgcolor: "#2563eb",
            fontWeight: 800,
            fontSize: isCollapsed ? 18 : 22,
            boxShadow: "0 4px 12px rgba(37, 99, 235, 0.3)",
            transition: "all 0.2s",
          }}
        >
          {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
        </Avatar>

        {!isCollapsed && (
          <>
            <Typography fontWeight={800} fontSize="0.95rem" noWrap sx={{ color: "text.primary" }}>
              {user?.name || "Student"}
            </Typography>

            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
              noWrap
              sx={{ mb: 1.5 }}
            >
              {user?.email || "user@domain.com"}
            </Typography>

            <Chip
              label="AI Career Explorer"
              size="small"
              sx={{
                height: 22,
                fontSize: "0.68rem",
                fontWeight: 700,
                letterSpacing: "0.5px",
                color: "#60a5fa",
                bgcolor: "rgba(37, 99, 235, 0.15)",
                border: "1px solid rgba(96, 165, 250, 0.3)",
              }}
            />
          </>
        )}
      </Box>

      <Divider sx={{ my: 1, borderColor: "rgba(255, 255, 255, 0.08)" }} />

      <List sx={{ px: 1.5, py: 1, flexGrow: 1, overflowY: "auto" }}>
        {menu.map((item) => {
          const active = location.pathname === item.path;

          const listItemBtn = (
            <ListItemButton
              onClick={() => {
                navigate(item.path);
                if (onClose) onClose();
              }}
              sx={{
                borderRadius: "12px",
                transition: "all 0.2s ease",
                minHeight: 44,
                px: isCollapsed ? 1.5 : 2,
                justifyContent: isCollapsed ? "center" : "initial",
                bgcolor: active ? "rgba(37, 99, 235, 0.85)" : "transparent",
                color: active ? "#ffffff" : "text.secondary",
                border: active ? "1px solid rgba(96, 165, 250, 0.4)" : "1px solid transparent",
                boxShadow: active ? "0 4px 12px rgba(37, 99, 235, 0.3)" : "none",
                "&:hover": {
                  bgcolor: active ? "rgba(37, 99, 235, 0.95)" : "rgba(255, 255, 255, 0.05)",
                  color: "#ffffff",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: active ? "#ffffff" : "#60a5fa",
                  minWidth: isCollapsed ? 0 : 38,
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </ListItemIcon>

              {!isCollapsed && (
                <ListItemText
                  primary={item.name}
                  sx={{
                    m: 0,
                    "& .MuiListItemText-primary": {
                      fontWeight: active ? 700 : 500,
                      fontSize: "0.88rem",
                    },
                  }}
                />
              )}
            </ListItemButton>
          );

          return (
            <ListItem key={item.name} disablePadding sx={{ mb: 0.8, display: "block" }}>
              {isCollapsed ? (
                <Tooltip title={item.name} placement="right" arrow>
                  {listItemBtn}
                </Tooltip>
              ) : (
                listItemBtn
              )}
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{
        width: { md: currentDesktopWidth },
        flexShrink: { md: 0 },
        transition: (theme) =>
          theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
      }}
    >
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            borderRight: "1px solid rgba(255, 255, 255, 0.08)",
            bgcolor: "rgba(17, 24, 39, 0.95)",
            backdropFilter: "blur(16px)",
          },
        }}
      >
        {renderDrawerContent(false)}
      </Drawer>

      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            width: currentDesktopWidth,
            boxSizing: "border-box",
            borderRight: "1px solid rgba(255, 255, 255, 0.08)",
            bgcolor: "rgba(17, 24, 39, 0.85)",
            backdropFilter: "blur(16px)",
            overflowX: "hidden",
            transition: (theme) =>
              theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
          },
        }}
      >
        {renderDrawerContent(collapsed)}
      </Drawer>
    </Box>
  );
}

export default Sidebar;