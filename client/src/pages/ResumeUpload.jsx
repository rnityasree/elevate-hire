import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
    Box,
    Paper,
    Typography,
    Button,
    Alert,
    Stack,
    LinearProgress,
    Chip
} from "@mui/material";

import {
    UploadFile,
    CloudUpload,
    ArrowBack,
    Description,
    CheckCircle
} from "@mui/icons-material";

function ResumeUpload() {

    const navigate = useNavigate();

    const [file, setFile] = useState(null);

    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState("");

    const [error, setError] = useState("");

    const [resumeData, setResumeData] = useState(null);

    const handleFileChange = (event) => {

        const selectedFile = event.target.files[0];

        setMessage("");
        setError("");
        setResumeData(null);

        if (!selectedFile) return;

        if (selectedFile.type !== "application/pdf") {

            setError("Please select a PDF file only.");

            setFile(null);

            return;

        }

        setFile(selectedFile);

    };

    const handleUpload = async () => {

        if (!file) {

            setError("Please select a resume PDF first.");

            return;

        }

        try {

            setLoading(true);

            setMessage("");

            setError("");

            const token =
                localStorage.getItem("token") ||
                localStorage.getItem("jwtToken") ||
                localStorage.getItem("accessToken");

            if (!token) {

                setError("You are not logged in.");

                setLoading(false);

                return;

            }

            const formData = new FormData();

            formData.append("resume", file);

            const response = await axios.post(

                "http://localhost:5000/api/resume/upload",

                formData,

                {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );

            setMessage(response.data.message);

            setResumeData(response.data.resume);

        }

        catch (err) {

            console.error(err);

            setError(

                err.response?.data?.message ||

                "Resume upload failed."

            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <Box>

            <Button

                startIcon={<ArrowBack />}

                onClick={() => navigate("/dashboard")}

                sx={{ mb: 3 }}

            >

                Back to Dashboard

            </Button>

            <Paper

                sx={{

                    p: 5,

                    borderRadius: 5,

                    background:
                        "linear-gradient(135deg,#2563eb,#4338ca)",

                    color: "#fff",

                    mb: 4

                }}

            >

                <Typography

                    variant="h3"

                    fontWeight={700}

                    gutterBottom

                >

                    Resume Upload

                </Typography>

                <Typography>

                    Upload your latest resume and let ElevateHire
                    analyze your skills, calculate your ATS score,
                    recommend jobs and generate personalized
                    career insights.

                </Typography>

            </Paper>

            <Paper

                sx={{

                    p: 5,

                    borderRadius: 4,

                    textAlign: "center"

                }}

            >

                <UploadFile

                    sx={{

                        fontSize: 80,

                        color: "primary.main",

                        mb: 2

                    }}

                />

                <Typography

                    variant="h5"

                    fontWeight={700}

                >

                    Upload PDF Resume

                </Typography>

                <Typography

                    color="text.secondary"

                    mb={4}

                >

                    Supported format: PDF only

                </Typography>

                <Button

                    variant="outlined"

                    component="label"

                    startIcon={<Description />}

                    size="large"

                >

                    Choose Resume

                    <input

                        hidden

                        type="file"

                        accept=".pdf,application/pdf"

                        onChange={handleFileChange}

                    />

                </Button>
                                {file && (

                    <Box mt={4}>

                        <Chip

                            icon={<Description />}

                            label={file.name}

                            color="primary"

                            sx={{

                                fontSize: 15,

                                px: 1,

                                py: 2

                            }}

                        />

                    </Box>

                )}

                <Box mt={5}>

                    <Button

                        variant="contained"

                        size="large"

                        startIcon={<CloudUpload />}

                        onClick={handleUpload}

                        disabled={loading}

                        sx={{

                            px: 5,

                            py: 1.5,

                            borderRadius: 3

                        }}

                    >

                        {loading

                            ? "Uploading Resume..."

                            : "Upload Resume"}

                    </Button>

                </Box>

                {loading && (

                    <Box mt={4}>

                        <LinearProgress />

                        <Typography

                            variant="body2"

                            color="text.secondary"

                            mt={1}

                        >

                            Uploading and analyzing your resume...

                        </Typography>

                    </Box>

                )}

                {message && (

                    <Alert

                        severity="success"

                        sx={{

                            mt: 4,

                            textAlign: "left"

                        }}

                    >

                        {message}

                    </Alert>

                )}

                {error && (

                    <Alert

                        severity="error"

                        sx={{

                            mt: 4,

                            textAlign: "left"

                        }}

                    >

                        {error}

                    </Alert>

                )}

            </Paper>

            {resumeData && (

                <Paper

                    sx={{

                        mt: 5,

                        p: 4,

                        borderRadius: 4

                    }}

                >

                    <Stack

                        direction="row"

                        spacing={2}

                        alignItems="center"

                        mb={3}

                    >

                        <CheckCircle

                            color="success"

                            sx={{

                                fontSize: 40

                            }}

                        />

                        <Typography

                            variant="h5"

                            fontWeight={700}

                        >

                            Resume Uploaded Successfully

                        </Typography>

                    </Stack>

                    <Typography
                        sx={{ mb: 2 }}
                    >
                        Your resume has been parsed successfully
                        and is now available for AI analysis.
                    </Typography>

                    <Stack spacing={2}>
                                                <Paper
                            variant="outlined"
                            sx={{
                                p: 2,
                                borderRadius: 3
                            }}
                        >
                            <Typography fontWeight={600}>
                                Resume File
                            </Typography>

                            <Typography color="text.secondary">
                                {resumeData.fileName}
                            </Typography>
                        </Paper>

                        <Paper
                            variant="outlined"
                            sx={{
                                p: 2,
                                borderRadius: 3
                            }}
                        >
                            <Typography fontWeight={600}>
                                Extracted Text
                            </Typography>

                            <Typography color="text.secondary">
                                {resumeData.extractedText?.length || 0} Characters
                            </Typography>
                        </Paper>

                        <Paper
                            variant="outlined"
                            sx={{
                                p: 2,
                                borderRadius: 3
                            }}
                        >
                            <Typography fontWeight={600}>
                                Status
                            </Typography>

                            <Typography
                                color="success.main"
                                fontWeight={600}
                            >
                                Ready for AI Analysis
                            </Typography>
                        </Paper>

                    </Stack>

                    <Stack
                        direction={{
                            xs: "column",
                            sm: "row"
                        }}
                        spacing={2}
                        mt={4}
                    >

                        <Button
                            variant="contained"
                            onClick={() =>
                                navigate("/resume-analysis")
                            }
                        >
                            View Resume Analysis
                        </Button>

                        <Button
                            variant="outlined"
                            onClick={() =>
                                navigate("/dashboard")
                            }
                        >
                            Back to Dashboard
                        </Button>

                    </Stack>

                </Paper>

            )}

        </Box>

    );

}

export default ResumeUpload;