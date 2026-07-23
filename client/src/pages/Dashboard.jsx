import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
    Box,
    Grid,
    Typography,
    Button,
    Paper,
    Stack,
    //Avatar
} from "@mui/material";

import {
    CloudUpload,
    Analytics,
    Work,
    Psychology,
    EmojiEvents,
    AutoAwesome
} from "@mui/icons-material";

import DashboardCard from "../components/DashboardCard";

function Dashboard() {

    const navigate = useNavigate();

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const [dashboard, setDashboard] = useState({

        resumeStatus: "Loading...",
        atsScore: 0,
        skills: 0,
        projects: 0,
        education: 0,
        certifications: 0

    });

    useEffect(() => {

        const fetchDashboard = async () => {

            try {

                const token = localStorage.getItem("token");

                const response = await axios.get(

                    "http://localhost:5000/api/dashboard",

                    {

                        headers: {

                            Authorization: `Bearer ${token}`

                        }

                    }

                );

                setDashboard(response.data);

            }

            catch (error) {

                console.error(error);

            }

        };

        fetchDashboard();

    }, []);

    return (

        <Box>

            {/* Hero Section */}

            <Paper

                elevation={0}

                sx={{

                    p: 5,

                    mb: 5,

                    borderRadius: 5,

                    background:
                        "linear-gradient(135deg,#2563eb,#4338ca,#7c3aed)",

                    color: "#fff",

                    overflow: "hidden",

                    position: "relative"

                }}

            >

                <Grid
                    container
                    spacing={4}
                    alignItems="center"
                >

                    <Grid
                        item
                        xs={12}
                        //md={8}
                    >

                        <Typography

                            variant="h3"

                            fontWeight={700}

                            sx={{

                                mb: 2,

                                color: "#ffffff"

                            }}

                        >

                            Welcome back
                            {user?.name
                                ? `, ${user.name}`
                                : ""}
                            👋

                        </Typography>

                        <Typography

                            variant="h6"

                            sx={{

                                opacity: .95,

                                mb: 4

                            }}

                        >

                            Your AI-powered career journey continues today.
                            Upload resumes, improve ATS score,
                            practice interviews and land your dream job.

                        </Typography>

                        <Stack
                            direction={{
                                xs: "column",
                                sm: "row"
                            }}
                            spacing={2}
                        >

                            <Button

                                variant="contained"

                                size="large"

                                startIcon={<CloudUpload />}

                                onClick={() =>
                                    navigate("/resume-upload")
                                }

                                sx={{

                                    bgcolor: "#fff",

                                    color: "#2563eb",

                                    fontWeight: 700,

                                    "&:hover": {

                                        bgcolor: "#f5f5f5"

                                    }

                                }}

                            >

                                Upload Resume

                            </Button>

                            <Button

                                variant="outlined"

                                size="large"

                                startIcon={<Analytics />}

                                onClick={() =>
                                    navigate("/resume-analysis")
                                }

                                sx={{

                                    color: "#fff",

                                    borderColor: "#fff",

                                    "&:hover": {

                                        borderColor: "#fff",

                                        bgcolor:
                                            "rgba(255,255,255,.1)"

                                    }

                                }}

                            >

                                View Analysis

                            </Button>

                        </Stack>

                    </Grid>
                    {/*
                    <Grid
                        item
                        xs={12}
                        md={4}
                    >

                        <Box

                            display="flex"

                            justifyContent="center"

                        >

                            <Avatar

                                sx={{

                                    width: 120,

                                    height: 120,

                                    bgcolor:
                                        "rgba(255,255,255,.2)",

                                    fontSize: 52,

                                    fontWeight: 700

                                }}

                            >

                                {user?.name
                                    ? user.name.charAt(0)
                                    : "U"}

                            </Avatar>

                        </Box>

                    </Grid>
                    */}

                </Grid>

            </Paper>

            {/* Dashboard Cards */}

            <Grid
                container
                spacing={3}
                sx={{
                    mb: 5
                }}
            >
                                <Grid item xs={12} sm={6} lg={3}>
                    <DashboardCard
                        title="Resume Status"
                        value={dashboard.resumeStatus}
                        color="#22c55e"
                    />
                </Grid>

                <Grid item xs={12} sm={6} lg={3}>
                    <DashboardCard
                        title="Skills"
                        value={dashboard.skills}
                        color="#2563eb"
                    />
                </Grid>

                <Grid item xs={12} sm={6} lg={3}>
                    <DashboardCard
                        title="Projects"
                        value={dashboard.projects}
                        color="#9333ea"
                    />
                </Grid>

                <Grid item xs={12} sm={6} lg={3}>
                    <DashboardCard
                        title="ATS Score"
                        value={`${dashboard.atsScore}%`}
                        color="#f97316"
                    />
                </Grid>

            </Grid>

            {/* Quick Actions */}

            <Typography
                variant="h5"
                fontWeight={700}
                mb={3}
            >
                AI Career Tools
            </Typography>

            <Grid
                container
                spacing={3}
                sx={{
                    mb: 5
                }}
            >

                <Grid item xs={12} md={6} lg={3}>

                    <Paper
                        sx={{
                            p: 3,
                            height: "100%",
                            cursor: "pointer",
                            transition: ".3s",
                            "&:hover": {
                                transform: "translateY(-6px)"
                            }
                        }}
                        onClick={() =>
                            navigate("/resume-improvement")
                        }
                    >

                        <AutoAwesome
                            sx={{
                                fontSize: 45,
                                color: "primary.main",
                                mb: 2
                            }}
                        />

                        <Typography
                            variant="h6"
                            fontWeight={700}
                            gutterBottom
                        >
                            AI Resume Review
                        </Typography>

                        <Typography color="text.secondary">
                            Improve your resume using Gemini AI.
                        </Typography>

                    </Paper>

                </Grid>

                <Grid item xs={12} md={6} lg={3}>

                    <Paper
                        sx={{
                            p: 3,
                            height: "100%",
                            cursor: "pointer",
                            transition: ".3s",
                            "&:hover": {
                                transform: "translateY(-6px)"
                            }
                        }}
                        onClick={() =>
                            navigate("/job-match")
                        }
                    >

                        <Work
                            sx={{
                                fontSize: 45,
                                color: "#16a34a",
                                mb: 2
                            }}
                        />

                        <Typography
                            variant="h6"
                            fontWeight={700}
                            gutterBottom
                        >
                            AI Job Match
                        </Typography>

                        <Typography color="text.secondary">
                            Find jobs matching your resume instantly.
                        </Typography>

                    </Paper>

                </Grid>

                <Grid item xs={12} md={6} lg={3}>

                    <Paper
                        sx={{
                            p: 3,
                            height: "100%",
                            cursor: "pointer",
                            transition: ".3s",
                            "&:hover": {
                                transform: "translateY(-6px)"
                            }
                        }}
                        onClick={() =>
                            navigate("/interview-prep")
                        }
                    >

                        <Psychology
                            sx={{
                                fontSize: 45,
                                color: "#9333ea",
                                mb: 2
                            }}
                        />

                        <Typography
                            variant="h6"
                            fontWeight={700}
                            gutterBottom
                        >
                            Interview Prep
                        </Typography>

                        <Typography color="text.secondary">
                            Practice AI-generated interview questions.
                        </Typography>

                    </Paper>

                </Grid>

                <Grid item xs={12} md={6} lg={3}>

                    <Paper
                        sx={{
                            p: 3,
                            height: "100%",
                            cursor: "pointer",
                            transition: ".3s",
                            "&:hover": {
                                transform: "translateY(-6px)"
                            }
                        }}
                        onClick={() =>
                            navigate("/mock-interview")
                        }
                    >

                        <EmojiEvents
                            sx={{
                                fontSize: 45,
                                color: "#f59e0b",
                                mb: 2
                            }}
                        />

                        <Typography
                            variant="h6"
                            fontWeight={700}
                            gutterBottom
                        >
                            Mock Interview
                        </Typography>

                        <Typography color="text.secondary">
                            Practice realistic AI mock interviews.
                        </Typography>

                    </Paper>

                </Grid>

            </Grid>

            {/* Resume Overview */}

            <Paper
                sx={{
                    p: 4,
                    mb: 4
                }}
            >

                <Typography
                    variant="h5"
                    fontWeight={700}
                    gutterBottom
                >
                    Resume Overview
                </Typography>

                <Typography
                    color="text.secondary"
                    mb={3}
                >
                    Continue improving your resume and ATS score
                    to increase your chances of getting hired.
                </Typography>

                <Stack
                    direction={{
                        xs: "column",
                        sm: "row"
                    }}
                    spacing={2}
                >

                    <Button
                        variant="contained"
                        startIcon={<CloudUpload />}
                        onClick={() =>
                            navigate("/resume-upload")
                        }
                    >
                        Upload Resume
                    </Button>

                    <Button
                        color="success"
                        variant="contained"
                        startIcon={<Analytics />}
                        onClick={() =>
                            navigate("/resume-analysis")
                        }
                    >
                        View Analysis
                    </Button>

                </Stack>

            </Paper>
                        {/* Bottom Section */}

            <Grid container spacing={3}>

                {/* Recommended Jobs */}

                <Grid item xs={12} md={7}>

                    <Paper
                        sx={{
                            p: 4,
                            height: "100%"
                        }}
                    >

                        <Typography
                            variant="h5"
                            fontWeight={700}
                            gutterBottom
                        >
                            Recommended Jobs
                        </Typography>

                        <Typography
                            color="text.secondary"
                            sx={{ mb: 3 }}
                        >
                            Discover jobs that best match your
                            resume, ATS score and AI analysis.
                        </Typography>

                        <Button
                            variant="contained"
                            startIcon={<Work />}
                            onClick={() => navigate("/jobs")}
                        >
                            View Recommended Jobs
                        </Button>

                    </Paper>

                </Grid>
            </Grid>

        </Box>

    );

}

export default Dashboard;