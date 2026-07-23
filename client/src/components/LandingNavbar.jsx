import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    AppBar,
    Box,
    Button,
    Container,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Stack,
    Toolbar,
    Typography
} from "@mui/material";

import {
    AutoAwesome,
    Close,
    Menu
} from "@mui/icons-material";

import ThemeToggle from "./ThemeToggle";

function LandingNavbar() {

    const navigate = useNavigate();

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {

        const handleScroll = () => {

            setScrolled(window.scrollY > 20);

        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);

    }, []);

    const menuItems = [

        {
            label: "Features",
            id: "features"
        },

        {
            label: "How It Works",
            id: "how-it-works"
        },

        {
            label: "Testimonials",
            id: "testimonials"
        }

    ];

    const scrollToSection = (id) => {

        const element = document.getElementById(id);

        if (element) {

            element.scrollIntoView({

                behavior: "smooth",

                block: "start"

            });

        }

        setDrawerOpen(false);

    };

    return (

        <AppBar
            position="fixed"
            elevation={0}
            sx={{

                background: (theme) =>

                    scrolled
                        ? theme.palette.mode === "dark"
                            ? "rgba(15,23,42,.90)"
                            : "rgba(255,255,255,.90)"
                        : "transparent",

                backdropFilter: scrolled
                    ? "blur(18px)"
                    : "none",

                transition: ".3s",

                borderBottom: scrolled
                    ? (theme) =>
                        `1px solid ${theme.palette.divider}`
                    : "none"

            }}
        >

            <Container maxWidth="xl">

                <Toolbar disableGutters>

                    <Stack

                        direction="row"

                        spacing={1.5}

                        alignItems="center"

                        sx={{
                            cursor: "pointer"
                        }}

                        onClick={() => navigate("/")}

                    >

                        <AutoAwesome
                            sx={{
                                color: "#60A5FA",
                                fontSize: 34
                            }}
                        />

                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 900,
                                color: "text.primary"
                            }}
                        >
                            ElevateHire
                        </Typography>

                    </Stack>

                    <Box sx={{ flexGrow: 1 }} />

                    <Stack

                        direction="row"

                        spacing={4}

                        sx={{
                            display: {
                                xs: "none",
                                md: "flex"
                            }
                        }}

                    >

                        {menuItems.map((item) => (

                            <Typography

                                key={item.id}

                                onClick={() => scrollToSection(item.id)}

                                sx={{

                                    color: "text.secondary",

                                    cursor: "pointer",

                                    transition: ".25s",

                                    "&:hover": {

                                        color: "primary.main"

                                    }

                                }}

                            >

                                {item.label}

                            </Typography>

                        ))}

                    </Stack>

                    <Stack

                        direction="row"

                        spacing={1.5}

                        alignItems="center"

                        sx={{

                            ml: 4,

                            display: {

                                xs: "none",

                                md: "flex"

                            }

                        }}

                    >

                        <ThemeToggle />

                        <Button

                            variant="text"

                            onClick={() => navigate("/login")}

                            sx={{

                                color: "text.primary",

                                fontWeight: 600

                            }}

                        >

                            Login

                        </Button>

                        <Button

                            variant="contained"

                            onClick={() => navigate("/register")}

                            sx={{

                                borderRadius: 3,

                                px: 3.5,

                                py: 1.2,

                                fontWeight: 700,

                                background:
                                    "linear-gradient(90deg,#2563EB,#7C3AED)",

                                "&:hover": {

                                    background:
                                        "linear-gradient(90deg,#1D4ED8,#6D28D9)"

                                }

                            }}

                        >

                            Get Started

                        </Button>

                    </Stack>

                    <IconButton

                        onClick={() => setDrawerOpen(true)}

                        sx={{

                            display: {

                                xs: "flex",

                                md: "none"

                            },

                            color: "text.primary",

                            ml: 1

                        }}

                    >

                        <Menu />

                    </IconButton>

                </Toolbar>

            </Container>

            <Drawer

                anchor="right"

                open={drawerOpen}

                onClose={() => setDrawerOpen(false)}

                PaperProps={{

                    sx: {

                        width: 280,

                        bgcolor: "background.paper",

                        color: "text.primary"

                    }

                }}

            >

                <Box

                    sx={{

                        display: "flex",

                        justifyContent: "space-between",

                        alignItems: "center",

                        p: 2

                    }}

                >

                    <Typography

                        variant="h6"

                        fontWeight={700}

                    >

                        Menu

                    </Typography>

                    <IconButton

                        onClick={() => setDrawerOpen(false)}

                    >

                        <Close />

                    </IconButton>

                </Box>

                <List>

                    {menuItems.map((item) => (

                        <ListItem
                            key={item.id}
                            disablePadding
                        >

                            <ListItemButton
                                onClick={() => scrollToSection(item.id)}
                            >

                                <ListItemText
                                    primary={item.label}
                                />

                            </ListItemButton>

                        </ListItem>

                    ))}

                </List>

                <Box sx={{ px: 2 }}>

                    <ThemeToggle />

                </Box>

                <Box sx={{ p: 2 }}>

                    <Button

                        fullWidth

                        variant="outlined"

                        onClick={() => navigate("/login")}

                        sx={{

                            mb: 2

                        }}

                    >

                        Login

                    </Button>

                    <Button

                        fullWidth

                        variant="contained"

                        onClick={() => navigate("/register")}

                        sx={{

                            background:
                                "linear-gradient(90deg,#2563EB,#7C3AED)"

                        }}

                    >

                        Get Started

                    </Button>

                </Box>

            </Drawer>

        </AppBar>

    );

}

export default LandingNavbar;