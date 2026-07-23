import {
    Box,
    Paper,
    Typography,
    Alert
} from "@mui/material";

function EmployerApplicants() {

    return (

        <Box sx={{ p: 4 }}>

            <Paper sx={{ p: 4 }}>

                <Typography
                    variant="h4"
                    fontWeight={700}
                    gutterBottom
                >

                    Applicants

                </Typography>

                <Alert severity="info">

                    Applicant management will be available after candidates
                    start applying for your opportunities.

                </Alert>

            </Paper>

        </Box>

    );

}

export default EmployerApplicants;