import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import API from "../services/api";

import {
    Box,
    Paper,
    Typography,
    TextField,
    Button,
    Alert,
    CircularProgress,
    InputAdornment,
    IconButton
} from "@mui/material";

import {
    Visibility,
    VisibilityOff
} from "@mui/icons-material";

function ResetPassword() {

    const { token } = useParams();

    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setSuccess("");

        if (password !== confirmPassword) {

            setError("Passwords do not match.");

            return;

        }

        try {

            setLoading(true);

            const res = await API.post(

                `/auth/reset-password/${token}`,

                {
                    password
                }

            );

            setSuccess(res.data.message);

            setTimeout(() => {

                navigate("/login");

            }, 2500);

        } catch (err) {

            setError(

                err.response?.data?.message ||

                "Unable to reset password."

            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background:
                    "linear-gradient(135deg,#2563eb,#4f46e5,#7c3aed)",
                p: 3
            }}
        >

            <Paper
                sx={{
                    width: 460,
                    p: 5,
                    borderRadius: 4
                }}
            >

                <Typography
                    variant="h4"
                    fontWeight={700}
                    mb={1}
                >
                    Reset Password
                </Typography>

                <Typography
                    color="text.secondary"
                    mb={4}
                >
                    Enter your new password.
                </Typography>

                {success && (

                    <Alert
                        severity="success"
                        sx={{ mb: 3 }}
                    >
                        {success}
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

                    <TextField
                        fullWidth
                        required
                        margin="normal"
                        label="New Password"
                        type={
                            showPassword
                                ? "text"
                                : "password"
                        }
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
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

                    <TextField
                        fullWidth
                        required
                        margin="normal"
                        label="Confirm Password"
                        type={
                            showConfirmPassword
                                ? "text"
                                : "password"
                        }
                        value={confirmPassword}
                        onChange={(e) =>
                            setConfirmPassword(e.target.value)
                        }
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

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        size="large"
                        disabled={loading}
                        sx={{
                            mt: 3,
                            py: 1.5
                        }}
                    >

                        {loading

                            ? (
                                <CircularProgress
                                    color="inherit"
                                    size={24}
                                />
                            )

                            : "Reset Password"}

                    </Button>

                </Box>

                <Typography
                    mt={4}
                    align="center"
                >

                    <Link
                        to="/login"
                        style={{
                            textDecoration: "none"
                        }}
                    >
                        Back to Login
                    </Link>

                </Typography>

            </Paper>

        </Box>

    );

}

export default ResetPassword;