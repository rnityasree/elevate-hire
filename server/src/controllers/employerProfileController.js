const Employer = require("../models/Employer");

// ===============================
// Get Company Profile
// ===============================
const getCompanyProfile = async (req, res) => {
    try {
        console.log("=================================");
        console.log("Logged in User ID:", req.user.id);

        const employers = await Employer.find();

        console.log("All Employer Records:");

        employers.forEach((emp) => {
            console.log({
                employerId: emp._id.toString(),
                user: emp.user ? emp.user.toString() : null,
                companyName: emp.companyName,
            });
        });

        const employer = await Employer.findOne({
            user: req.user.id,
        });

        console.log("Employer Found:", employer);
        console.log("=================================");

        if (!employer) {
            return res.status(404).json({
                success: false,
                message: "Employer profile not found",
            });
        }

        res.status(200).json({
            success: true,
            employer,
        });
    } catch (error) {
        console.error("Get Company Profile Error:", error);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

// ===============================
// Update Company Profile
// ===============================
const updateCompanyProfile = async (req, res) => {
    try {
        const employer = await Employer.findOne({
            user: req.user.id,
        });

        if (!employer) {
            return res.status(404).json({
                success: false,
                message: "Employer profile not found",
            });
        }

        const {
            companyName,
            companyEmail,
            companyLogo,
            industry,
            companySize,
            website,
            location,
            description,
            foundedYear,
            socialLinks,
        } = req.body;

        employer.companyName = companyName || employer.companyName;
        employer.companyEmail = companyEmail || employer.companyEmail;
        employer.companyLogo = companyLogo || employer.companyLogo;
        employer.industry = industry || employer.industry;
        employer.companySize = companySize || employer.companySize;
        employer.website = website || employer.website;
        employer.location = location || employer.location;
        employer.description = description || employer.description;
        employer.foundedYear = foundedYear || employer.foundedYear;
        employer.socialLinks = socialLinks || employer.socialLinks;

        const updatedEmployer = await employer.save();

        res.status(200).json({
            success: true,
            message: "Company profile updated successfully",
            employer: updatedEmployer,
        });
    } catch (error) {
        console.error("Update Company Profile Error:", error);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

module.exports = {
    getCompanyProfile,
    updateCompanyProfile,
};