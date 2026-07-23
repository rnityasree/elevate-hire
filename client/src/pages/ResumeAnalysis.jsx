import { useEffect, useState } from "react";
import axios from "axios";

import {
    Box,
    Paper,
    Typography,
    Grid,
    Chip,
    CircularProgress,
    Stack,
    LinearProgress
} from "@mui/material";

import {
    CheckCircle,
    Psychology,
    School,
    WorkspacePremium,
    Work,
    RocketLaunch
} from "@mui/icons-material";

const ResumeAnalysis = () => {

    const [data, setData] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchAnalysis = async () => {

            try {

                const token = localStorage.getItem("token");

                const res = await axios.get(

                    "http://localhost:5000/api/resume-analysis",

                    {

                        headers: {

                            Authorization: `Bearer ${token}`

                        }

                    }

                );

                setData(res.data);

            }

            catch (err) {

                console.error(err);

            }

            finally {

                setLoading(false);

            }

        };

        fetchAnalysis();

    }, []);

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

    return (

        <Box>

            {/* Hero */}

            <Paper

                elevation={0}

                sx={{

                    p: 5,

                    mb: 4,

                    borderRadius: 5,

                    color: "#fff",

                    background:
                        "linear-gradient(135deg,#2563eb,#4338ca,#7c3aed)"

                }}

            >

                <Typography

                    variant="h3"

                    fontWeight={700}

                    gutterBottom

                >

                    Resume Analysis

                </Typography>

                <Typography variant="h6">

                    ElevateHire has analyzed your resume using AI.
                    Review your ATS score, detected skills,
                    projects, education and experience below.

                </Typography>

            </Paper>

            {/* ATS Score */}

            <Paper

                sx={{

                    p: 4,

                    borderRadius: 4,

                    mb: 4

                }}

            >

                <Grid

                    container

                    spacing={4}

                    alignItems="center"

                >

                    <Grid item xs={12} md={4}>

                        <Box

                            display="flex"

                            justifyContent="center"

                        >
                        {/*
                            <Box
                                position="relative"
                                display="inline-flex"
                            >

                                <CircularProgress

                                     variant="determinate"
                                     value={data.atsScore}
                                     size={220}
                                     thickness={4}
                                     sx={{
                                     color: "#2563eb"}}

                                />

                                <Box

                                    position="absolute"

                                    top={0}

                                    left={0}

                                    right={0}

                                    bottom={0}

                                    display="flex"

                                    alignItems="center"

                                    justifyContent="center"

                                >

                                    <Typography

                                        variant="h4"
    fontWeight={700}
    sx={{
        lineHeight: 1,
        textAlign: "center"
    }}
                                    >

                                        {data.atsScore}%

                                    </Typography>

                                </Box>

                            </Box>*/}
<Box
    sx={{
        width: 220,
        height: 220,
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }}
>

    <CircularProgress
        variant="determinate"
        value={data.atsScore}
        size={220}
        thickness={4}
        sx={{
            position: "absolute",
            color: "#2563eb",
        }}
    />

    <Typography
        variant="h3"
        fontWeight={700}
        sx={{
            position: "absolute",
            color: "text.primary",
            zIndex: 1,
        }}
    >
        {data.atsScore}%
    </Typography>

</Box>
                        </Box>

                    </Grid>

                    <Grid item xs={12} md={8}>

                        <Typography

                            variant="h4"

                            fontWeight={700}

                            gutterBottom

                        >

                            ATS Resume Score

                        </Typography>

                        <Typography
                            color="text.secondary"
                            mb={3}
                        >

                            This score estimates how well your resume
                            matches Applicant Tracking Systems used by
                            recruiters.

                        </Typography>

                        <LinearProgress

                            variant="determinate"

                            value={data.atsScore}

                            sx={{

                                height: 5,

        borderRadius: 10,
        mt: 2,

        "& .MuiLinearProgress-bar": {
            borderRadius: 8
        }

                                

                            }}

                        />

                        <Stack

                            direction="row"

                            spacing={2}

                            mt={5}

                        >

                            <Chip

                                icon={<CheckCircle />}

                                color="success"

                                label="Resume Parsed"

                            />

                            <Chip

                                icon={<Psychology />}

                                color="primary"

                                label="AI Analyzed"

                            />

                        </Stack>

                    </Grid>

                </Grid>

            </Paper>

            {/* Details */}

            <Grid container spacing={3}>
                                {/* Skills */}

                <Grid item xs={12} md={6}>

                    <Paper
                        sx={{
                            p: 3,
                            borderRadius: 4,
                            height: "100%"
                        }}
                    >

                        <Stack
                            direction="row"
                            spacing={2}
                            alignItems="center"
                            mb={3}
                        >

                            <Psychology
                                color="primary"
                                fontSize="large"
                            />

                            <Typography
                                variant="h5"
                                fontWeight={700}
                            >
                                Skills
                            </Typography>

                        </Stack>

                        <Box>

                            {data.skills.length === 0 ? (

                                <Typography color="text.secondary">
                                    No skills detected.
                                </Typography>

                            ) : (

                                data.skills.map((skill) => (

                                    <Chip
                                        key={skill}
                                        label={skill}
                                        color="primary"
                                        sx={{
                                            m: .6,
                                            fontWeight: 600
                                        }}
                                    />

                                ))

                            )}

                        </Box>

                    </Paper>

                </Grid>

                {/* Projects */}

                <Grid item xs={12} md={6}>

                    <Paper
                        sx={{
                            p: 3,
                            borderRadius: 4,
                            height: "100%"
                        }}
                    >

                        <Stack
                            direction="row"
                            spacing={2}
                            alignItems="center"
                            mb={3}
                        >

                            <RocketLaunch
                                color="secondary"
                                fontSize="large"
                            />

                            <Typography
                                variant="h5"
                                fontWeight={700}
                            >
                                Projects
                            </Typography>

                        </Stack>

                        {data.projects.length === 0 ? (

                            <Typography color="text.secondary">
                                No projects detected.
                            </Typography>

                        ) : (

                            data.projects.map((project) => (

                                <Paper
                                    key={project}
                                    variant="outlined"
                                    sx={{
                                        p: 2,
                                        mb: 2,
                                        borderRadius: 3
                                    }}
                                >

                                    <Typography>
                                        • {project}
                                    </Typography>

                                </Paper>

                            ))

                        )}

                    </Paper>

                </Grid>

                {/* Education */}

                <Grid item xs={12} md={6}>

                    <Paper
                        sx={{
                            p: 3,
                            borderRadius: 4,
                            height: "100%"
                        }}
                    >

                        <Stack
                            direction="row"
                            spacing={2}
                            alignItems="center"
                            mb={3}
                        >

                            <School
                                color="success"
                                fontSize="large"
                            />

                            <Typography
                                variant="h5"
                                fontWeight={700}
                            >
                                Education
                            </Typography>

                        </Stack>

                        {data.education.length === 0 ? (

                            <Typography color="text.secondary">
                                No education detected.
                            </Typography>

                        ) : (

                            data.education.map((edu) => (

                                <Paper
                                    key={edu}
                                    variant="outlined"
                                    sx={{
                                        p: 2,
                                        mb: 2,
                                        borderRadius: 3
                                    }}
                                >

                                    <Typography>
                                        • {edu}
                                    </Typography>

                                </Paper>

                            ))

                        )}

                    </Paper>

                </Grid>

                {/* Certifications */}

                <Grid item xs={12} md={6}>

                    <Paper
                        sx={{
                            p: 3,
                            borderRadius: 4,
                            height: "100%"
                        }}
                    >

                        <Stack
                            direction="row"
                            spacing={2}
                            alignItems="center"
                            mb={3}
                        >

                            <WorkspacePremium
                                sx={{
                                    color: "#f59e0b"
                                }}
                                fontSize="large"
                            />

                            <Typography
                                variant="h5"
                                fontWeight={700}
                            >
                                Certifications
                            </Typography>

                        </Stack>

                        {data.certifications.length === 0 ? (

                            <Typography color="text.secondary">
                                No certifications detected.
                            </Typography>

                        ) : (

                            data.certifications.map((cert) => (

                                <Paper
                                    key={cert}
                                    variant="outlined"
                                    sx={{
                                        p: 2,
                                        mb: 2,
                                        borderRadius: 3
                                    }}
                                >

                                    <Typography>
                                        • {cert}
                                    </Typography>

                                </Paper>

                            ))

                        )}

                    </Paper>

                </Grid>
                                {/* Experience */}

                <Grid item xs={12}>

                    <Paper
                        sx={{
                            p: 3,
                            borderRadius: 4,
                            mb: 3
                        }}
                    >

                        <Stack
                            direction="row"
                            spacing={2}
                            alignItems="center"
                            mb={3}
                        >

                            <Work
                                color="primary"
                                fontSize="large"
                            />

                            <Typography
                                variant="h5"
                                fontWeight={700}
                            >
                                Experience
                            </Typography>

                        </Stack>

                        {data.experience.length === 0 ? (

                            <Typography color="text.secondary">
                                No professional experience detected.
                            </Typography>

                        ) : (

                            data.experience.map((exp) => (

                                <Paper
                                    key={exp}
                                    variant="outlined"
                                    sx={{
                                        p: 2,
                                        mb: 2,
                                        borderRadius: 3
                                    }}
                                >

                                    <Typography>
                                        • {exp}
                                    </Typography>

                                </Paper>

                            ))

                        )}

                    </Paper>

                </Grid>

                {/* Resume Summary */}

                <Grid item xs={12}>

                    <Paper
                        sx={{
                             p: 5,
        borderRadius: 5,
        bgcolor: "background.paper"
                        }}
                    >

                        <Typography
                            variant="h5"
                            fontWeight={700}
                            gutterBottom
                        >
                            Resume Summary
                        </Typography>

                        <Typography
                            color="text.secondary"
                            paragraph
                        >
                            Your resume has been successfully parsed and
                            analyzed using AI. The information above has
                            been extracted from your uploaded resume and
                            can be used for ATS optimization, job matching,
                            interview preparation, and personalized career
                            recommendations.
                        </Typography>

                        <Grid container spacing={2} mt={1}>

                            <Grid item xs={6} md={2.4}>
                                <Paper
                                    variant="outlined"
                                    sx={{
                                        p: 2,
                                        textAlign: "center",
                                        borderRadius: 3
                                    }}
                                >
                                    <Typography variant="h4" color="primary">
                                        {data.skills.length}
                                    </Typography>
                                    <Typography variant="body2">
                                        Skills
                                    </Typography>
                                </Paper>
                            </Grid>

                            <Grid item xs={6} md={2.4}>
                                <Paper
                                    variant="outlined"
                                    sx={{
                                        p: 2,
                                        textAlign: "center",
                                        borderRadius: 3
                                    }}
                                >
                                    <Typography variant="h4" color="secondary">
                                        {data.projects.length}
                                    </Typography>
                                    <Typography variant="body2">
                                        Projects
                                    </Typography>
                                </Paper>
                            </Grid>

                            <Grid item xs={6} md={2.4}>
                                <Paper
                                    variant="outlined"
                                    sx={{
                                        p: 2,
                                        textAlign: "center",
                                        borderRadius: 3
                                    }}
                                >
                                    <Typography variant="h4" color="success.main">
                                        {data.education.length}
                                    </Typography>
                                    <Typography variant="body2">
                                        Education
                                    </Typography>
                                </Paper>
                            </Grid>

                            <Grid item xs={6} md={2.4}>
                                <Paper
                                    variant="outlined"
                                    sx={{
                                        p: 2,
                                        textAlign: "center",
                                        borderRadius: 3
                                    }}
                                >
                                    <Typography variant="h4" sx={{ color: "#f59e0b" }}>
                                        {data.certifications.length}
                                    </Typography>
                                    <Typography variant="body2">
                                        Certificates
                                    </Typography>
                                </Paper>
                            </Grid>

                            <Grid item xs={12} md={2.4}>
                                <Paper
                                    variant="outlined"
                                    sx={{
                                        p: 2,
                                        textAlign: "center",
                                        borderRadius: 3
                                    }}
                                >
                                    <Typography variant="h4" color="error.main">
                                        {data.experience.length}
                                    </Typography>
                                    <Typography variant="body2">
                                        Experience
                                    </Typography>
                                </Paper>
                            </Grid>

                        </Grid>

                    </Paper>

                </Grid>

            </Grid>

        </Box>

    );

};

export default ResumeAnalysis;