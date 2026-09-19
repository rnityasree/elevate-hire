import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";

import {
    AppBar,
    Toolbar,
    Typography,
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Box,
    Button
} from "@mui/material";

import {
    Dashboard,
    Work,
    Description,
    Business,
    Logout
} from "@mui/icons-material";

const drawerWidth = 250;

const menuItems = [
    {
        text: "Dashboard",
        icon: <Dashboard />,
        path: "/employer/dashboard"
    },
    {
        text: "Manage Opportunities",
        icon: <Work />,
        path: "/employer/jobs"
    },
    {
        text: "Applicants",
        icon: <Description />,
        path: "/employer/applicants"
    },
    {
        text: "Company Profile",
        icon: <Business />,
        path: "/employer/profile"
    }
];

function EmployerLayout() {
    const location = useLocation();
    const navigate = useNavigate();

    const employer =
        JSON.parse(localStorage.getItem("employer")) || {};

    const handleLogout = () => {
        localStorage.removeItem("employerToken");
        localStorage.removeItem("employer");
        localStorage.removeItem("employerUser");
        navigate("/employer/login");
    };

    return (
        <Box sx={{ display: "flex", height: "100vh", overflow: "hidden", width: "100%" }}>
            <AppBar
                position="fixed"
                sx={{
                    zIndex: (theme) => theme.zIndex.drawer + 1
                }}
            >
                <Toolbar>
                    <Typography
                        variant="h6"
                        sx={{
                            flexGrow: 1,
                            fontWeight: 700
                        }}
                    >
                        ElevateHire Employer Portal
                    </Typography>

                    <Typography sx={{ mr: 3 }}>
                        {employer.companyName || "Employer"}
                    </Typography>

                    <Button
                        color="inherit"
                        startIcon={<Logout />}
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>

            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                        mt: 8,
                        height: "calc(100vh - 64px)"
                    }
                }}
            >
                <List>
                    {menuItems.map((item) => (
                        <ListItemButton
                            key={item.text}
                            component={Link}
                            to={item.path}
                            selected={location.pathname === item.path}
                        >
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    ))}
                </List>
            </Drawer>

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    mt: 8,
                    height: "calc(100vh - 64px)",
                    overflowY: "auto",
                    overflowX: "hidden",
                    width: `calc(100% - ${drawerWidth}px)`,
                    bgcolor: "background.default"
                }}
            >
                <Box sx={{ maxWidth: 1600, mx: "auto" }}>
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
}

export default EmployerLayout;