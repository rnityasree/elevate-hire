import {
    Grid,
    TextField
} from "@mui/material";

function JobDetails({ formData, handleChange }) {

    return (

        <Grid container spacing={2} sx={{ mt: 1 }}>

            <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Skills (comma separated)"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    placeholder="React, Node.js, MongoDB"
                />
            </Grid>

            <Grid item xs={12}>
                <TextField
                    fullWidth
                    multiline
                    rows={5}
                    label="Opportunity Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />
            </Grid>

            <Grid item xs={12}>
                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Requirements"
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleChange}
                />
            </Grid>

            <Grid item xs={12}>
                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Responsibilities"
                    name="responsibilities"
                    value={formData.responsibilities}
                    onChange={handleChange}
                />
            </Grid>

        </Grid>

    );

}

export default JobDetails;