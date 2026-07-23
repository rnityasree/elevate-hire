import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    CircularProgress,
    Grid,
    LinearProgress,
    Paper,
    Stack,
    Typography
} from "@mui/material";

import {
    Badge,
    CalendarMonth,
    Description,
    Email,
    Person,
    Psychology,
    TrendingUp,
    Work
} from "@mui/icons-material";

function Profile() {

    const navigate = useNavigate();

    const [profile, setProfile] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchProfile = async () => {

            try {

                const token = localStorage.getItem("token");

                const { data } = await API.get(
                    "/profile",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setProfile(data);

            } catch (err) {

                console.error(err);

            } finally {

                setLoading(false);

            }

        };

        fetchProfile();

    }, []);

    const atsScore = useMemo(() => {

        return Number(profile?.atsScore || 0);

    }, [profile]);

    if (loading) {

        return (

            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="70vh"
            >

                <CircularProgress size={70} />

            </Box>

        );

    }

    if (!profile) {

        return (

            <Typography variant="h5">

                Unable to load profile.

            </Typography>

        );

    }

    return (

        <Box>

            {/* Hero */}

            <Paper

                sx={{

                    p:5,

                    mb:4,

                    borderRadius:5,

                    color:"#fff",

                    background:
                    "linear-gradient(135deg,#2563eb,#4338ca,#7c3aed)"

                }}

            >

                <Stack
                    direction={{
                        xs:"column",
                        md:"row"
                    }}
                    spacing={3}
                    alignItems="center"
                >

                    <Avatar

                        sx={{
                            width:90,
                            height:90,
                            fontSize:36,
                            bgcolor:"rgba(255,255,255,.25)"
                        }}

                    >

                        {profile.name?.charAt(0)}

                    </Avatar>

                    <Box>

                        <Typography
                            variant="h3"
                            fontWeight={700}
                        >

                            {profile.name}

                        </Typography>

                        <Typography
                            variant="h6"
                            sx={{opacity:.9}}
                        >

                            {profile.email}

                        </Typography>

                        <Chip

                            label={profile.role}

                            sx={{
                                mt:2,
                                bgcolor:"#fff",
                                color:"#2563eb",
                                fontWeight:700
                            }}

                        />

                    </Box>

                </Stack>

            </Paper>

            {/* Statistics */}

            <Grid
                container
                spacing={3}
                mb={4}
            >

                <Grid item xs={6} md={3}>

                    <Card sx={{borderRadius:4}}>

                        <CardContent sx={{textAlign:"center"}}>

                            <TrendingUp
                                color="primary"
                                sx={{fontSize:36}}
                            />

                            <Typography
                                variant="h4"
                                fontWeight={700}
                            >

                                {atsScore}

                            </Typography>

                            <Typography>

                                ATS Score

                            </Typography>

                        </CardContent>

                    </Card>

                </Grid>

                <Grid item xs={6} md={3}>

                    <Card sx={{borderRadius:4}}>

                        <CardContent sx={{textAlign:"center"}}>

                            <Description
                                color="success"
                                sx={{fontSize:36}}
                            />

                            <Typography
                                variant="h4"
                                fontWeight={700}
                            >

                                {profile.resumeUploaded ? "Yes" : "No"}

                            </Typography>

                            <Typography>

                                Resume

                            </Typography>

                        </CardContent>

                    </Card>

                </Grid>

                <Grid item xs={6} md={3}>

                    <Card sx={{borderRadius:4}}>

                        <CardContent sx={{textAlign:"center"}}>

                            <Work
                                color="warning"
                                sx={{fontSize:36}}
                            />

                            <Typography
                                variant="h4"
                                fontWeight={700}
                            >

                                {profile.experienceYears}

                            </Typography>

                            <Typography>

                                Years Experience

                            </Typography>

                        </CardContent>

                    </Card>

                </Grid>

                <Grid item xs={6} md={3}>

                    <Card sx={{borderRadius:4}}>

                        <CardContent sx={{textAlign:"center"}}>

                            <Psychology
                                color="secondary"
                                sx={{fontSize:36}}
                            />

                            <Typography
                                variant="h4"
                                fontWeight={700}
                            >

                                {profile.skills || 0}

                            </Typography>

                            <Typography>

                                Skills

                            </Typography>

                        </CardContent>

                    </Card>

                </Grid>

            </Grid>

            <Grid
                container
                spacing={3}
            >                {/* Personal Information */}

                <Grid item xs={12} md={6}>

                    <Card
                        sx={{
                            borderRadius: 4,
                            height: "100%"
                        }}
                    >

                        <CardContent>

                            <Typography
                                variant="h5"
                                fontWeight={700}
                                gutterBottom
                            >

                                Personal Information

                            </Typography>

                            <Stack spacing={3} mt={3}>

                                <Stack direction="row" spacing={2} alignItems="center">

                                    <Person color="primary" />

                                    <Box>

                                        <Typography variant="caption">
                                            Full Name
                                        </Typography>

                                        <Typography fontWeight={600}>
                                            {profile.name}
                                        </Typography>

                                    </Box>

                                </Stack>

                                <Stack direction="row" spacing={2} alignItems="center">

                                    <Email color="primary" />

                                    <Box>

                                        <Typography variant="caption">
                                            Email Address
                                        </Typography>

                                        <Typography fontWeight={600}>
                                            {profile.email}
                                        </Typography>

                                    </Box>

                                </Stack>

                                <Stack direction="row" spacing={2} alignItems="center">

                                    <Badge color="primary" />

                                    <Box>

                                        <Typography variant="caption">
                                            Account Role
                                        </Typography>

                                        <Typography fontWeight={600}>
                                            {profile.role}
                                        </Typography>

                                    </Box>

                                </Stack>

                                <Stack direction="row" spacing={2} alignItems="center">

                                    <Work color="primary" />

                                    <Box>

                                        <Typography variant="caption">
                                            Experience
                                        </Typography>

                                        <Typography fontWeight={600}>
                                            {profile.experienceYears} Years
                                        </Typography>

                                    </Box>

                                </Stack>

                                <Stack direction="row" spacing={2} alignItems="center">

                                    <CalendarMonth color="primary" />

                                    <Box>

                                        <Typography variant="caption">
                                            Joined
                                        </Typography>

                                        <Typography fontWeight={600}>
                                            {profile.joined
                                                ? new Date(profile.joined).toLocaleDateString()
                                                : "N/A"}
                                        </Typography>

                                    </Box>

                                </Stack>

                            </Stack>

                        </CardContent>

                    </Card>

                </Grid>

                {/* Resume Overview */}

                <Grid item xs={12} md={6}>

                    <Card
                        sx={{
                            borderRadius: 4,
                            height: "100%"
                        }}
                    >

                        <CardContent>

                            <Typography
                                variant="h5"
                                fontWeight={700}
                                gutterBottom
                            >

                                Resume Overview

                            </Typography>

                            <Typography mt={3}>
                                ATS Score
                            </Typography>

                            <LinearProgress
                                variant="determinate"
                                value={atsScore}
                                sx={{
                                    mt: 1,
                                    mb: 3,
                                    height: 10,
                                    borderRadius: 10
                                }}
                            />

                            <Stack spacing={2}>

                                <Chip
                                    color={profile.resumeUploaded ? "success" : "default"}
                                    label={
                                        profile.resumeUploaded
                                            ? "Resume Uploaded"
                                            : "Resume Not Uploaded"
                                    }
                                />

                                <Chip
                                    color="primary"
                                    label={`Skills: ${profile.skills}`}
                                />

                                <Chip
                                    color="secondary"
                                    label={`Projects: ${profile.projects}`}
                                />

                                <Chip
                                    color="success"
                                    label={`Education: ${profile.education}`}
                                />

                                <Chip
                                    color="warning"
                                    label={`Certifications: ${profile.certifications}`}
                                />

                            </Stack>

                        </CardContent>

                    </Card>

                </Grid>

            </Grid>

            <Box mt={5}>                <Stack
                    direction={{
                        xs: "column",
                        sm: "row"
                    }}
                    spacing={2}
                    justifyContent="center"
                >

                    <Button
                        variant="contained"
                        size="large"
                        startIcon={<Description />}
                        sx={{
                            borderRadius: 3,
                            px: 4
                        }}
                        onClick={() =>
                            navigate("/resume-upload")
                        }
                    >
                        Upload Resume
                    </Button>

                    <Button
                        variant="contained"
                        color="success"
                        size="large"
                        startIcon={<TrendingUp />}
                        sx={{
                            borderRadius: 3,
                            px: 4
                        }}
                        onClick={() =>
                            navigate("/resume-analysis")
                        }
                    >
                        Resume Analysis
                    </Button>

                    <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        startIcon={<Work />}
                        sx={{
                            borderRadius: 3,
                            px: 4
                        }}
                        onClick={() =>
                            navigate("/jobs")
                        }
                    >
                        Recommended Jobs
                    </Button>

                </Stack>

            </Box>

        </Box>

    );

}

export default Profile;