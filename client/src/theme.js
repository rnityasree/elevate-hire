import { createTheme } from "@mui/material/styles";

const getTheme = (mode = "dark") =>
    createTheme({

        palette: {

            mode,

            primary: {
                main: "#2563eb",
                light: "#60a5fa",
                dark: "#1d4ed8",
                contrastText: "#ffffff",
            },

            secondary: {
                main: "#7c3aed",
                light: "#a78bfa",
                dark: "#5b21b6",
            },

            success: {
                main: "#16a34a",
            },

            warning: {
                main: "#f59e0b",
            },

            error: {
                main: "#dc2626",
            },

            background: mode === "dark"
                ? {
                    default: "#0F172A",
                    paper: "#111827",
                }
                : {
                    default: "#F5F7FB",
                    paper: "#FFFFFF",
                },

            text: mode === "dark"
                ? {
                    primary: "#F8FAFC",
                    secondary: "#CBD5E1",
                }
                : {
                    primary: "#111827",
                    secondary: "#6B7280",
                },

        },

        typography: {

            fontFamily: [
                "Inter",
                "Roboto",
                "Helvetica",
                "Arial",
                "sans-serif",
            ].join(","),

            h1: {
                fontWeight: 700,
                fontSize: "3rem",
            },

            h2: {
                fontWeight: 700,
            },

            h3: {
                fontWeight: 700,
            },

            h4: {
                fontWeight: 700,
            },

            h5: {
                fontWeight: 600,
            },

            h6: {
                fontWeight: 600,
            },

            button: {
                fontWeight: 600,
                textTransform: "none",
            },

        },

        shape: {
            borderRadius: 14,
        },

        components: {

            MuiPaper: {

                styleOverrides: {

                    root: {

                        borderRadius: 16,

                        backgroundColor:
                            mode === "dark"
                                ? "#111827"
                                : "#FFFFFF",

                        boxShadow:
                            mode === "dark"
                                ? "0 8px 30px rgba(0,0,0,.35)"
                                : "0 8px 25px rgba(15,23,42,.08)",

                    },

                },

            },

            MuiCard: {

                styleOverrides: {

                    root: {

                        borderRadius: 18,

                        backgroundColor:
                            mode === "dark"
                                ? "#111827"
                                : "#FFFFFF",

                        boxShadow:
                            mode === "dark"
                                ? "0 8px 30px rgba(0,0,0,.35)"
                                : "0 8px 25px rgba(15,23,42,.08)",

                    },

                },

            },

            MuiButton: {

                styleOverrides: {

                    root: {

                        borderRadius: 12,

                        padding: "10px 22px",

                        fontSize: "0.95rem",

                        boxShadow: "none",

                    },

                },

            },

            MuiTextField: {

                defaultProps: {

                    variant: "outlined",

                    fullWidth: true,

                },

            },

            MuiOutlinedInput: {

                styleOverrides: {

                    root: {

                        borderRadius: 12,

                        backgroundColor:
                            mode === "dark"
                                ? "#1E293B"
                                : "#FFFFFF",

                    },

                },

            },

            MuiAppBar: {

                styleOverrides: {

                    root: {

                        background:
                            mode === "dark"
                                ? "#111827"
                                : "#FFFFFF",

                        color:
                            mode === "dark"
                                ? "#F8FAFC"
                                : "#111827",

                        boxShadow:
                            "0 2px 10px rgba(0,0,0,.05)",

                    },

                },

            },

            MuiDrawer: {

                styleOverrides: {

                    paper: {

                        borderRight:
                            mode === "dark"
                                ? "1px solid #1E293B"
                                : "1px solid #EDF2F7",

                        backgroundColor:
                            mode === "dark"
                                ? "#111827"
                                : "#FFFFFF",

                    },

                },

            },

        },

    });

export default getTheme;