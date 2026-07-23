import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

import {
    Box,
    Paper,
    Typography,
    TextField,
    Button,
    Alert,
    CircularProgress
} from "@mui/material";

function ForgotPassword() {

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);
        setError("");
        setSuccess("");

        try {

            const res = await API.post("/auth/forgot-password", {
                email
            });

            setSuccess(res.data.message);

            setEmail("");

        } catch (err) {

            setError(

                err.response?.data?.message ||

                "Something went wrong."

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
                    width: 450,
                    p: 5,
                    borderRadius: 4
                }}
            >

                <Typography
                    variant="h4"
                    fontWeight={700}
                    mb={1}
                >
                    Forgot Password
                </Typography>

                <Typography
                    color="text.secondary"
                    mb={4}
                >
                    Enter your registered email address.
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
                        label="Email Address"
                        type="email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        margin="normal"
                    />

                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={loading}
                        sx={{
                            mt: 3,
                            py: 1.5
                        }}
                    >

                        {loading ? (

                            <CircularProgress
                                color="inherit"
                                size={24}
                            />

                        ) : (

                            "Send Reset Link"

                        )}

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

export default ForgotPassword;