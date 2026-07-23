const User = require("../models/User");
const Resume = require("../models/Resume");

const getProfile = async (req, res) => {

    try {

        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const resume = await Resume.findOne({
            user: req.user.id
        });

        res.json({

            name: user.name,
            email: user.email,
            role: user.role,
            experienceYears: user.experienceYears,
            joined: user.createdAt,

            resumeUploaded: resume ? true : false,

            atsScore: resume?.atsScore || 0,

            skills: resume?.skills?.length || 0,

            projects: resume?.projects?.length || 0,

            education: resume?.education?.length || 0,

            certifications:
                resume?.certifications?.length || 0

        });

    }

    catch (error) {

        console.error("PROFILE ERROR:", error);

        res.status(500).json({

            message: "Server Error"

        });

    }

};

module.exports = {
    getProfile
};