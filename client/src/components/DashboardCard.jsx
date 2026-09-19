import React from "react";
import { Card, CardContent, Typography, Box, alpha, useTheme } from "@mui/material";

function DashboardCard({ title, value, color = "#3b82f6", icon }) {
    const theme = useTheme();

    return (
        <Card
            elevation={0}
            sx={{
                borderRadius: "20px",
                height: "100%",
                position: "relative",
                overflow: "hidden",
                bgcolor: "rgba(15, 23, 42, 0.6)",
                backdropFilter: "blur(12px)",
                border: `1px solid ${alpha(color, 0.25)}`,
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                
                "&:hover": {
                    transform: "translateY(-4px)",
                    borderColor: alpha(color, 0.5),
                    boxShadow: `0 12px 28px -10px ${alpha(color, 0.35)}`,
                    "& .stat-icon": {
                        transform: "scale(1.1)",
                        bgcolor: alpha(color, 0.2)
                    }
                }
            }}
        >
            {/* Top Accent Line */}
            <Box
                sx={{
                    height: 4,
                    width: "100%",
                    bgcolor: color,
                    boxShadow: `0 2px 8px ${alpha(color, 0.6)}`
                }}
            />

            <CardContent sx={{ p: 3, "&:last-child": { pb: 3 } }}>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: 1.5
                    }}
                >
                    <Typography
                        variant="body2"
                        sx={{
                            color: "#94a3b8",
                            fontWeight: 600,
                            fontSize: "0.875rem",
                            letterSpacing: "0.2px"
                        }}
                    >
                        {title}
                    </Typography>

                    {icon && (
                        <Box
                            className="stat-icon"
                            sx={{
                                width: 36,
                                height: 36,
                                borderRadius: "10px",
                                bgcolor: alpha(color, 0.12),
                                color: color,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                transition: "all 0.3s ease"
                            }}
                        >
                            {icon}
                        </Box>
                    )}
                </Box>

                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 800,
                        color: "#f8fafc",
                        fontSize: { xs: "1.75rem", sm: "2rem" },
                        letterSpacing: "-0.5px"
                    }}
                >
                    {value}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default DashboardCard;