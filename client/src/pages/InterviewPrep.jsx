import { useState } from "react";

import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    CircularProgress,
    Divider,
    Grid,
    Paper,
    Stack,
    TextField,
    Typography
} from "@mui/material";

import {
    AutoAwesome,
    ContentCopy,
    Download,
    Psychology
} from "@mui/icons-material";

import { generateInterviewQuestions } from "../services/aiService";

function InterviewPrep() {

    const [jobDescription, setJobDescription] = useState("");

    const [loading, setLoading] = useState(false);

    const [result, setResult] = useState(null);

    const [error, setError] = useState("");

    const handleGenerate = async () => {

        if (!jobDescription.trim()) {

            setError("Please enter a job description.");

            return;

        }

        try {

            setLoading(true);

            setError("");

            const data =
                await generateInterviewQuestions(jobDescription);

            setResult(data);

        }

        catch (err) {

            console.error(err);

            setError(

                err.response?.data?.message ||

                "Failed to generate interview questions."

            );

        }

        finally {

            setLoading(false);

        }

    };

    const copyQuestions = () => {

        if (!result) return;

        let text = "INTERVIEW PREPARATION\n\n";

        text += "TECHNICAL QUESTIONS\n\n";

        result.technical.forEach((q, i) => {

            text += `${i + 1}. ${q.question}\n`;

            text += `Difficulty: ${q.difficulty}\n`;

            text += `${q.answer}\n\n`;

        });

        text += "\nBEHAVIORAL QUESTIONS\n\n";

        result.behavioral.forEach((q, i) => {

            text += `${i + 1}. ${q.question}\n`;

            text += `${q.answer}\n\n`;

        });

        text += "\nHR QUESTIONS\n\n";

        result.hr.forEach((q, i) => {

            text += `${i + 1}. ${q.question}\n`;

            text += `${q.answer}\n\n`;

        });

        navigator.clipboard.writeText(text);

    };

    const downloadGuide = () => {

        if (!result) return;

        const blob = new Blob(

            [JSON.stringify(result, null, 2)],

            {
                type: "text/plain"
            }

        );

        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.href = url;

        link.download = "InterviewGuide.txt";

        link.click();

        URL.revokeObjectURL(url);

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
                    "linear-gradient(135deg,#0ea5e9,#2563eb,#4f46e5)"

                }}

            >

                <Typography
                    variant="h3"
                    fontWeight={700}
                    gutterBottom
                >

                    AI Interview Preparation

                </Typography>

                <Typography variant="h6">

                    Generate technical,
                    behavioral and HR interview
                    questions with AI-generated
                    answers tailored to the job.

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

                        rows={8}

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

                        onClick={handleGenerate}

                    >

                        {loading
                            ? "Generating..."
                            : "Generate Interview Questions"}

                    </Button>

                </CardContent>

            </Card>

            {result && (

                <>
                                <Stack
                    direction={{
                        xs: "column",
                        md: "row"
                    }}
                    spacing={2}
                    mb={3}
                >

                    <Button
                        variant="contained"
                        startIcon={<ContentCopy />}
                        onClick={copyQuestions}
                        sx={{
                            borderRadius: 3,
                            px: 4
                        }}
                    >
                        Copy All
                    </Button>

                    <Button
                        variant="outlined"
                        startIcon={<Download />}
                        onClick={downloadGuide}
                        sx={{
                            borderRadius: 3,
                            px: 4
                        }}
                    >
                        Download Guide
                    </Button>

                </Stack>

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

                                    Technical Questions

                                </Typography>

                                <Divider sx={{ mb: 3 }} />

                                {result.technical.map((item, index) => (

                                    <Paper
                                        key={index}
                                        variant="outlined"
                                        sx={{
                                            p: 3,
                                            mb: 3,
                                            borderRadius: 3
                                        }}
                                    >

                                        <Stack
                                            direction="row"
                                            justifyContent="space-between"
                                            alignItems="center"
                                            mb={2}
                                        >

                                            <Typography
                                                variant="h6"
                                                fontWeight={700}
                                            >
                                                {index + 1}. {item.question}
                                            </Typography>

                                            <Chip
                                                icon={<Psychology />}
                                                label={item.difficulty}
                                                color="primary"
                                            />

                                        </Stack>

                                        <Typography
                                            whiteSpace="pre-line"
                                            lineHeight={1.8}
                                        >
                                            {item.answer}
                                        </Typography>

                                    </Paper>

                                ))}

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

                                    Behavioral Questions

                                </Typography>

                                <Divider sx={{ mb: 3 }} />

                                {result.behavioral.map((item, index) => (

                                    <Paper
                                        key={index}
                                        variant="outlined"
                                        sx={{
                                            p: 3,
                                            mb: 3,
                                            borderRadius: 3
                                        }}
                                    >

                                        <Typography
                                            variant="h6"
                                            fontWeight={700}
                                            mb={2}
                                        >
                                            {index + 1}. {item.question}
                                        </Typography>

                                        <Typography
                                            whiteSpace="pre-line"
                                            lineHeight={1.8}
                                        >
                                            {item.answer}
                                        </Typography>

                                    </Paper>

                                ))}

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
                                    HR Questions
                                </Typography>

                                <Divider sx={{ mb: 3 }} />

                                {result.hr.map((item, index) => (

                                    <Paper
                                        key={index}
                                        variant="outlined"
                                        sx={{
                                            p: 3,
                                            mb: 3,
                                            borderRadius: 3
                                        }}
                                    >

                                        <Typography
                                            variant="h6"
                                            fontWeight={700}
                                            mb={2}
                                        >
                                            {index + 1}. {item.question}
                                        </Typography>

                                        <Typography
                                            whiteSpace="pre-line"
                                            lineHeight={1.8}
                                        >
                                            {item.answer}
                                        </Typography>

                                    </Paper>

                                ))}

                            </CardContent>

                        </Card>

                    </Grid>

                </Grid>

            </>

            )}

        </Box>

    );

}

export default InterviewPrep;