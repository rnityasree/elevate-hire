import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

import {
    Box,
    Paper,
    Typography,
    TextField,
    Button,
    Grid,
    Alert,
    CircularProgress,
    MenuItem
} from "@mui/material";

function EmployerRegister() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [formData, setFormData] = useState({

        name: "",
        email: "",
        phone: "",
        password: "",

        companyName: "",
        companyEmail: "",
        industry: "",
        companySize: "",
        website: "",
        location: "",
        description: "",
        foundedYear: ""

    });

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        setError("");

        try {

            await API.post(

                "/employer/auth/register",

                formData

            );

            navigate("/employer/login");

        }

        catch (err) {

            setError(

                err.response?.data?.message ||

                "Registration failed."

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
                    "linear-gradient(135deg,#2563eb,#4f46e5,#7c3aed)",

                p: 3

            }}

        >

            <Paper

                sx={{

                    width: 700,

                    p: 5,

                    borderRadius: 4

                }}

            >

                <Typography

                    variant="h4"

                    fontWeight={700}

                    mb={4}

                >

                    Employer Registration

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

                    <Grid container spacing={2}>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Full Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Password"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Company Name"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleChange}
                                required
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Company Email"
                                name="companyEmail"
                                value={formData.companyEmail}
                                onChange={handleChange}
                                required
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Industry"
                                name="industry"
                                value={formData.industry}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                select
                                fullWidth
                                label="Company Size"
                                name="companySize"
                                value={formData.companySize}
                                onChange={handleChange}
                                required
                            >
                                <MenuItem value="1-10">
                                    1-10 Employees
                                </MenuItem>

                                <MenuItem value="11-50">
                                    11-50 Employees
                                </MenuItem>

                                <MenuItem value="51-200">
                                    51-200 Employees
                                </MenuItem>

                                <MenuItem value="201-500">
                                    201-500 Employees
                                </MenuItem>

                                <MenuItem value="500+">
                                    500+ Employees
                                </MenuItem>

                            </TextField>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Founded Year"
                                name="foundedYear"
                                value={formData.foundedYear}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Website"
                                name="website"
                                value={formData.website}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Location"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                label="Company Description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </Grid>

                    </Grid>

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

                                "Register Company"

                        }

                    </Button>

                </Box>

                <Typography
                    align="center"
                    mt={3}
                >

                    Already have an account?{" "}

                    <Link to="/employer/login">

                        Login

                    </Link>

                </Typography>

            </Paper>

        </Box>

    );

}

export default EmployerRegister;