import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    IconButton,
    Avatar,
    Menu,
    MenuItem,
    Tooltip,
    InputBase,
    Paper,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ClickAwayListener,
    Chip,
    alpha
} from "@mui/material";

import {
    Menu as MenuIcon,
    Search as SearchIcon,
    Logout,
    Person,
    Public as PublicIcon,
    Dashboard as DashboardIcon,
    Description as DescriptionIcon,
    Analytics as AnalyticsIcon,
    AutoAwesome as AIPerksIcon,
    Work as WorkIcon,
    Quiz as QuizIcon,
    SmartToy as MockIcon,
    School as SchoolIcon,
    EditNote as EditNoteIcon
} from "@mui/icons-material";

import ThemeToggle from "./ThemeToggle";
import NavbarNotification from "./NavbarNotification";

// Platform search index for quick navigation
const searchRoutes = [
    { name: "Dashboard", category: "Overview", path: "/dashboard", icon: <DashboardIcon fontSize="small" /> },
    { name: "Abroad Studies", category: "Education", path: "/abroad", icon: <PublicIcon fontSize="small" /> },
    { name: "Government Jobs", category: "Jobs", path: "/gov-jobs", icon: <SchoolIcon fontSize="small" /> },
    { name: "Resume Builder", category: "AI Tools", path: "/resume-builder", icon: <EditNoteIcon fontSize="small" /> },
    { name: "Resume Upload", category: "Resume Tools", path: "/resume-upload", icon: <DescriptionIcon fontSize="small" /> },
    { name: "Resume Analysis", category: "Resume Tools", path: "/resume-analysis", icon: <AnalyticsIcon fontSize="small" /> },
    { name: "AI Resume Review", category: "AI Tools", path: "/resume-improvement", icon: <AIPerksIcon fontSize="small" /> },
    { name: "AI Interview Prep", category: "AI Tools", path: "/interview-prep", icon: <QuizIcon fontSize="small" /> },
    { name: "AI Mock Interview", category: "AI Tools", path: "/mock-interview", icon: <MockIcon fontSize="small" /> },
    { name: "Explore Jobs", category: "Jobs", path: "/jobs", icon: <WorkIcon fontSize="small" /> },
    { name: "Profile Settings", category: "Account", path: "/profile", icon: <Person fontSize="small" /> }
];

function Navbar({ onMenuClick }) {
    const navigate = useNavigate();
    const inputRef = useRef(null);

    const user = JSON.parse(
        localStorage.getItem("user") || "{}"
    );

    // Profile Menu State
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    // Search State
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    // Filter searchable items based on query
    const filteredResults = searchQuery.trim() === ""
        ? []
        : searchRoutes.filter((item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.category.toLowerCase().includes(searchQuery.toLowerCase())
        );

    // Keyboard shortcut listener (Cmd+K / Ctrl+K)
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                inputRef.current?.focus();
                setIsSearchOpen(true);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleNavigate = (path) => {
        navigate(path);
        setSearchQuery("");
        setIsSearchOpen(false);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <AppBar
            position="fixed"
            elevation={0}
            sx={{
                bgcolor: (theme) =>
                    alpha(
                        theme.palette.background.paper,
                        0.92
                    ),
                backdropFilter: "blur(18px)",
                borderBottom: (theme) =>
                    `1px solid ${theme.palette.divider}`,
                zIndex: (theme) =>
                    theme.zIndex.drawer + 1
            }}
        >
            <Toolbar>
                {/* Mobile Menu */}
                <IconButton
                    edge="start"
                    onClick={onMenuClick}
                    sx={{
                        mr: 2,
                        display: { md: "none" }
                    }}
                >
                    <MenuIcon />
                </IconButton>

                {/* Logo */}
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 700,
                        color: "primary.main",
                        cursor: "pointer"
                    }}
                    onClick={() => navigate("/dashboard")}
                >
                    ElevateHire
                </Typography>

                <Box sx={{ flexGrow: 1 }} />

                {/* Interactive Functional Search */}
                <ClickAwayListener onClickAway={() => setIsSearchOpen(false)}>
                    <Box
                        sx={{
                            position: "relative",
                            display: { xs: "none", md: "flex" },
                            mr: 3
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                px: 2,
                                py: 0.5,
                                borderRadius: 3,
                                bgcolor: (theme) =>
                                    alpha(
                                        theme.palette.primary.main,
                                        0.08
                                    ),
                                width: 320,
                                border: "1px solid",
                                borderColor: isSearchOpen ? "primary.main" : "transparent",
                                transition: "all 0.2s ease"
                            }}
                        >
                            <SearchIcon
                                sx={{
                                    color: "text.secondary",
                                    mr: 1
                                }}
                            />
                            <InputBase
                                inputRef={inputRef}
                                placeholder="Search pages, tools... (⌘K)"
                                fullWidth
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setIsSearchOpen(true);
                                }}
                                onFocus={() => setIsSearchOpen(true)}
                                sx={{ fontSize: "0.875rem" }}
                            />
                            {searchQuery && (
                                <Chip
                                    label="ESC"
                                    size="small"
                                    onClick={() => {
                                        setSearchQuery("");
                                        setIsSearchOpen(false);
                                    }}
                                    sx={{
                                        height: 18,
                                        fontSize: "0.625rem",
                                        cursor: "pointer"
                                    }}
                                />
                            )}
                        </Box>

                        {/* Search Results Overlay */}
                        {isSearchOpen && searchQuery.trim() !== "" && (
                            <Paper
                                elevation={8}
                                sx={{
                                    position: "absolute",
                                    top: "120%",
                                    left: 0,
                                    right: 0,
                                    maxHeight: 300,
                                    overflowY: "auto",
                                    borderRadius: 3,
                                    bgcolor: "background.paper",
                                    border: (theme) => `1px solid ${theme.palette.divider}`,
                                    zIndex: 1400
                                }}
                            >
                                {filteredResults.length > 0 ? (
                                    <List disablePadding sx={{ p: 1 }}>
                                        {filteredResults.map((item) => (
                                            <ListItemButton
                                                key={item.path}
                                                onClick={() => handleNavigate(item.path)}
                                                sx={{
                                                    borderRadius: 2,
                                                    py: 1,
                                                    mb: 0.5,
                                                    "&:hover": {
                                                        bgcolor: (theme) =>
                                                            alpha(theme.palette.primary.main, 0.1)
                                                    }
                                                }}
                                            >
                                                <ListItemIcon sx={{ minWidth: 32, color: "primary.main" }}>
                                                    {item.icon}
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={
                                                        <Typography variant="body2" fontWeight={600}>
                                                            {item.name}
                                                        </Typography>
                                                    }
                                                    secondary={
                                                        <Typography variant="caption" color="text.secondary">
                                                            {item.category}
                                                        </Typography>
                                                    }
                                                />
                                            </ListItemButton>
                                        ))}
                                    </List>
                                ) : (
                                    <Box sx={{ p: 2.5, textAlign: "center" }}>
                                        <Typography variant="body2" color="text.secondary">
                                            No results found for "{searchQuery}"
                                        </Typography>
                                    </Box>
                                )}
                            </Paper>
                        )}
                    </Box>
                </ClickAwayListener>

                {/* Live Notification Dropdown Center */}
                <Box sx={{ mr: 1 }}>
                    <NavbarNotification />
                </Box>

                {/* Theme Toggle */}
                <Box sx={{ mr: 1 }}>
                    <ThemeToggle />
                </Box>

                {/* User Account Avatar */}
                <Tooltip title="Account">
                    <IconButton onClick={handleMenuOpen}>
                        <Avatar
                            sx={{ bgcolor: "primary.main" }}
                        >
                            {user?.name
                                ? user.name.charAt(0).toUpperCase()
                                : "U"}
                        </Avatar>
                    </IconButton>
                </Tooltip>

                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleMenuClose}
                >
                    <MenuItem
                        onClick={() => {
                            navigate("/profile");
                            handleMenuClose();
                        }}
                    >
                        <Person sx={{ mr: 1 }} />
                        Profile
                    </MenuItem>

                    <MenuItem
                        onClick={() => {
                            navigate("/abroad");
                            handleMenuClose();
                        }}
                    >
                        <PublicIcon sx={{ mr: 1 }} />
                        Abroad Studies
                    </MenuItem>

                    <MenuItem onClick={logout}>
                        <Logout sx={{ mr: 1 }} />
                        Logout
                    </MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;