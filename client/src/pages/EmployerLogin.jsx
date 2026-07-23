import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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

function EmployerLogin() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        setError("");

        try {

            const res = await API.post(

                "/employer/auth/login",

                {
                    email,
                    password
                }

            );

            localStorage.setItem(
                "employerToken",
                res.data.token
            );

            localStorage.setItem(
                "employer",
                JSON.stringify(res.data.employer)
            );

            localStorage.setItem(
                "employerUser",
                JSON.stringify(res.data.user)
            );

            navigate("/employer/dashboard");

        }

        catch (err) {

            setError(

                err.response?.data?.message ||

                "Login failed."

            );

        }

        finally {

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
                    "linear-gradient(135deg,#0f172a,#1e3a8a,#2563eb)",

                p: 3

            }}

        >

            <Paper

                sx={{

                    width: 500,

                    p: 5,

                    borderRadius: 4

                }}

            >

                <Typography

                    variant="h4"

                    fontWeight={700}

                    mb={1}

                >

                    Employer Login

                </Typography>

                <Typography

                    color="text.secondary"

                    mb={4}

                >

                    Sign in to your company account.

                </Typography>

                {

                    error &&

                    <Alert

                        severity="error"

                        sx={{ mb: 3 }}

                    >

                        {error}

                    </Alert>

                }

                <Box

                    component="form"

                    onSubmit={handleSubmit}

                >

                    <TextField

                        fullWidth

                        required

                        label="Email"

                        margin="normal"

                        type="email"

                        value={email}

                        onChange={(e) =>
                            setEmail(e.target.value)
                        }

                    />

                    <TextField

                        fullWidth

                        required

                        label="Password"

                        margin="normal"

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

                                        {

                                            showPassword

                                                ?

                                                <VisibilityOff />

                                                :

                                                <Visibility />

                                        }

                                    </IconButton>

                                </InputAdornment>

                            )

                        }}

                    />

                    <Button

                        fullWidth

                        type="submit"

                        variant="contained"

                        size="large"

                        disabled={loading}

                        sx={{

                            mt: 4,
                            py: 1.5

                        }}

                    >

                        {

                            loading

                                ?

                                <CircularProgress
                                    color="inherit"
                                    size={24}
                                />

                                :

                                "Login"

                        }

                    </Button>

                </Box>

                <Typography

                    align="center"

                    mt={4}

                >

                    Don't have a company account?{" "}

                    <Link to="/employer/register">

                        Register

                    </Link>

                </Typography>

            </Paper>

        </Box>

    );

}

export default EmployerLogin;