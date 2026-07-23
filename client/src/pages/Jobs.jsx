import { useEffect, useMemo, useState } from "react";
import API from "../services/api";

import {
    Box,
    Paper,
    Typography,
    Button,
    Chip,
    Stack,
    CircularProgress,
    Grid,
    TextField,
    InputAdornment
} from "@mui/material";

import {
    Search,
    Work,
    Business,
    LocationOn,
    Paid,
    FavoriteBorder,
    Launch
} from "@mui/icons-material";

function Jobs() {

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const token = localStorage.getItem("token");

    useEffect(() => {
        loadJobs();
    }, []);

    const loadJobs = async () => {

        try {

            const res = await API.get("/jobs", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setJobs(res.data);

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);

        }

    };

    const filteredJobs = useMemo(() => {

        return jobs.filter(job => {

            const value = search.toLowerCase();

            return (
                job.title?.toLowerCase().includes(value) ||
                job.company?.toLowerCase().includes(value) ||
                job.location?.toLowerCase().includes(value)
            );

        });

    }, [jobs, search]);

    const saveJob = async (jobId) => {

        try {

            await API.post(
                "/applications/save",
                { jobId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Job saved.");

        } catch (err) {

            console.error(err);

            alert(
                err.response?.data?.message ||
                "Unable to save job."
            );

        }

    };

    const applyJob = async (job) => {

        try {

            await API.post(
                "/applications/apply",
                {
                    jobId: job._id
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            window.open(job.applyLink, "_blank");

        } catch (err) {

            console.error(err);

            alert(
                err.response?.data?.message ||
                "Unable to apply."
            );

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
                <CircularProgress size={70}/>
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

                    Recommended Jobs

                </Typography>

                <Typography variant="h6">

                    AI matched these opportunities based on
                    your resume, ATS score and extracted skills.

                </Typography>

            </Paper>

            {/* Search */}

            <TextField

                fullWidth

                placeholder="Search by job title, company or location..."

                value={search}

                onChange={(e)=>setSearch(e.target.value)}

                sx={{mb:4}}

                InputProps={{

                    startAdornment:(

                        <InputAdornment position="start">

                            <Search/>

                        </InputAdornment>

                    )

                }}

            />

            <Typography
                variant="h5"
                fontWeight={700}
                mb={3}
            >

                {filteredJobs.length} Jobs Found

            </Typography>

            <Grid
                container
                spacing={3}
            >
                                {filteredJobs.length === 0 && (

                    <Grid item xs={12}>

                        <Paper
                            sx={{
                                p: 6,
                                borderRadius: 4,
                                textAlign: "center"
                            }}
                        >

                            <Typography variant="h6">
                                No matching jobs found.
                            </Typography>

                        </Paper>

                    </Grid>

                )}

                {filteredJobs.map((job) => (

                    <Grid
                        item
                        xs={12}
                        key={job._id}
                    >

                        <Paper
                            elevation={3}
                            sx={{
                                p: 4,
                                borderRadius: 4,
                                transition: "0.3s",
                                "&:hover": {
                                    transform: "translateY(-4px)",
                                    boxShadow: 8
                                }
                            }}
                        >

                            <Stack
                                direction={{
                                    xs: "column",
                                    md: "row"
                                }}
                                justifyContent="space-between"
                                spacing={3}
                            >

                                <Box flex={1}>

                                    <Typography
                                        variant="h5"
                                        fontWeight={700}
                                    >
                                        {job.title}
                                    </Typography>

                                    <Stack
                                        direction="row"
                                        spacing={3}
                                        flexWrap="wrap"
                                        mt={2}
                                    >

                                        <Stack
                                            direction="row"
                                            spacing={1}
                                            alignItems="center"
                                        >
                                            <Business color="primary" />
                                            <Typography>
                                                {job.company}
                                            </Typography>
                                        </Stack>

                                        <Stack
                                            direction="row"
                                            spacing={1}
                                            alignItems="center"
                                        >
                                            <LocationOn color="error" />
                                            <Typography>
                                                {job.location}
                                            </Typography>
                                        </Stack>

                                        <Stack
                                            direction="row"
                                            spacing={1}
                                            alignItems="center"
                                        >
                                            <Work color="success" />
                                            <Typography>
                                                {job.employmentType}
                                            </Typography>
                                        </Stack>

                                        {job.salary && (

                                            <Stack
                                                direction="row"
                                                spacing={1}
                                                alignItems="center"
                                            >

                                                <Paid color="warning" />

                                                <Typography>
                                                    {job.salary}
                                                </Typography>

                                            </Stack>

                                        )}

                                    </Stack>

                                    <Typography
                                        color="text.secondary"
                                        mt={3}
                                    >
                                        {job.description}
                                    </Typography>

                                </Box>

                                <Stack
                                    spacing={2}
                                    alignItems={{
                                        xs: "flex-start",
                                        md: "flex-end"
                                    }}
                                >

                                    {job.matchPercentage && (

                                        <Chip
                                            color="success"
                                            label={`ATS Match ${job.matchPercentage}%`}
                                        />

                                    )}

                                    <Chip
                                        color="primary"
                                        label={`${job.skills?.length || 0} Skills`}
                                    />

                                </Stack>

                            </Stack>

                            <Typography
                                mt={4}
                                fontWeight={700}
                            >
                                Required Skills
                            </Typography>

                            <Stack
                                direction="row"
                                spacing={1}
                                mt={2}
                                flexWrap="wrap"
                            >

                                {job.skills?.map((skill) => (

                                    <Chip
                                        key={skill}
                                        label={skill}
                                        sx={{ mb: 1 }}
                                    />

                                ))}

                            </Stack>

                            {job.matchedSkills?.length > 0 && (

                                <>

                                    <Typography
                                        mt={4}
                                        fontWeight={700}
                                        color="success.main"
                                    >
                                        Matched Skills
                                    </Typography>

                                    <Stack
                                        direction="row"
                                        spacing={1}
                                        mt={2}
                                        flexWrap="wrap"
                                    >

                                        {job.matchedSkills.map((skill) => (

                                            <Chip
                                                key={skill}
                                                label={skill}
                                                color="success"
                                                sx={{ mb: 1 }}
                                            />

                                        ))}

                                    </Stack>

                                </>

                            )}

                            {job.missingSkills?.length > 0 && (

                                <>

                                    <Typography
                                        mt={4}
                                        fontWeight={700}
                                        color="warning.main"
                                    >
                                        Missing Skills
                                    </Typography>

                                    <Stack
                                        direction="row"
                                        spacing={1}
                                        mt={2}
                                        flexWrap="wrap"
                                    >

                                        {job.missingSkills.map((skill) => (

                                            <Chip
                                                key={skill}
                                                label={skill}
                                                color="warning"
                                                sx={{ mb: 1 }}
                                            />

                                        ))}

                                    </Stack>

                                </>

                            )}

                            <Stack
                                direction="row"
                                spacing={2}
                                mt={4}
                            >
                                                                <Button
                                    variant="contained"
                                    size="large"
                                    startIcon={<FavoriteBorder />}
                                    onClick={() => saveJob(job._id)}
                                    sx={{
                                        borderRadius: 3,
                                        px: 4
                                    }}
                                >
                                    Save Job
                                </Button>

                                <Button
                                    variant="outlined"
                                    size="large"
                                    startIcon={<Launch />}
                                    onClick={() => applyJob(job)}
                                    sx={{
                                        borderRadius: 3,
                                        px: 4
                                    }}
                                >
                                    Apply Now
                                </Button>

                            </Stack>

                        </Paper>

                    </Grid>

                ))}

            </Grid>

        </Box>

    );

}

export default Jobs;