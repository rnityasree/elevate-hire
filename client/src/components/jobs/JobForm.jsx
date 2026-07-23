import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import API from "../../services/api";

import {
    Box,
    Paper,
    Typography,
    Button,
    Alert,
    CircularProgress
} from "@mui/material";

import JobBasicInfo from "./JobBasicInfo";
import JobDetails from "./JobDetails";

function JobForm({ mode = "create" }) {

    const navigate = useNavigate();

    const { id } = useParams();

    const [loading, setLoading] = useState(false);

    const [success, setSuccess] = useState("");

    const [error, setError] = useState("");

    const [formData, setFormData] = useState({

        opportunityType: "Job",

        title: "",

        location: "",

        employmentType: "Full Time",

        experienceLevel: "Entry Level",

        salary: "",

        vacancies: 1,

        applicationDeadline: "",

        skills: "",

        description: "",

        requirements: "",

        responsibilities: ""

    });

    useEffect(() => {

        if (mode === "edit") {

            fetchJob();

        }

    }, [id]);

    const fetchJob = async () => {

        try {

            setLoading(true);

            const token = localStorage.getItem("employerToken");

            const res = await API.get(

                `/employer/jobs/${id}`,

                {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );

            const job = res.data.job;

            setFormData({

                opportunityType: job.opportunityType || "Job",

                title: job.title || "",

                location: job.location || "",

                employmentType: job.employmentType || "Full Time",

                experienceLevel: job.experienceLevel || "Entry Level",

                salary: job.salary || "",

                vacancies: job.vacancies || 1,

                applicationDeadline: job.applicationDeadline
                    ? job.applicationDeadline.substring(0, 10)
                    : "",

                skills: Array.isArray(job.skills)
                    ? job.skills.join(", ")
                    : "",

                description: job.description || "",

                requirements: job.requirements || "",

                responsibilities: job.responsibilities || ""

            });

        } catch (err) {

            setError("Unable to load opportunity.");

        } finally {

            setLoading(false);

        }

    };

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };
    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        setSuccess("");

        setError("");

        try {

            const token = localStorage.getItem("employerToken");

            const payload = {

                ...formData,

                skills: formData.skills
                    .split(",")
                    .map(skill => skill.trim())
                    .filter(skill => skill)

            };

            if (mode === "create") {

                await API.post(

                    "/employer/jobs",

                    payload,

                    {

                        headers: {

                            Authorization: `Bearer ${token}`

                        }

                    }

                );

                setSuccess("Opportunity posted successfully.");

                setFormData({

                    opportunityType: "Job",

                    title: "",

                    location: "",

                    employmentType: "Full Time",

                    experienceLevel: "Entry Level",

                    salary: "",

                    vacancies: 1,

                    applicationDeadline: "",

                    skills: "",

                    description: "",

                    requirements: "",

                    responsibilities: ""

                });

            } else {

                await API.put(

                    `/employer/jobs/${id}`,

                    payload,

                    {

                        headers: {

                            Authorization: `Bearer ${token}`

                        }

                    }

                );

                setSuccess("Opportunity updated successfully.");

                setTimeout(() => {

                    navigate("/employer/jobs");

                }, 1000);

            }

        } catch (err) {

            setError(

                err.response?.data?.message ||

                `Failed to ${mode === "create" ? "post" : "update"} opportunity.`

            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <Box sx={{ p: 4 }}>

            <Paper sx={{ p: 4 }}>

                <Typography
                    variant="h4"
                    fontWeight={700}
                    mb={3}
                >

                    {mode === "create"

                        ? "Post New Opportunity"

                        : "Edit Opportunity"}

                </Typography>

                {success && (

                    <Alert
                        severity="success"
                        sx={{ mb: 2 }}
                    >

                        {success}

                    </Alert>

                )}

                {error && (

                    <Alert
                        severity="error"
                        sx={{ mb: 2 }}
                    >

                        {error}

                    </Alert>

                )}

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                >

                    <JobBasicInfo

                        formData={formData}

                        handleChange={handleChange}

                    />

                    <JobDetails

                        formData={formData}

                        handleChange={handleChange}

                    />
                                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        sx={{
                            mt: 4,
                            minWidth: 220
                        }}
                        disabled={loading}
                    >

                        {loading ? (

                            <CircularProgress
                                color="inherit"
                                size={22}
                            />

                        ) : mode === "create" ? (

                            "Post Opportunity"

                        ) : (

                            "Update Opportunity"

                        )}

                    </Button>

                </Box>

            </Paper>

        </Box>

    );

}

export default JobForm;