import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Divider,
    FormControl,
    FormControlLabel,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    LinearProgress,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography,
    Checkbox
} from "@mui/material";

import {
    Visibility,
    VisibilityOff,
    School,
    Psychology,
    TrendingUp,
    RocketLaunch
} from "@mui/icons-material";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        experienceYears: 0,
        gender: "prefer_not_to_say",
        disabilityStatus: "prefer_not_to_say"
    });

    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const [agreeTerms, setAgreeTerms] = useState(false);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const calculateStrength = () => {

        let score = 0;

        if (formData.password.length >= 8) score++;
        if (/[A-Z]/.test(formData.password)) score++;
        if (/[0-9]/.test(formData.password)) score++;
        if (/[^A-Za-z0-9]/.test(formData.password)) score++;

        return score;

    };

    const passwordStrength = calculateStrength();

    const passwordLabel = () => {

        switch (passwordStrength) {

            case 0:
            case 1:
                return "Weak";

            case 2:
                return "Fair";

            case 3:
                return "Good";

            case 4:
                return "Strong";

            default:
                return "";

        }

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setMessage("");

        if (formData.password !== confirmPassword) {

            setError("Passwords do not match.");

            return;

        }

        if (!agreeTerms) {

            setError("Please accept the Terms & Conditions.");

            return;

        }

        setLoading(true);

        try {

            const response = await API.post(
                "/auth/register",
                formData
            );

            setMessage(response.data.message);

            setTimeout(() => {

                navigate("/login");

            }, 1500);

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Registration failed"
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
                    "linear-gradient(135deg,#2563eb,#4338ca,#7c3aed)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                p: 3
            }}
        >

            <Paper
                sx={{
                    width: "100%",
                    maxWidth: 1300,
                    overflow: "hidden",
                    borderRadius: 5
                }}
            >

                <Grid container>

                    {/* LEFT PANEL */}
{/*
                    <Grid
                        item
                        xs={12}
                        md={6}
                        sx={{
                            display: {
                                xs: "none",
                                md: "flex"
                            },
                            flexDirection: "column",
                            justifyContent: "center",
                            background:
                                "linear-gradient(180deg,#2563eb,#4338ca)",
                            color: "#fff",
                            p: 6
                        }}
                    >

                        <Typography
                            variant="h3"
                            fontWeight={700}
                            gutterBottom
                        >
                            Join ElevateHire
                        </Typography>

                        <Typography
                            variant="h6"
                            sx={{
                                opacity: .9,
                                mb: 6
                            }}
                        >
                            Your AI Career Companion
                        </Typography>

                        <Box
                            sx={{
                                display: "flex",
                                gap: 2,
                                mb: 4
                            }}
                        >

                            <School fontSize="large" />

                            <Box>

                                <Typography fontWeight={700}>
                                    Resume Intelligence
                                </Typography>

                                <Typography variant="body2">
                                    ATS Scoring & Resume Analysis
                                </Typography>

                            </Box>

                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                gap: 2,
                                mb: 4
                            }}
                        >

                            <Psychology fontSize="large" />

                            <Box>

                                <Typography fontWeight={700}>
                                    AI Career Coach
                                </Typography>

                                <Typography variant="body2">
                                    Personalized Career Guidance
                                </Typography>

                            </Box>

                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                gap: 2,
                                mb: 4
                            }}
                        >

                            <TrendingUp fontSize="large" />

                            <Box>

                                <Typography fontWeight={700}>
                                    Job Matching
                                </Typography>

                                <Typography variant="body2">
                                    AI Powered Recommendations
                                </Typography>

                            </Box>

                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                gap: 2
                            }}
                        >

                            <RocketLaunch fontSize="large" />

                            <Box>

                                <Typography fontWeight={700}>
                                    Career Growth
                                </Typography>

                                <Typography variant="body2">
                                    Build Your Future With AI
                                </Typography>

                            </Box>

                        </Box>

                    </Grid> */}

                    {/* RIGHT PANEL */}

                    <Grid
                        item
                        xs={12}
                    >

                        <Box
                            sx={{
                                p: {
                                    xs: 4,
                                    md: 6
                                }
                            }}
                        >

                            <Typography
                                variant="h4"
                                fontWeight={700}
                                gutterBottom
                            >
                                Create Account 🚀
                            </Typography>

                            <Typography
                                color="text.secondary"
                                mb={4}
                            >
                                Start your AI-powered career journey today.
                            </Typography>

                            {message && (
                                <Alert
                                    severity="success"
                                    sx={{ mb: 3 }}
                                >
                                    {message}
                                </Alert>
                            )}

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
                                                                <Grid container spacing={2}>

                                    <Grid item xs={12}>
                                        <TextField
                                            label="Full Name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            label="Email Address"
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            label="Phone Number"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            label="Password"
                                            name="password"
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            value={formData.password}
                                            onChange={handleChange}
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
                                    </Grid>

                                    <Grid item xs={12}>

                                        <LinearProgress
                                            variant="determinate"
                                            value={passwordStrength * 25}
                                            sx={{
                                                height: 8,
                                                borderRadius: 5
                                            }}
                                        />

                                        <Typography
                                            variant="body2"
                                            sx={{ mt: 1 }}
                                        >
                                            Password Strength:
                                            <strong>
                                                {" "}
                                                {passwordLabel()}
                                            </strong>
                                        </Typography>

                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            label="Confirm Password"
                                            type={
                                                showConfirmPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            value={confirmPassword}
                                            onChange={(e) =>
                                                setConfirmPassword(
                                                    e.target.value
                                                )
                                            }
                                            required
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            onClick={() =>
                                                                setShowConfirmPassword(
                                                                    !showConfirmPassword
                                                                )
                                                            }
                                                        >
                                                            {showConfirmPassword
                                                                ? <VisibilityOff />
                                                                : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            label="Years of Experience"
                                            type="number"
                                            name="experienceYears"
                                            value={formData.experienceYears}
                                            onChange={handleChange}
                                            inputProps={{
                                                min: 0
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>

                                        <FormControl fullWidth>

                                            <InputLabel>
                                                Gender
                                            </InputLabel>

                                            <Select
                                                label="Gender"
                                                name="gender"
                                                value={formData.gender}
                                                onChange={handleChange}
                                            >

                                                <MenuItem value="prefer_not_to_say">
                                                    Prefer not to say
                                                </MenuItem>

                                                <MenuItem value="female">
                                                    Female
                                                </MenuItem>

                                                <MenuItem value="male">
                                                    Male
                                                </MenuItem>

                                                <MenuItem value="non_binary">
                                                    Non-binary
                                                </MenuItem>

                                            </Select>

                                        </FormControl>

                                    </Grid>

                                    <Grid item xs={12} sm={6}>

                                        <FormControl fullWidth>

                                            <InputLabel>
                                                Disability Status
                                            </InputLabel>

                                            <Select
                                                label="Disability Status"
                                                name="disabilityStatus"
                                                value={formData.disabilityStatus}
                                                onChange={handleChange}
                                            >

                                                <MenuItem value="prefer_not_to_say">
                                                    Prefer not to say
                                                </MenuItem>

                                                <MenuItem value="yes">
                                                    Yes
                                                </MenuItem>

                                                <MenuItem value="no">
                                                    No
                                                </MenuItem>

                                            </Select>

                                        </FormControl>

                                    </Grid>

                                </Grid>

                                <FormControlLabel
                                    sx={{ mt: 2 }}
                                    control={
                                        <Checkbox
                                            checked={agreeTerms}
                                            onChange={(e) =>
                                                setAgreeTerms(
                                                    e.target.checked
                                                )
                                            }
                                        />
                                    }
                                    label="I agree to the Terms & Conditions and Privacy Policy"
                                />

                                <Button
                                    fullWidth
                                    size="large"
                                    variant="contained"
                                    type="submit"
                                    disabled={loading}
                                    sx={{
                                        mt: 3,
                                        py: 1.6
                                    }}
                                >

                                    {loading ? (
                                        <CircularProgress
                                            color="inherit"
                                            size={24}
                                        />
                                    ) : (
                                        "Create Account"
                                    )}

                                </Button>

                            </Box>

                            <Divider sx={{ my: 4 }} />

                            <Typography
                                align="center"
                            >
                                Already have an account?{" "}

                                <Link
                                    to="/login"
                                    style={{
                                        textDecoration: "none",
                                        fontWeight: 700
                                    }}
                                >
                                    Login
                                </Link>

                            </Typography>

                        </Box>

                    </Grid>

                </Grid>

            </Paper>

        </Box>

    );

}

export default Register;
