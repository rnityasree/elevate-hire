import React from "react";

import {
    IconButton,
    Tooltip
} from "@mui/material";

import {
    DarkMode,
    LightMode
} from "@mui/icons-material";

import {
    useThemeContext
} from "../context/ThemeContext";

function ThemeToggle() {

    const {
        isDark,
        toggleTheme
    } = useThemeContext();

    return (

        <Tooltip
            title={isDark ? "Light Mode" : "Dark Mode"}
        >

            <IconButton

                onClick={toggleTheme}

                color="inherit"

                sx={{

                    width: 44,

                    height: 44,

                    borderRadius: "50%",

                    transition: ".3s",

                    bgcolor: (theme) =>
                        theme.palette.mode === "dark"
                            ? "rgba(255,255,255,.08)"
                            : "rgba(0,0,0,.05)",

                    "&:hover": {

                        transform: "rotate(180deg)",

                        bgcolor: (theme) =>
                            theme.palette.mode === "dark"
                                ? "rgba(255,255,255,.15)"
                                : "rgba(0,0,0,.1)"

                    }

                }}

            >

                {isDark
                    ? <LightMode />
                    : <DarkMode />
                }

            </IconButton>

        </Tooltip>

    );

}

export default ThemeToggle;