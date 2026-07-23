import { useEffect, useState } from "react";
import API from "../../services/api";

import {
    Box,
    Paper,
    Typography,
    Grid,
    TextField,
    Button,
    Alert,
    CircularProgress
} from "@mui/material";

function CompanyProfile() {

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [success, setSuccess] = useState("");

    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        companyName: "",
        companyEmail: "",
        companyLogo: "",
        industry: "",
        companySize: "",
        website: "",
        location: "",
        description: "",
        foundedYear: "",
        socialLinks: {
            linkedin: "",
            twitter: "",
            facebook: ""
        }
    });

    useEffect(() => {

        fetchProfile();

    }, []);

    const fetchProfile = async () => {

        try {

            const token = localStorage.getItem("employerToken");

            const res = await API.get(
                "/employer/profile",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setFormData({
                ...formData,
                ...res.data.employer
            });

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Failed to load company profile."
            );

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

    const handleSocialChange = (e) => {

        setFormData({
            ...formData,
            socialLinks: {
                ...formData.socialLinks,
                [e.target.name]: e.target.value
            }
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setSaving(true);

        setSuccess("");

        setError("");

        try {

            const token = localStorage.getItem("employerToken");

            await API.put(
                "/employer/profile",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setSuccess("Company profile updated successfully.");

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Failed to update company profile."
            );

        } finally {

            setSaving(false);

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

            <Paper sx={{ p: 4 }}>

                <Typography
                    variant="h4"
                    fontWeight={700}
                    mb={3}
                >

                    Company Profile

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

                    <Grid container spacing={2}>

                        <Grid item xs={12} md={6}>

                            <TextField
                                fullWidth
                                label="Company Name"
                                name="companyName"
                                value={formData.companyName || ""}
                                onChange={handleChange}
                            />

                        </Grid>

                        <Grid item xs={12} md={6}>

                            <TextField
                                fullWidth
                                label="Company Email"
                                name="companyEmail"
                                value={formData.companyEmail || ""}
                                onChange={handleChange}
                            />

                        </Grid>

                        <Grid item xs={12}>

                            <TextField
                                fullWidth
                                label="Company Logo URL"
                                name="companyLogo"
                                value={formData.companyLogo || ""}
                                onChange={handleChange}
                            />

                        </Grid>

                        <Grid item xs={12} md={6}>

                            <TextField
                                fullWidth
                                label="Industry"
                                name="industry"
                                value={formData.industry || ""}
                                onChange={handleChange}
                            />

                        </Grid>

                        <Grid item xs={12} md={6}>

                            <TextField
                                fullWidth
                                label="Company Size"
                                name="companySize"
                                value={formData.companySize || ""}
                                onChange={handleChange}
                            />

                        </Grid>

                        <Grid item xs={12} md={6}>

                            <TextField
                                fullWidth
                                label="Website"
                                name="website"
                                value={formData.website || ""}
                                onChange={handleChange}
                            />

                        </Grid>

                        <Grid item xs={12} md={6}>

                            <TextField
                                fullWidth
                                label="Location"
                                name="location"
                                value={formData.location || ""}
                                onChange={handleChange}
                            />

                        </Grid>

                        <Grid item xs={12} md={6}>

                            <TextField
                                fullWidth
                                label="Founded Year"
                                name="foundedYear"
                                value={formData.foundedYear || ""}
                                onChange={handleChange}
                            />

                        </Grid>

                        <Grid item xs={12}>

                            <TextField
                                fullWidth
                                multiline
                                rows={5}
                                label="Company Description"
                                name="description"
                                value={formData.description || ""}
                                onChange={handleChange}
                            />

                        </Grid>

                        <Grid item xs={12}>

                            <Typography
                                variant="h6"
                                fontWeight={600}
                            >

                                Social Links

                            </Typography>

                        </Grid>

                        <Grid item xs={12} md={4}>

                            <TextField
                                fullWidth
                                label="LinkedIn"
                                name="linkedin"
                                value={formData.socialLinks?.linkedin || ""}
                                onChange={handleSocialChange}
                            />

                        </Grid>

                        <Grid item xs={12} md={4}>

                            <TextField
                                fullWidth
                                label="Twitter"
                                name="twitter"
                                value={formData.socialLinks?.twitter || ""}
                                onChange={handleSocialChange}
                            />

                        </Grid>

                        <Grid item xs={12} md={4}>

                            <TextField
                                fullWidth
                                label="Facebook"
                                name="facebook"
                                value={formData.socialLinks?.facebook || ""}
                                onChange={handleSocialChange}
                            />

                        </Grid>

                    </Grid>

                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ mt: 4 }}
                        disabled={saving}
                    >

                        {saving
                            ? <CircularProgress color="inherit" size={22} />
                            : "Save Changes"}

                    </Button>

                </Box>

            </Paper>

        </Box>

    );

}

export default CompanyProfile;