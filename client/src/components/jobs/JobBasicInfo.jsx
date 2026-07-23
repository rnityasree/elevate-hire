import {
    Grid,
    TextField,
    MenuItem
} from "@mui/material";

function JobBasicInfo({ formData, handleChange }) {

    return (

        <Grid container spacing={2}>

            <Grid item xs={12} md={6}>
                <TextField
                    select
                    fullWidth
                    required
                    label="Opportunity Type"
                    name="opportunityType"
                    value={formData.opportunityType}
                    onChange={handleChange}
                >
                    <MenuItem value="Job">Job</MenuItem>
                    <MenuItem value="Internship">Internship</MenuItem>
                    <MenuItem value="Freelancing">Freelancing</MenuItem>
                </TextField>
            </Grid>

            <Grid item xs={12} md={6}>
                <TextField
                    fullWidth
                    required
                    label="Opportunity Title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                />
            </Grid>

            <Grid item xs={12} md={6}>
                <TextField
                    fullWidth
                    required
                    label="Location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                />
            </Grid>

            <Grid item xs={12} md={6}>
                <TextField
                    select
                    fullWidth
                    label="Employment Type"
                    name="employmentType"
                    value={formData.employmentType}
                    onChange={handleChange}
                >
                    <MenuItem value="Full Time">Full Time</MenuItem>
                    <MenuItem value="Part Time">Part Time</MenuItem>
                    <MenuItem value="Internship">Internship</MenuItem>
                    <MenuItem value="Contract">Contract</MenuItem>
                    <MenuItem value="Remote">Remote</MenuItem>
                    <MenuItem value="Hybrid">Hybrid</MenuItem>
                </TextField>
            </Grid>

            <Grid item xs={12} md={6}>
                <TextField
                    select
                    fullWidth
                    label="Experience Level"
                    name="experienceLevel"
                    value={formData.experienceLevel}
                    onChange={handleChange}
                >
                    <MenuItem value="Entry Level">Entry Level</MenuItem>
                    <MenuItem value="Mid Level">Mid Level</MenuItem>
                    <MenuItem value="Senior Level">Senior Level</MenuItem>
                </TextField>
            </Grid>

            <Grid item xs={12} md={6}>
                <TextField
                    fullWidth
                    label="Salary"
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                />
            </Grid>

            <Grid item xs={12} md={6}>
                <TextField
                    fullWidth
                    type="number"
                    label="Vacancies"
                    name="vacancies"
                    value={formData.vacancies}
                    onChange={handleChange}
                />
            </Grid>

            <Grid item xs={12} md={6}>
                <TextField
                    fullWidth
                    type="date"
                    label="Application Deadline"
                    name="applicationDeadline"
                    value={formData.applicationDeadline}
                    onChange={handleChange}
                    InputLabelProps={{
                        shrink: true
                    }}
                />
            </Grid>

        </Grid>

    );

}

export default JobBasicInfo;