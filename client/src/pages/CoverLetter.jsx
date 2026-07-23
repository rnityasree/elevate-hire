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
    ContentCopy,
    Description,
    Download
} from "@mui/icons-material";

function CoverLetter() {

    const [jobDescription, setJobDescription] = useState("");

    const [coverLetter, setCoverLetter] = useState("");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const generateCoverLetter = async () => {

        if (!jobDescription.trim()) {

            setError("Please enter a job description.");

            return;

        }

        try {

            setLoading(true);

            setError("");

            const token = localStorage.getItem("token");

            const res = await axios.post(

                "http://localhost:5000/api/ai/cover-letter",

                {
                    jobDescription
                },

                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

            );

            setCoverLetter(res.data.coverLetter);

        }

        catch (err) {

            console.error(err);

            setError(

                err.response?.data?.message ||

                "Failed to generate cover letter."

            );

        }

        finally {

            setLoading(false);

        }

    };

    const copyToClipboard = () => {

        navigator.clipboard.writeText(coverLetter);

    };

    const downloadLetter = () => {

        const blob = new Blob(
            [coverLetter],
            { type: "text/plain" }
        );

        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.href = url;

        link.download = "CoverLetter.txt";

        link.click();

        window.URL.revokeObjectURL(url);

    };

    return (

        <Box>

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

                    AI Cover Letter Generator

                </Typography>

                <Typography variant="h6">

                    Generate a personalized,
                    ATS-friendly cover letter
                    tailored to any job description
                    using Gemini AI.

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

            <Card
                sx={{
                    borderRadius:4,
                    mb:4
                }}
            >

                <CardContent>

                    <Typography
                        variant="h5"
                        fontWeight={700}
                        gutterBottom
                    >

                        Paste Job Description

                    </Typography>

                    <TextField

                        multiline

                        rows={10}

                        fullWidth

                        sx={{ mt:2 }}

                        value={jobDescription}

                        onChange={(e)=>
                            setJobDescription(e.target.value)
                        }

                        placeholder="Paste the complete job description..."

                    />

                    <Button

                        variant="contained"

                        size="large"

                        sx={{
                            mt:3,
                            borderRadius:3,
                            px:5
                        }}

                        startIcon={
                            loading
                            ? <CircularProgress size={20} color="inherit"/>
                            : <AutoAwesome/>
                        }

                        disabled={loading}

                        onClick={generateCoverLetter}

                    >

                        {loading
                            ? "Generating..."
                            : "Generate Cover Letter"}

                    </Button>

                </CardContent>

            </Card>

            {coverLetter && (

                <Grid
                    container
                    spacing={3}
                >
                                        <Grid item xs={12}>

                        <Card
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

                                    Generated Cover Letter

                                </Typography>

                                <Paper

                                    variant="outlined"

                                    sx={{

                                        p:4,

                                        mt:3,

                                        borderRadius:3,

                                        bgcolor:"grey.50",

                                        maxHeight:600,

                                        overflow:"auto"

                                    }}

                                >

                                    <Typography

                                        whiteSpace="pre-line"

                                        lineHeight={1.9}

                                    >

                                        {coverLetter}

                                    </Typography>

                                </Paper>

                            </CardContent>

                        </Card>

                    </Grid>

                    <Grid item xs={12}>                        <Card
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
                                    Actions
                                </Typography>

                                <Stack
                                    direction={{
                                        xs: "column",
                                        sm: "row"
                                    }}
                                    spacing={2}
                                    mt={3}
                                >

                                    <Button
                                        variant="contained"
                                        startIcon={<ContentCopy />}
                                        onClick={copyToClipboard}
                                        sx={{
                                            borderRadius: 3,
                                            px: 4
                                        }}
                                    >
                                        Copy
                                    </Button>

                                    <Button
                                        variant="outlined"
                                        startIcon={<Download />}
                                        onClick={downloadLetter}
                                        sx={{
                                            borderRadius: 3,
                                            px: 4
                                        }}
                                    >
                                        Download
                                    </Button>

                                </Stack>

                            </CardContent>

                        </Card>

                    </Grid>

                </Grid>

            )}

        </Box>

    );

}

export default CoverLetter;