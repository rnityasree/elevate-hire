import { useState } from "react";

import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Divider,
    LinearProgress,
    Paper,
    Stack,
    TextField,
    Typography
} from "@mui/material";

import {
    AutoAwesome,
    Psychology,
    SmartToy,
    Person
} from "@mui/icons-material";

import {
    startMockInterview,
    continueMockInterview
} from "../services/aiService";

function MockInterview() {

    const [jobDescription, setJobDescription] = useState("");

    const [started, setStarted] = useState(false);

    const [loading, setLoading] = useState(false);

    const [messages, setMessages] = useState([]);

    const [answer, setAnswer] = useState("");

    const [history, setHistory] = useState([]);

    const [questionNumber, setQuestionNumber] = useState(1);

    const [totalQuestions, setTotalQuestions] = useState(10);

    const [report, setReport] = useState(null);

    const [error, setError] = useState("");

    const handleStart = async () => {

        if (!jobDescription.trim()) {

            setError("Please enter a job description.");

            return;

        }

        try {

            setLoading(true);

            setError("");

            const res =
                await startMockInterview(jobDescription);

            setStarted(true);

            setQuestionNumber(res.questionNumber);

            setTotalQuestions(res.totalQuestions);

            setMessages([
                {
                    sender: "ai",
                    text: res.question
                }
            ]);

        }

        catch (err) {

            console.error(err);

            setError("Failed to start interview.");

        }

        finally {

            setLoading(false);

        }

    };

    const handleSend = async () => {

        if (!answer.trim()) return;

        const userAnswer = answer;

        const updatedMessages = [

            ...messages,

            {
                sender: "user",
                text: userAnswer
            }

        ];

        setMessages(updatedMessages);

        const updatedHistory = [

            ...history,

            {
                question: messages[messages.length - 1].text,
                answer: userAnswer
            }

        ];

        setHistory(updatedHistory);

        setAnswer("");

        try {

            setLoading(true);

            const res =
                await continueMockInterview({

                    jobDescription,

                    history: updatedHistory,

                    answer: userAnswer,

                    questionNumber

                });

            if (res.finished) {

                setReport(res.report);

                return;

            }

            setMessages(prev => [

                ...prev,

                {
                    sender: "ai",
                    text: res.feedback
                },

                {
                    sender: "ai",
                    text: res.question
                }

            ]);

            setQuestionNumber(res.questionNumber);

        }

        catch (err) {

            console.error(err);

            setError("Something went wrong.");

        }

        finally {

            setLoading(false);

        }

    };

    if (report) {        return (

            <Box>

                <Paper

                    sx={{

                        p:5,

                        mb:4,

                        borderRadius:5,

                        color:"#fff",

                        background:
                        "linear-gradient(135deg,#059669,#0891b2,#2563eb)"

                    }}

                >

                    <Typography
                        variant="h3"
                        fontWeight={700}
                        gutterBottom
                    >

                        Interview Completed

                    </Typography>

                    <Typography variant="h6">

                        Your AI interviewer has analyzed your
                        responses and generated a detailed report.

                    </Typography>

                </Paper>

                <Card
                    sx={{
                        borderRadius:4
                    }}
                >

                    <CardContent>

                        <Typography
                            variant="h4"
                            fontWeight={700}
                        >

                            Overall Score: {report.overallScore}/100

                        </Typography>

                        <LinearProgress

                            variant="determinate"

                            value={report.overallScore}

                            sx={{
                                mt:3,
                                mb:4,
                                height:10,
                                borderRadius:5
                            }}

                        />

                        <Typography>
                            <strong>Communication:</strong> {report.communication}
                        </Typography>

                        <Typography sx={{ mt:1 }}>
                            <strong>Technical:</strong> {report.technical}
                        </Typography>

                        <Typography sx={{ mt:1 }}>
                            <strong>Confidence:</strong> {report.confidence}
                        </Typography>

                        <Typography sx={{ mt:1 }}>
                            <strong>Problem Solving:</strong> {report.problemSolving}
                        </Typography>

                        <Divider sx={{ my:4 }} />                        <Typography
                            variant="h5"
                            fontWeight={700}
                            gutterBottom
                        >
                            Strengths
                        </Typography>

                        <Stack spacing={2} mb={4}>

                            {report.strengths.map((item, index) => (

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

                        <Typography
                            variant="h5"
                            fontWeight={700}
                            gutterBottom
                        >
                            Improvements
                        </Typography>

                        <Stack spacing={2} mb={4}>

                            {report.improvements.map((item, index) => (

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

                        <Divider sx={{ my: 4 }} />

                        <Typography
                            variant="h5"
                            fontWeight={700}
                            gutterBottom
                        >
                            Overall Feedback
                        </Typography>

                        <Typography
                            sx={{
                                mt: 2,
                                lineHeight: 1.9
                            }}
                        >
                            {report.feedback}
                        </Typography>

                        <Divider sx={{ my: 4 }} />                        <Alert
                            severity="success"
                            sx={{ mb: 4 }}
                        >

                            <strong>Hiring Recommendation:</strong>{" "}
                            {report.recommendation}

                        </Alert>

                        <Button
                            variant="contained"
                            size="large"
                            startIcon={<AutoAwesome />}
                            sx={{
                                borderRadius: 3,
                                px: 5
                            }}
                            onClick={() => window.location.reload()}
                        >
                            Start New Interview
                        </Button>

                    </CardContent>

                </Card>

            </Box>

        );

    }

    return (

        <Box>

            <Paper

                sx={{

                    p:5,

                    mb:4,

                    borderRadius:5,

                    color:"#fff",

                    background:
                    "linear-gradient(135deg,#2563eb,#4f46e5,#7c3aed)"

                }}

            >

                <Typography
                    variant="h3"
                    fontWeight={700}
                    gutterBottom
                >

                    AI Mock Interview

                </Typography>

                <Typography variant="h6">

                    Practice realistic interviews with
                    an AI interviewer and receive
                    detailed feedback after completion.

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

            {!started && (                <Paper
                    sx={{
                        p: 4,
                        borderRadius: 4
                    }}
                >

                    <Typography
                        variant="h5"
                        fontWeight={700}
                        gutterBottom
                    >
                        Paste Job Description
                    </Typography>

                    <TextField
                        fullWidth
                        multiline
                        rows={8}
                        sx={{ mt: 2 }}
                        placeholder="Paste the complete job description..."
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                    />

                    <Button
                        variant="contained"
                        size="large"
                        startIcon={
                            loading
                                ? <CircularProgress size={20} color="inherit" />
                                : <AutoAwesome />
                        }
                        sx={{
                            mt: 3,
                            borderRadius: 3,
                            px: 5
                        }}
                        onClick={handleStart}
                        disabled={loading}
                    >
                        {loading ? "Starting..." : "Start Interview"}
                    </Button>

                </Paper>

            )}

            {started && !report && (

                <>

                    <Typography
                        fontWeight={600}
                        mb={1}
                    >
                        Question {questionNumber} of {totalQuestions}
                    </Typography>

                    <LinearProgress
                        variant="determinate"
                        value={(questionNumber / totalQuestions) * 100}
                        sx={{
                            mb: 4,
                            height: 10,
                            borderRadius: 5
                        }}
                    />

                    <Stack spacing={2}>

                        {messages.map((msg, index) => (

                            <Paper
                                key={index}
                                sx={{
                                    p: 3,
                                    borderRadius: 4,
                                    maxWidth: "80%",
                                    alignSelf:
                                        msg.sender === "user"
                                            ? "flex-end"
                                            : "flex-start",
                                    bgcolor:
                                        msg.sender === "user"
                                            ? "primary.main"
                                            : "grey.100",
                                    color:
                                        msg.sender === "user"
                                            ? "primary.contrastText"
                                            : "text.primary"
                                }}
                            >

                                <Stack
                                    direction="row"
                                    spacing={1}
                                    alignItems="center"
                                    mb={1}
                                >

                                    {msg.sender === "user"
                                        ? <Person />
                                        : <SmartToy />}

                                    <Typography fontWeight={700}>
                                        {msg.sender === "user"
                                            ? "You"
                                            : "AI Interviewer"}
                                    </Typography>

                                </Stack>

                                <Typography whiteSpace="pre-line">
                                    {msg.text}
                                </Typography>

                            </Paper>

                        ))}

                    </Stack>

                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        sx={{ mt: 4 }}
                        placeholder="Type your answer..."
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                    />

                    <Button
                        variant="contained"
                        size="large"
                        sx={{
                            mt: 3,
                            borderRadius: 3,
                            px: 5
                        }}
                        onClick={handleSend}
                        disabled={loading || !answer.trim()}
                    >
                        {loading
                            ? <CircularProgress size={20} color="inherit" />
                            : "Send Answer"}
                    </Button>

                </>

            )}

        </Box>

    );

}

export default MockInterview;