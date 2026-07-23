import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

import {
    Box,
    Grid,
    Paper,
    Typography,
    TextField,
    Button,
    Checkbox,
    FormControlLabel,
    InputAdornment,
    IconButton,
    Alert,
    CircularProgress,
    Divider
} from "@mui/material";

import {
    Visibility,
    VisibilityOff,
    School,
    TrendingUp,
    Psychology,
    Work
} from "@mui/icons-material";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);
        setError("");

        try {

            const response = await API.post("/auth/login", {
                email,
                password
            });

            const { token, user } = response.data;

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            navigate("/dashboard");

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Login failed. Please try again."
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <Box
            sx={{
                minHeight: "100vh",
                background:
                    "linear-gradient(135deg,#2563eb 0%,#4f46e5 50%,#7c3aed 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: 3
            }}
        >

            <Paper
                elevation={0}
                sx={{
                    width: "100%",
                    maxWidth: 1200,
                    overflow: "hidden",
                    borderRadius: 5,
                    display: "flex",
                    backdropFilter: "blur(20px)"
                }}
            >

                <Grid container>

                    {/* Left Side */}

                    <Grid
                        item
                        xs={12}
                        md={6}
                        sx={{
                            background:
                                "linear-gradient(180deg,#2563eb,#4338ca)",
                            color: "#fff",
                            p: 6,
                            display: {
                                xs: "none",
                                md: "flex"
                            },
                            flexDirection: "column",
                            justifyContent: "center"
                        }}
                    >

                        <Typography
                            variant="h3"
                            fontWeight={700}
                            gutterBottom
                        >
                            ElevateHire
                        </Typography>

                        <Typography
                            variant="h6"
                            sx={{
                                mb: 5,
                                opacity: .9
                            }}
                        >
                            AI Powered Career Platform
                        </Typography>

                        <Box sx={{ mb: 4, display: "flex", gap: 2 }}>
                            <School fontSize="large" />
                            <Box>
                                <Typography fontWeight={600}>
                                    Resume Intelligence
                                </Typography>

                                <Typography variant="body2">
                                    ATS analysis and AI improvements.
                                </Typography>
                            </Box>
                        </Box>

                        <Box sx={{ mb: 4, display: "flex", gap: 2 }}>
                            <Psychology fontSize="large" />
                            <Box>
                                <Typography fontWeight={600}>
                                    AI Mock Interviews
                                </Typography>

                                <Typography variant="body2">
                                    Practice with Gemini-powered interviews.
                                </Typography>
                            </Box>
                        </Box>

                        <Box sx={{ mb: 4, display: "flex", gap: 2 }}>
                            <TrendingUp fontSize="large" />
                            <Box>
                                <Typography fontWeight={600}>
                                    Career Roadmaps
                                </Typography>

                                <Typography variant="body2">
                                    Personalized AI learning plans.
                                </Typography>
                            </Box>
                        </Box>

                        <Box sx={{ display: "flex", gap: 2 }}>
                            <Work fontSize="large" />
                            <Box>
                                <Typography fontWeight={600}>
                                    Jobs & Internships
                                </Typography>

                                <Typography variant="body2">
                                    Discover opportunities that match your profile.
                                </Typography>
                            </Box>
                        </Box>

                    </Grid>

                    {/* Right Side */}

                    <Grid
                        item
                        xs={12}
                        md={6}
                    >

                        <Box
                            sx={{
                                p: {
                                    xs: 4,
                                    md: 7
                                }
                            }}
                        >

                            <Typography
                                variant="h4"
                                fontWeight={700}
                                gutterBottom
                            >
                                Welcome Back 👋
                            </Typography>

                            <Typography
                                color="text.secondary"
                                mb={4}
                            >
                                Login to continue your career journey.
                            </Typography>

                            {error && (
                                <Alert
                                    severity="error"
                                    sx={{ mb: 3 }}
                                >
                                    {error}
                                </Alert>
                            )}

                            <Box
                                component="form"
                                onSubmit={handleSubmit}
                            >

                                <TextField
                                    label="Email Address"
                                    type="email"
                                    margin="normal"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    required
                                />

                                <TextField
                                    label="Password"
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    margin="normal"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">

                                                <IconButton
                                                    onClick={() =>
                                                        setShowPassword(
                                                            !showPassword
                                                        )
                                                    }
                                                >
                                                    {showPassword
                                                        ? <VisibilityOff />
                                                        : <Visibility />}
                                                </IconButton>

                                            </InputAdornment>
                                        )
                                    }}
                                />

                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        mt: 1
                                    }}
                                >

                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={rememberMe}
                                                onChange={(e) =>
                                                    setRememberMe(
                                                        e.target.checked
                                                    )
                                                }
                                            />
                                        }
                                        label="Remember me"
                                    />

                                    <Link
    to="/forgot-password"
    style={{
        textDecoration: "none",
        fontWeight: 600,
        color: "#1976d2"
    }}
>
    Forgot Password?
</Link>

                                </Box>

                                <Button
                                    type="submit"
                                    fullWidth
                                    size="large"
                                    variant="contained"
                                    disabled={loading}
                                    sx={{
                                        mt: 3,
                                        py: 1.6
                                    }}
                                >

                                    {loading ? (
                                        <CircularProgress
                                            color="inherit"
                                            size={25}
                                        />
                                    ) : (
                                        "Login"
                                    )}

                                </Button>

                            </Box>

                            <Divider sx={{ my: 4 }} />

                            <Typography
                                align="center"
                            >
                                Don't have an account?{" "}

                                <Link
                                    to="/register"
                                    style={{
                                        textDecoration: "none",
                                        fontWeight: 600
                                    }}
                                >
                                    Create Account
                                </Link>

                            </Typography>

                        </Box>

                    </Grid>

                </Grid>

            </Paper>

        </Box>

    );

}

export default Login;