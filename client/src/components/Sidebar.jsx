import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    Divider,
    Box,
    Avatar,
    Chip
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

import {
    useNavigate,
    useLocation
} from "react-router-dom";

function Sidebar({

    mobileOpen,
    onClose,
    drawerWidth

}) {

    const navigate = useNavigate();
    const location = useLocation();

    const user = JSON.parse(
        localStorage.getItem("user") || "{}"
    );

    const menu = [

        {
            name: "Dashboard",
            path: "/dashboard",
            icon: <DashboardIcon />
        },

        {
            name: "Resume Upload",
            path: "/resume-upload",
            icon: <DescriptionIcon />
        },

        {
            name: "Resume Analysis",
            path: "/resume-analysis",
            icon: <AnalyticsIcon />
        },

        {
            name: "AI Resume",
            path: "/resume-improvement",
            icon: <AutoAwesomeIcon />
        },

        {
            name: "AI Job Match",
            path: "/job-match",
            icon: <FactCheckIcon />
        },

        {
            name: "AI Cover Letter",
            path: "/cover-letter",
            icon: <ArticleIcon />
        },

        {
            name: "AI Interview Prep",
            path: "/interview-prep",
            icon: <QuizIcon />
        },

        {
            name: "AI Mock Interview",
            path: "/mock-interview",
            icon: <SmartToyIcon />
        },

        {
            name: "Jobs",
            path: "/jobs",
            icon: <WorkIcon />
        },

        {
            name: "Applications",
            path: "/applications",
            icon: <AssignmentTurnedInIcon />
        },

        {
            name: "Profile",
            path: "/profile",
            icon: <PersonIcon />
        }

    ];

    const drawerContent = (

        <>

            <Toolbar>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        width: "100%"
                    }}
                >

                    <Avatar
                        sx={{
                            bgcolor: "primary.main",
                            width: 52,
                            height: 52
                        }}
                    >
                        <SchoolIcon />
                    </Avatar>

                    <Box>

                        <Typography
                            fontWeight={700}
                            fontSize="1.1rem"
                        >
                            ElevateHire
                        </Typography>

                        <Typography
                            variant="caption"
                            color="text.secondary"
                        >
                            Career Platform
                        </Typography>

                    </Box>

                </Box>

            </Toolbar>

            <Divider />

            <Box
                sx={{
                    p: 3,
                    textAlign: "center"
                }}
            >

                <Avatar
                    sx={{
                        width: 70,
                        height: 70,
                        mx: "auto",
                        mb: 1,
                        bgcolor: "primary.main",
                        fontSize: 28
                    }}
                >
                    {user?.name
                        ? user.name.charAt(0).toUpperCase()
                        : "U"}
                </Avatar>

                <Typography
                    fontWeight={700}
                >
                    {user?.name || "Student"}
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        mb: 2
                    }}
                >
                    {user?.email}
                </Typography>

                <Chip
                    label="AI Career Explorer"
                    color="primary"
                    size="small"
                />

            </Box>

            <Divider />

            <List
                sx={{
                    px: 1.5,
                    py: 2
                }}
            >

                {

                    menu.map((item) => {

                        const active =
                            location.pathname === item.path;

                        return (

                            <ListItem
                                key={item.name}
                                disablePadding
                                sx={{
                                    mb: .8
                                }}
                            >

                                <ListItemButton

                                    onClick={() => {

                                        navigate(item.path);

                                        if (onClose) {
                                            onClose();
                                        }

                                    }}

                                    sx={{

                                        borderRadius: 3,

                                        transition: ".25s",

                                        bgcolor:
                                            active
                                                ? "primary.main"
                                                : "transparent",

                                        color:
                                            active
                                                ? "primary.contrastText"
                                                : "text.primary",

                                        "&:hover": {

                                            bgcolor: (theme) =>
                                                active
                                                    ? theme.palette.primary.dark
                                                    : theme.palette.action.hover

                                        }

                                    }}

                                >

                                    <ListItemIcon
                                        sx={{
                                            color:
                                                active
                                                    ? "primary.contrastText"
                                                    : "primary.main",
                                            minWidth: 42
                                        }}
                                    >
                                        {item.icon}
                                    </ListItemIcon>

                                    <ListItemText
                                        primary={item.name}
                                        primaryTypographyProps={{
                                            fontWeight:
                                                active
                                                    ? 600
                                                    : 500
                                        }}
                                    />

                                </ListItemButton>

                            </ListItem>

                        );

                    })

                }

            </List>

        </>

    );

    return (

        <Box
            component="nav"
            sx={{
                width: {
                    md: drawerWidth
                },
                flexShrink: {
                    md: 0
                }
            }}
        >

            {/* Mobile Drawer */}

            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={onClose}
                ModalProps={{
                    keepMounted: true
                }}
                sx={{
                    display: {
                        xs: "block",
                        md: "none"
                    },
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                        borderRight: (theme) =>
                            `1px solid ${theme.palette.divider}`,
                        bgcolor: "background.paper"
                    }
                }}
            >

                {drawerContent}

            </Drawer>

            {/* Desktop Drawer */}

            <Drawer
                variant="permanent"
                open
                sx={{
                    display: {
                        xs: "none",
                        md: "block"
                    },
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                        borderRight: (theme) =>
                            `1px solid ${theme.palette.divider}`,
                        bgcolor: "background.paper",
                        overflowX: "hidden"
                    }
                }}
            >

                {drawerContent}

            </Drawer>

        </Box>

    );

}

export default Sidebar;