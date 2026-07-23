import {
    Card,
    CardContent,
    Typography,
    Box
} from "@mui/material";

function DashboardCard({ title, value, color }) {
    return (
        <Card
            sx={{
                borderRadius: 4,
                height: "100%",
                transition: "0.3s",
                border: "1px solid",
                borderColor: "divider",
                "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: 8
                }
            }}
        >
            <Box
                sx={{
                    height: 6,
                    bgcolor: color
                }}
            />

            <CardContent sx={{ p: 3 }}>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                >
                    {title}
                </Typography>

                <Typography
                    variant="h4"
                    fontWeight={700}
                >
                    {value}
                </Typography>

            </CardContent>

        </Card>
    );
}

export default DashboardCard;