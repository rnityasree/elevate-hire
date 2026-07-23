import { useState } from "react";
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
    Badge,
    Tooltip,
    InputBase,
    alpha
} from "@mui/material";

import {
    Menu as MenuIcon,
    Search,
    NotificationsNone,
    Logout,
    Person
} from "@mui/icons-material";

import ThemeToggle from "./ThemeToggle";

function Navbar({ onMenuClick }) {

    const navigate = useNavigate();

    const user = JSON.parse(
        localStorage.getItem("user") || "{}"
    );

    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
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
                        display: {
                            md: "none"
                        }
                    }}
                >

                    <MenuIcon />

                </IconButton>

                {/* Logo */}

                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 700,
                        color: "primary.main"
                    }}
                >
                    ElevateHire
                </Typography>

                <Box sx={{ flexGrow: 1 }} />

                {/* Search */}

                <Box
                    sx={{
                        display: {
                            xs: "none",
                            md: "flex"
                        },

                        alignItems: "center",

                        px: 2,

                        py: .5,

                        mr: 3,

                        borderRadius: 3,

                        bgcolor: (theme) =>
                            alpha(
                                theme.palette.primary.main,
                                0.08
                            ),

                        width: 300

                    }}
                >

                    <Search
                        sx={{
                            color: "text.secondary",
                            mr: 1
                        }}
                    />

                    <InputBase
                        placeholder="Search..."
                        fullWidth
                    />

                </Box>

                {/* Notifications */}

                <Tooltip title="Notifications">

                    <IconButton sx={{ mr: 1 }}>

                        <Badge
                            badgeContent={3}
                            color="error"
                        >

                            <NotificationsNone />

                        </Badge>

                    </IconButton>

                </Tooltip>

                {/* Theme Toggle */}

                <Box sx={{ mr: 1 }}>

                    <ThemeToggle />

                </Box>

                {/* User */}

                <Tooltip title="Account">

                    <IconButton
                        onClick={handleMenuOpen}
                    >

                        <Avatar
                            sx={{
                                bgcolor: "primary.main"
                            }}
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
                        onClick={logout}
                    >

                        <Logout sx={{ mr: 1 }} />

                        Logout

                    </MenuItem>

                </Menu>

            </Toolbar>

        </AppBar>

    );

}

export default Navbar;