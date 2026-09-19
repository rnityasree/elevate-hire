import React, { useState } from "react";
import {
  Box,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Typography,
  Divider,
  Chip,
  Stack,
  Button,
} from "@mui/material";

import NotificationsIcon from "@mui/icons-material/Notifications";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import WorkIcon from "@mui/icons-material/Work";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const NavbarNotification = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // Sample notifications data (Connects to backend /api/notifications)
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "interview",
      title: "Interview Scheduled",
      message: "Frontend Lead at TechCorp on July 30, 10:00 AM.",
      time: "10m ago",
      read: false,
    },
    {
      id: 2,
      type: "career_summary",
      title: "Weekly Career Summary Ready",
      message: "Your resume ATS score improved by +12% this week!",
      time: "2h ago",
      read: false,
    },
    {
      id: 3,
      type: "job_alert",
      title: "New Job Match: Senior React Developer",
      message: "95% match with your profile skills.",
      time: "1d ago",
      read: true,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleMarkAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const getIcon = (type) => {
    switch (type) {
      case "interview":
        return <CalendarMonthIcon sx={{ color: "#60a5fa", fontSize: 20 }} />;
      case "career_summary":
        return <AutoAwesomeIcon sx={{ color: "#c084fc", fontSize: 20 }} />;
      default:
        return <WorkIcon sx={{ color: "#34d399", fontSize: 20 }} />;
    }
  };

  return (
    <Box>
      <IconButton onClick={handleClick} sx={{ color: "#f3f4f6" }}>
        <Badge badgeContent={unreadCount} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: 360,
            maxHeight: 480,
            bgcolor: "rgba(17, 24, 39, 0.95)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "16px",
            color: "#fff",
            mt: 1.5,
            boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="subtitle1" fontWeight={800}>
              Notifications
            </Typography>
            {unreadCount > 0 && (
              <Chip
                label={`${unreadCount} New`}
                size="small"
                sx={{
                  bgcolor: "rgba(37, 99, 235, 0.2)",
                  color: "#60a5fa",
                  fontWeight: 700,
                  fontSize: "0.7rem",
                }}
              />
            )}
          </Stack>
          <Button
            size="small"
            onClick={handleMarkAllRead}
            sx={{ color: "rgba(203, 213, 225, 0.7)", fontSize: "0.75rem", textTransform: "none" }}
          >
            Mark all read
          </Button>
        </Box>

        <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.08)" }} />

        {notifications.length === 0 ? (
          <Box sx={{ p: 3, textAlign: "center" }}>
            <Typography variant="body2" sx={{ color: "rgba(203, 213, 225, 0.6)" }}>
              No notifications
            </Typography>
          </Box>
        ) : (
          notifications.map((item) => (
            <MenuItem
              key={item.id}
              onClick={handleClose}
              sx={{
                p: 2,
                whiteSpace: "normal",
                bgcolor: item.read ? "transparent" : "rgba(37, 99, 235, 0.06)",
                borderBottom: "1px solid rgba(255, 255, 255, 0.04)",
                "&:hover": { bgcolor: "rgba(255, 255, 255, 0.05)" },
              }}
            >
              <Stack direction="row" spacing={1.5} alignItems="flex-start" sx={{ width: "100%" }}>
                <Box
                  sx={{
                    p: 1,
                    borderRadius: "10px",
                    bgcolor: "rgba(255, 255, 255, 0.05)",
                    display: "flex",
                  }}
                >
                  {getIcon(item.type)}
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="body2" fontWeight={700} sx={{ color: "#f3f4f6" }}>
                    {item.title}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: "rgba(203, 213, 225, 0.7)", display: "block", mt: 0.3 }}
                  >
                    {item.message}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: "rgba(203, 213, 225, 0.4)", fontSize: "0.65rem", mt: 0.5, display: "block" }}
                  >
                    {item.time}
                  </Typography>
                </Box>
              </Stack>
            </MenuItem>
          ))
        )}
      </Menu>
    </Box>
  );
};

export default NavbarNotification;