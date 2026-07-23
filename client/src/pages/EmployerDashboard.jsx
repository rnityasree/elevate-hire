import {
    Box,
    Typography,
    Paper,
    Grid,
    Card,
    CardContent,
    Button
} from "@mui/material";

import {
    Work,
    Person,
    BusinessCenter,
    CheckCircle
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

function EmployerDashboard() {

    const navigate = useNavigate();

    const employer =
        JSON.parse(localStorage.getItem("employer")) || {};

    const stats = [
        {
            title: "Active Opportunities",
            value: 0,
            icon: <Work fontSize="large" />
        },
        {
            title: "Applicants",
            value: 0,
            icon: <Person fontSize="large" />
        },
        {
            title: "Interviews",
            value: 0,
            icon: <BusinessCenter fontSize="large" />
        },
        {
            title: "Hired",
            value: 0,
            icon: <CheckCircle fontSize="large" />
        }
    ];

    return (

        <Box sx={{ p: 4 }}>

            <Typography
                variant="h4"
                fontWeight={700}
                gutterBottom
            >
                Employer Dashboard
            </Typography>

            <Typography
                variant="h6"
                color="text.secondary"
                mb={4}
            >
                Welcome, {employer.companyName || "Employer"}
            </Typography>

            <Grid container spacing={3}>

                {stats.map((item) => (

                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={3}
                        key={item.title}
                    >

                        <Card>

                            <CardContent>

                                {item.icon}

                                <Typography
                                    mt={2}
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {item.title}
                                </Typography>

                                <Typography
                                    variant="h4"
                                    fontWeight={700}
                                >
                                    {item.value}
                                </Typography>

                            </CardContent>

                        </Card>

                    </Grid>

                ))}

            </Grid>

            <Paper
                sx={{
                    mt: 5,
                    p: 4
                }}
            >

                <Typography
                    variant="h5"
                    fontWeight={600}
                    gutterBottom
                >
                    Quick Actions
                </Typography>

                <Grid container spacing={2}>

                    <Grid item>

                        <Button
                            variant="contained"
                            onClick={() => navigate("/employer/post-job")}
                        >
                            Post Opportunity
                        </Button>

                    </Grid>

                    <Grid item>

                        <Button
                            variant="outlined"
                            onClick={() => navigate("/employer/jobs")}
                        >
                            Manage Opportunities
                        </Button>

                    </Grid>

                    <Grid item>

                        <Button
                            variant="outlined"
                            onClick={() => navigate("/employer/applicants")}
                        >
                            View Applicants
                        </Button>

                    </Grid>

                    <Grid item>

                        <Button
                            variant="outlined"
                            onClick={() => navigate("/employer/profile")}
                        >
                            Company Profile
                        </Button>

                    </Grid>

                </Grid>

            </Paper>

        </Box>

    );

}

export default EmployerDashboard;