import { Button, Container, Paper, Stack, Typography } from "@mui/material";
import ErrorOutlinedIcon from "@mui/icons-material/ErrorOutlined";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

function NotFound() {
    const navigate = useNavigate();

    return (
        <Container maxWidth="md">
            <Paper
                elevation={0}
                sx={{
                    mt: 10,
                    p: 8,
                    textAlign: "center",
                    borderRadius: 6,
                    background:
                        "linear-gradient(135deg,#2563eb,#4f46e5,#7c3aed)",
                    color: "#fff"
                }}
            >
                <ErrorOutlinedIcon
                    sx={{
                        fontSize: 120,
                        mb: 3,
                        opacity: 0.95
                    }}
                />

                <Typography variant="h1" fontWeight={800}>
                    404
                </Typography>

                <Typography
                    variant="h4"
                    mt={2}
                    fontWeight={700}
                >
                    Page Not Found
                </Typography>

                <Typography
                    variant="h6"
                    mt={2}
                    sx={{
                        opacity: 0.9,
                        maxWidth: 650,
                        mx: "auto"
                    }}
                >
                    Sorry, the page you're looking for doesn't exist or may have
                    been moved.
                </Typography>

                <Stack
                    direction={{
                        xs: "column",
                        sm: "row"
                    }}
                    spacing={2}
                    justifyContent="center"
                    mt={6}
                >
                    <Button
                        variant="contained"
                        color="inherit"
                        startIcon={<HomeIcon />}
                        size="large"
                        onClick={() => navigate("/dashboard")}
                        sx={{
                            color: "primary.main",
                            px: 5,
                            borderRadius: 3,
                            fontWeight: 700
                        }}
                    >
                        Go to Dashboard
                    </Button>

                    <Button
                        variant="outlined"
                        size="large"
                        onClick={() => navigate(-1)}
                        sx={{
                            color: "#fff",
                            borderColor: "#fff",
                            px: 5,
                            borderRadius: 3,
                            "&:hover": {
                                borderColor: "#fff",
                                backgroundColor: "rgba(255,255,255,0.12)"
                            }
                        }}
                    >
                        Go Back
                    </Button>
                </Stack>
            </Paper>
        </Container>
    );
}

export default NotFound;