import { useEffect, useState } from "react";
import axios from "axios";

import {
    Box,
    Paper,
    Typography,
    Grid,
    Card,
    CardContent,
    CircularProgress,
    LinearProgress,
    Chip,
    Stack,
    Alert
} from "@mui/material";

import {
    Psychology,
    TrendingUp,
    Description,
    AutoAwesome
} from "@mui/icons-material";

const ResumeImprovement = () => {

    const [loading, setLoading] = useState(true);

    const [data, setData] = useState(null);

    const [error, setError] = useState("");

    useEffect(() => {

        fetchSuggestions();

    }, []);

    const fetchSuggestions = async () => {

        try {

            const token = localStorage.getItem("token");

            const res = await axios.get(

                "http://localhost:5000/api/ai/resume-improvement",

                {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );

            setData(res.data);

        }

        catch (err) {

            setError(

                err.response?.data?.message ||

                "Failed to generate AI feedback."

            );

        }

        finally {

            setLoading(false);

        }

    };

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

    if (error) {

        return (

            <Box>

                <Alert severity="error">

                    {error}

                </Alert>

            </Box>

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

                <Typography

                    variant="h3"

                    fontWeight={700}

                    gutterBottom

                >

                    AI Resume Improvement

                </Typography>

                <Typography variant="h6">

                    Gemini AI analyzed your resume and generated
                    personalized ATS recommendations, recruiter
                    feedback and optimization suggestions.

                </Typography>

            </Paper>

            {/* Score Cards */}

            <Grid
                container
                spacing={3}
                mb={4}
            >

                <Grid item xs={12} md={4}>

                    <Card sx={{borderRadius:4}}>

                        <CardContent sx={{textAlign:"center"}}>

                            <TrendingUp
                                color="success"
                                sx={{fontSize:42}}
                            />

                            <Typography
                                variant="h3"
                                fontWeight={700}
                            >

                                {data.atsScore ?? "-"}

                            </Typography>

                            <Typography>

                                ATS Score

                            </Typography>

                        </CardContent>

                    </Card>

                </Grid>

                <Grid item xs={12} md={4}>

                    <Card sx={{borderRadius:4}}>

                        <CardContent sx={{textAlign:"center"}}>

                            <Psychology
                                color="primary"
                                sx={{fontSize:42}}
                            />

                            <Typography
                                variant="h3"
                                fontWeight={700}
                            >

                                {data.resumeScore ?? "-"}

                            </Typography>

                            <Typography>

                                AI Resume Score

                            </Typography>

                        </CardContent>

                    </Card>

                </Grid>

                <Grid item xs={12} md={4}>

                    <Card sx={{borderRadius:4}}>

                        <CardContent sx={{textAlign:"center"}}>

                            <Description
                                color="secondary"
                                sx={{fontSize:42}}
                            />

                            <Typography
                                variant="h3"
                                fontWeight={700}
                            >

                                {data.resumeLength}

                            </Typography>

                            <Typography>

                                Characters

                            </Typography>

                        </CardContent>

                    </Card>

                </Grid>

            </Grid>

            <Paper
                sx={{
                    p:4,
                    mb:4,
                    borderRadius:4
                }}
            >

                <Typography
                    variant="h5"
                    fontWeight={700}
                    gutterBottom
                >

                    Overall Resume Quality

                </Typography>

                <LinearProgress

                    variant="determinate"

                    value={data.resumeScore || 0}

                    sx={{

                        height:12,

                        borderRadius:10,

                        mt:2

                    }}

                />

            </Paper>

            <Grid
                container
                spacing={3}
            >                {/* Professional Summary */}

                <Grid item xs={12}>

                    <Card sx={{ borderRadius: 4 }}>

                        <CardContent>

                            <Typography
                                variant="h5"
                                fontWeight={700}
                                gutterBottom
                            >
                                Professional Summary
                            </Typography>

                            <Typography
                                color="text.secondary"
                                sx={{
                                    mt: 2,
                                    lineHeight: 1.9
                                }}
                            >
                                {data.professionalSummary}
                            </Typography>

                        </CardContent>

                    </Card>

                </Grid>

                {/* Improved Experience */}

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
                                Improved Experience
                            </Typography>

                            <Stack spacing={2} mt={3}>

                                {data.improvedExperience?.map(
                                    (item, index) => (

                                        <Paper
                                            key={index}
                                            variant="outlined"
                                            sx={{
                                                p: 2,
                                                borderRadius: 3,
                                                bgcolor: "grey.50"
                                            }}
                                        >

                                            <Typography>

                                                • {item}

                                            </Typography>

                                        </Paper>

                                    )
                                )}

                            </Stack>

                        </CardContent>

                    </Card>

                </Grid>

                {/* Missing Skills */}

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
                                Missing Skills
                            </Typography>

                            <Stack
                                direction="row"
                                spacing={1}
                                flexWrap="wrap"
                                useFlexGap
                                mt={3}
                            >

                                {data.missingSkills?.map((skill, index) => (

                                    <Chip
                                        key={index}
                                        color="error"
                                        label={skill}
                                    />

                                ))}

                            </Stack>

                        </CardContent>

                    </Card>

                </Grid>

                {/* ATS Suggestions */}

                <Grid item xs={12}>

                    <Card sx={{ borderRadius: 4 }}>

                        <CardContent>

                            <Typography
                                variant="h5"
                                fontWeight={700}
                                gutterBottom
                            >
                                ATS Suggestions
                            </Typography>

                            <Stack spacing={2} mt={3}>

                                {data.atsSuggestions?.map(
                                    (item, index) => (

                                        <Paper
                                            key={index}
                                            variant="outlined"
                                            sx={{
                                                p: 2,
                                                borderRadius: 3
                                            }}
                                        >

                                            <Typography>

                                                • {item}

                                            </Typography>

                                        </Paper>

                                    )
                                )}

                            </Stack>

                        </CardContent>

                    </Card>

                </Grid>                {/* Recruiter Feedback */}

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
                                Recruiter Feedback
                            </Typography>

                            <Stack spacing={2} mt={3}>

                                {data.recruiterFeedback?.map(
                                    (item, index) => (

                                        <Paper
                                            key={index}
                                            variant="outlined"
                                            sx={{
                                                p: 2,
                                                borderRadius: 3
                                            }}
                                        >

                                            <Typography>

                                                • {item}

                                            </Typography>

                                        </Paper>

                                    )
                                )}

                            </Stack>

                        </CardContent>

                    </Card>

                </Grid>

                {/* Suggested Keywords */}

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
                                Suggested Keywords
                            </Typography>

                            <Stack
                                direction="row"
                                spacing={1}
                                flexWrap="wrap"
                                useFlexGap
                                mt={3}
                            >

                                {data.keywords?.map((item, index) => (

                                    <Chip
                                        key={index}
                                        icon={<AutoAwesome />}
                                        label={item}
                                        color="primary"
                                        variant="filled"
                                    />

                                ))}

                            </Stack>

                        </CardContent>

                    </Card>

                </Grid>

                {/* AI Insight */}

                <Grid item xs={12}>

                    <Paper
                        sx={{
                            p: 4,
                            borderRadius: 4,
                            background:
                                "linear-gradient(135deg,#eef2ff,#f5f3ff)"
                        }}
                    >

                        <Stack
                            direction="row"
                            spacing={2}
                            alignItems="center"
                        >

                            <AutoAwesome
                                color="secondary"
                                sx={{ fontSize: 40 }}
                            />

                            <Box>

                                <Typography
                                    variant="h5"
                                    fontWeight={700}
                                >
                                    AI Insight
                                </Typography>

                                <Typography
                                    color="text.secondary"
                                    mt={1}
                                >
                                    Focus on incorporating the suggested
                                    keywords, strengthening your experience
                                    bullet points with measurable
                                    achievements, and following the ATS
                                    recommendations to improve your resume's
                                    visibility and recruiter appeal.
                                </Typography>

                            </Box>

                        </Stack>

                    </Paper>

                </Grid>

            </Grid>

        </Box>

    );

};

export default ResumeImprovement;