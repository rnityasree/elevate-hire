const Resume = require("../models/Resume");

const getDashboard = async (req, res) => {

    try {

        const resume = await Resume.findOne({
            user: req.user.id
        });

        if (!resume) {

            return res.json({
                resumeStatus: "Not Uploaded",
                atsScore: 0,
                skills: 0,
                projects: 0,
                education: 0,
                certifications: 0
            });

        }

        res.json({

            resumeStatus: resume.analysisCompleted
                ? "Uploaded"
                : "Pending",

            atsScore: resume.atsScore,

            skills: resume.skills.length,

            projects: resume.projects.length,

            education: resume.education.length,

            certifications: resume.certifications.length

        });

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    getDashboard
};