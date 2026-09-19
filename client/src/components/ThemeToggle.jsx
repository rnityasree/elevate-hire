import React from "react";
import { IconButton, Tooltip, Box, alpha, useTheme } from "@mui/material";
import { DarkModeOutlined as DarkMode, LightModeOutlined as LightMode } from "@mui/icons-material";
import { useThemeContext } from "../context/ThemeContext";

function ThemeToggle() {
    const theme = useTheme();
    const { isDark, toggleTheme } = useThemeContext();

    return (
        <Tooltip
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            arrow
            placement="bottom"
        >
            <IconButton
                onClick={toggleTheme}
                sx={{
                    width: 42,
                    height: 42,
                    borderRadius: "12px", // Modern squircle rounded corners matching dashboard cards
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    position: "relative",
                    overflow: "hidden",
                    bgcolor: isDark
                        ? "rgba(15, 23, 42, 0.6)"
                        : "rgba(255, 255, 255, 0.8)",
                    backdropFilter: "blur(8px)",
                    border: `1px solid ${
                        isDark
                            ? "rgba(255, 255, 255, 0.12)"
                            : "rgba(0, 0, 0, 0.08)"
                    }`,
                    color: isDark ? "#fbbf24" : "#2563eb", // Warm amber in dark mode, vibrant blue in light mode

                    "&:hover": {
                        transform: "translateY(-2px)",
                        bgcolor: isDark
                            ? "rgba(30, 41, 59, 0.8)"
                            : "rgba(241, 245, 249, 1)",
                        borderColor: isDark
                            ? "rgba(251, 191, 36, 0.4)"
                            : "rgba(37, 99, 235, 0.3)",
                        boxShadow: isDark
                            ? "0 4px 20px rgba(251, 191, 36, 0.2)"
                            : "0 4px 20px rgba(37, 99, 235, 0.15)",
                        
                        "& .theme-icon": {
                            transform: isDark ? "rotate(45deg) scale(1.1)" : "rotate(-45deg) scale(1.1)",
                        }
                    },

                    "&:active": {
                        transform: "scale(0.95)",
                    }
                }}
            >
                <Box
                    className="theme-icon"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    }}
                >
                    {isDark ? (
                        <LightMode sx={{ fontSize: 22 }} />
                    ) : (
                        <DarkMode sx={{ fontSize: 22 }} />
                    )}
                </Box>
            </IconButton>
        </Tooltip>
    );
}

export default ThemeToggle;