import { useEffect, useMemo, useState } from "react";
import API from "../services/api";

import {
    Box,
    Paper,
    Typography,
    CircularProgress,
    FormControl,
    Select,
    MenuItem,
    Button,
    Grid,
    Stack,
    Chip
} from "@mui/material";

import {
    Work,
    Business,
    LocationOn,
    CalendarMonth,
    Delete,
    Timeline
} from "@mui/icons-material";

function Applications() {

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");

    const loadApplications = async () => {

        try {

            const res = await API.get("/applications", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setApplications(res.data);

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {
        loadApplications();
    }, []);

    const updateStatus = async (id, status) => {

        try {

            await API.put(
                `/applications/${id}`,
                { status },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            loadApplications();

        } catch (err) {

            console.error(err);

        }

    };

    const deleteApplication = async (id) => {

        try {

            await API.delete(
                `/applications/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            loadApplications();

        } catch (err) {

            console.error(err);

        }

    };

    const stats = useMemo(() => ({

        total: applications.length,

        saved: applications.filter(a => a.status === "Saved").length,

        applied: applications.filter(a => a.status === "Applied").length,

        interview: applications.filter(a => a.status === "Interview").length,

        offer: applications.filter(a => a.status === "Offer").length

    }), [applications]);

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

                    Application Tracker

                </Typography>

                <Typography variant="h6">

                    Track every application, update its progress,
                    and manage your complete job search from one place.

                </Typography>

            </Paper>

            {/* Statistics */}

            <Grid container spacing={3} mb={4}>

                <Grid item xs={6} md={2.4}>
                    <Paper sx={{ p:3, borderRadius:4, textAlign:"center" }}>
                        <Typography variant="h4" fontWeight={700}>
                            {stats.total}
                        </Typography>
                        <Typography>Total</Typography>
                    </Paper>
                </Grid>

                <Grid item xs={6} md={2.4}>
                    <Paper sx={{ p:3, borderRadius:4, textAlign:"center" }}>
                        <Typography variant="h4" color="primary">
                            {stats.saved}
                        </Typography>
                        <Typography>Saved</Typography>
                    </Paper>
                </Grid>

                <Grid item xs={6} md={2.4}>
                    <Paper sx={{ p:3, borderRadius:4, textAlign:"center" }}>
                        <Typography variant="h4" color="success.main">
                            {stats.applied}
                        </Typography>
                        <Typography>Applied</Typography>
                    </Paper>
                </Grid>

                <Grid item xs={6} md={2.4}>
                    <Paper sx={{ p:3, borderRadius:4, textAlign:"center" }}>
                        <Typography variant="h4" color="warning.main">
                            {stats.interview}
                        </Typography>
                        <Typography>Interview</Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={2.4}>
                    <Paper sx={{ p:3, borderRadius:4, textAlign:"center" }}>
                        <Typography variant="h4" color="secondary">
                            {stats.offer}
                        </Typography>
                        <Typography>Offers</Typography>
                    </Paper>
                </Grid>

            </Grid>

            {applications.length === 0 && (

                <Paper
                    sx={{
                        p:6,
                        textAlign:"center",
                        borderRadius:4
                    }}
                >

                    <Typography variant="h6">

                        No applications found.

                    </Typography>

                </Paper>

            )}

            <Grid container spacing={3}>                {applications.map((app) => (

                    <Grid
                        item
                        xs={12}
                        key={app._id}
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
                                        {app.job?.title}
                                    </Typography>

                                    <Stack
                                        direction="row"
                                        spacing={3}
                                        mt={2}
                                        flexWrap="wrap"
                                    >

                                        <Stack
                                            direction="row"
                                            spacing={1}
                                            alignItems="center"
                                        >
                                            <Business color="primary" />
                                            <Typography>
                                                {app.job?.company}
                                            </Typography>
                                        </Stack>

                                        <Stack
                                            direction="row"
                                            spacing={1}
                                            alignItems="center"
                                        >
                                            <LocationOn color="error" />
                                            <Typography>
                                                {app.job?.location}
                                            </Typography>
                                        </Stack>

                                        <Stack
                                            direction="row"
                                            spacing={1}
                                            alignItems="center"
                                        >
                                            <CalendarMonth color="success" />
                                            <Typography>
                                                {new Date(
                                                    app.appliedDate
                                                ).toLocaleDateString()}
                                            </Typography>
                                        </Stack>

                                    </Stack>

                                </Box>

                                <Stack
                                    spacing={2}
                                    alignItems={{
                                        xs: "flex-start",
                                        md: "flex-end"
                                    }}
                                >

                                    <Chip
                                        icon={<Timeline />}
                                        color={
                                            app.status === "Offer"
                                                ? "success"
                                                : app.status === "Interview"
                                                ? "warning"
                                                : app.status === "Rejected"
                                                ? "error"
                                                : "primary"
                                        }
                                        label={app.status}
                                    />

                                </Stack>

                            </Stack>

                            <Box mt={4}>

                                <Typography
                                    fontWeight={700}
                                    mb={1}
                                >
                                    Update Status
                                </Typography>

                                <FormControl fullWidth>

                                    <Select
                                        value={app.status}
                                        onChange={(e) =>
                                            updateStatus(
                                                app._id,
                                                e.target.value
                                            )
                                        }
                                    >

                                        <MenuItem value="Saved">
                                            Saved
                                        </MenuItem>

                                        <MenuItem value="Applied">
                                            Applied
                                        </MenuItem>

                                        <MenuItem value="Interview">
                                            Interview
                                        </MenuItem>

                                        <MenuItem value="Offer">
                                            Offer
                                        </MenuItem>

                                        <MenuItem value="Rejected">
                                            Rejected
                                        </MenuItem>

                                    </Select>

                                </FormControl>

                            </Box>

                            <Stack
                                direction="row"
                                spacing={2}
                                mt={4}
                            >
                                                                <Button
                                    variant="outlined"
                                    color="error"
                                    size="large"
                                    startIcon={<Delete />}
                                    onClick={() =>
                                        deleteApplication(app._id)
                                    }
                                    sx={{
                                        borderRadius: 3,
                                        px: 4
                                    }}
                                >
                                    Delete Application
                                </Button>

                            </Stack>

                        </Paper>

                    </Grid>

                ))}

            </Grid>

        </Box>

    );

}

export default Applications;