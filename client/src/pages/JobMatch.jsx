import { useState } from "react";
import axios from "axios";

import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Grid,
    Paper,
    Stack,
    TextField,
    Typography
} from "@mui/material";

import {
    AutoAwesome,
    Description,
    TrendingUp
} from "@mui/icons-material";

const JobMatch = () => {

    const [jobDescription, setJobDescription] = useState("");

    const [loading, setLoading] = useState(false);

    const [result, setResult] = useState(null);

    const [error, setError] = useState("");

    const analyzeJob = async () => {

        if (!jobDescription.trim()) {

            setError("Please enter a job description.");

            return;

        }

        try {

            setLoading(true);

            setError("");

            const token = localStorage.getItem("token");

            const res = await axios.post(

                "http://localhost:5000/api/ai/job-match",

                {

                    jobDescription

                },

                {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );

            setResult(res.data);

        }

        catch (err) {

            console.error(err);

            setError(

                err.response?.data?.message ||

                "Failed to analyze job description."

            );

        }

        finally {

            setLoading(false);

        }

    };

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

                    AI Job Match

                </Typography>

                <Typography variant="h6">

                    Paste any job description and let Gemini AI
                    compare it against your resume to estimate
                    your match score and hiring potential.

                </Typography>

            </Paper>

            {error && (

                <Alert
                    severity="error"
                    sx={{ mb:3 }}
                >

                    {error}

                </Alert>

            )}

            <Paper
                sx={{
                    p:4,
                    borderRadius:4,
                    mb:4
                }}
            >

                <Typography
                    variant="h5"
                    fontWeight={700}
                    gutterBottom
                >

                    Job Description

                </Typography>

                <TextField

                    fullWidth

                    multiline

                    rows={10}

                    value={jobDescription}

                    onChange={(e)=>
                        setJobDescription(
                            e.target.value
                        )
                    }

                    placeholder="Paste the complete job description here..."

                    sx={{mt:2}}

                />

                <Button

                    variant="contained"

                    size="large"

                    startIcon={
                        loading
                        ? <CircularProgress size={20} color="inherit"/>
                        : <AutoAwesome/>
                    }

                    sx={{
                        mt:3,
                        borderRadius:3,
                        px:5
                    }}

                    disabled={loading}

                    onClick={analyzeJob}

                >

                    {loading
                        ? "Analyzing..."
                        : "Analyze Match"}

                </Button>

            </Paper>

            {result && (

                <>

                    <Grid
                        container
                        spacing={3}
                        mb={4}
                    >

                        <Grid item xs={12} md={6}>

                            <Card sx={{borderRadius:4}}>

                                <CardContent
                                    sx={{textAlign:"center"}}
                                >

                                    <TrendingUp
                                        color="success"
                                        sx={{fontSize:42}}
                                    />

                                    <Typography
                                        variant="h3"
                                        fontWeight={700}
                                    >

                                        {result.matchScore}%

                                    </Typography>

                                    <Typography>

                                        Match Score

                                    </Typography>

                                </CardContent>

                            </Card>

                        </Grid>

                        <Grid item xs={12} md={6}>

                            <Card sx={{borderRadius:4}}>

                                <CardContent
                                    sx={{textAlign:"center"}}
                                >

                                    <Description
                                        color="primary"
                                        sx={{fontSize:42}}
                                    />

                                    <Typography
                                        variant="h5"
                                        fontWeight={700}
                                        mt={2}
                                    >

                                        {result.hiringProbability}

                                    </Typography>

                                    <Typography>

                                        Hiring Probability

                                    </Typography>

                                </CardContent>

                            </Card>

                        </Grid>

                    </Grid>

                    <Grid
                        container
                        spacing={3}
                    >                        {/* Strengths */}

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
                                        Strengths
                                    </Typography>

                                    <Stack spacing={2} mt={3}>

                                        {result.strengths?.map((item, index) => (

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

                                        ))}

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

                                        {result.missingSkills?.map((item, index) => (

                                            <Paper
                                                key={index}
                                                sx={{
                                                    px: 2,
                                                    py: 1,
                                                    borderRadius: 5,
                                                    bgcolor: "error.main",
                                                    color: "#fff"
                                                }}
                                            >
                                                {item}
                                            </Paper>

                                        ))}

                                    </Stack>

                                </CardContent>

                            </Card>

                        </Grid>

                        <Grid item xs={12}>                            <Card
                                sx={{
                                    borderRadius: 4
                                }}
                            >

                                <CardContent>

                                    <Typography
                                        variant="h5"
                                        fontWeight={700}
                                        gutterBottom
                                    >
                                        AI Recommendations
                                    </Typography>

                                    <Stack spacing={2} mt={3}>

                                        {result.recommendations?.map((item, index) => (

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

                                        ))}

                                    </Stack>

                                </CardContent>

                            </Card>

                        </Grid>

                    </Grid>

                </>

            )}

        </Box>

    );

};

export default JobMatch;