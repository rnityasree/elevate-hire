const Resume = require("../models/Resume");

const getResumeAnalysis = async (req, res) => {
    try {

        const resume = await Resume.findOne({
            user: req.user.id
        });

        if (!resume) {
            return res.status(404).json({
                message: "Resume not found"
            });
        }

        res.json({

            atsScore: resume.atsScore,

            skills: resume.skills,

            projects: resume.projects,

            education: resume.education,

            certifications: resume.certifications,

            experience: resume.experience,

            analysisCompleted: resume.analysisCompleted

        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
};

module.exports = {
    getResumeAnalysis
};