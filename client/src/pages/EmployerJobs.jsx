import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

import {
    Box,
    Typography,
    Paper,
    Button,
    CircularProgress,
    Alert,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip
} from "@mui/material";

function EmployerJobs() {

    const navigate = useNavigate();

    const [jobs, setJobs] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const fetchJobs = async () => {

        try {

            const token = localStorage.getItem("employerToken");

            const res = await API.get(
                "/employer/jobs",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setJobs(res.data.jobs);

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Unable to load opportunities."
            );

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchJobs();

    }, []);

    const deleteJob = async (id) => {

        if (!window.confirm("Delete this opportunity?")) return;

        try {

            const token = localStorage.getItem("employerToken");

            await API.delete(
                `/employer/jobs/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            fetchJobs();

        } catch (err) {

            alert(
                err.response?.data?.message ||
                "Failed to delete opportunity."
            );

        }

    };

    if (loading) {

        return (

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 8
                }}
            >

                <CircularProgress />

            </Box>

        );

    }

    return (

        <Box sx={{ p: 4 }}>

            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={3}
            >

                <Typography
                    variant="h4"
                    fontWeight={700}
                >

                    My Opportunities

                </Typography>

                <Button
                    variant="contained"
                    onClick={() =>
                        navigate("/employer/post-job")
                    }
                >

                    Post Opportunity

                </Button>

            </Box>

            {error && (

                <Alert
                    severity="error"
                    sx={{ mb: 2 }}
                >

                    {error}

                </Alert>

            )}

            <TableContainer component={Paper}>

                <Table>

                    <TableHead>

                        <TableRow>

                            <TableCell>
                                Type
                            </TableCell>

                            <TableCell>
                                Title
                            </TableCell>

                            <TableCell>
                                Location
                            </TableCell>

                            <TableCell>
                                Employment
                            </TableCell>

                            <TableCell>
                                Status
                            </TableCell>

                            <TableCell>
                                Created
                            </TableCell>

                            <TableCell align="center">
                                Actions
                            </TableCell>

                        </TableRow>

                    </TableHead>

                    <TableBody>

                        {

                            jobs.length === 0 ?

                                (

                                    <TableRow>

                                        <TableCell
                                            colSpan={7}
                                            align="center"
                                        >

                                            No opportunities posted yet.

                                        </TableCell>

                                    </TableRow>

                                )

                                :

                                jobs.map((job) => (

                                    <TableRow
                                        key={job._id}
                                    >

                                        <TableCell>

                                            <Chip
                                                label={job.opportunityType}
                                                color={
                                                    job.opportunityType === "Job"
                                                        ? "primary"
                                                        : job.opportunityType === "Internship"
                                                            ? "success"
                                                            : "secondary"
                                                }
                                            />

                                        </TableCell>

                                        <TableCell>

                                            {job.title}

                                        </TableCell>

                                        <TableCell>

                                            {job.location}

                                        </TableCell>

                                        <TableCell>

                                            {job.employmentType}

                                        </TableCell>

                                        <TableCell>

                                            <Chip
                                                label={job.status}
                                                color={
                                                    job.status === "Open"
                                                        ? "success"
                                                        : "default"
                                                }
                                            />

                                        </TableCell>

                                        <TableCell>

                                            {new Date(
                                                job.createdAt
                                            ).toLocaleDateString()}

                                        </TableCell>

                                        <TableCell
                                            align="center"
                                        >

                                            <Button
                                                size="small"
                                                sx={{ mr: 1 }}
                                                onClick={() =>
                                                    navigate(`/employer/jobs/edit/${job._id}`)
                                                }
                                            >

                                                Edit

                                            </Button>

                                            <Button
                                                size="small"
                                                color="error"
                                                onClick={() =>
                                                    deleteJob(job._id)
                                                }
                                            >

                                                Delete

                                            </Button>

                                        </TableCell>

                                    </TableRow>

                                ))

                        }

                    </TableBody>

                </Table>

            </TableContainer>

        </Box>

    );

}

export default EmployerJobs;