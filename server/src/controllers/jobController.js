const Resume = require("../models/Resume");
const Job = require("../models/Job");

const getRecommendedJobs = async (req, res) => {
    try {
        const resume = await Resume.findOne({
            user: req.user.id
        });

        if (!resume) {
            return res.status(404).json({
                message: "Resume not found"
            });
        }

        const userSkills = resume.skills.map(skill =>
            skill.trim().toLowerCase()
        );

        const jobs = await Job.find({
            isActive: true
        });

        const recommendations = jobs.map(job => {

            const jobSkills = job.skills.map(skill =>
                skill.trim().toLowerCase()
            );

            const matchedSkills = job.skills.filter(skill =>
                userSkills.includes(skill.toLowerCase())
            );

            const missingSkills = job.skills.filter(skill =>
                !userSkills.includes(skill.toLowerCase())
            );

            const matchPercentage =
                job.skills.length === 0
                    ? 0
                    : Math.round(
                          (matchedSkills.length / job.skills.length) * 100
                      );

            return {
                _id: job._id,
                title: job.title,
                company: job.company,
                location: job.location,
                employmentType: job.employmentType,
                salary: job.salary,
                experienceLevel: job.experienceLevel,
                applyLink: job.applyLink,
                description: job.description,
                source: job.source,
                requiredSkills: job.skills,
                matchedSkills,
                missingSkills,
                matchPercentage
            };
        });

        recommendations.sort(
            (a, b) => b.matchPercentage - a.matchPercentage
        );

        res.json(recommendations);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    getRecommendedJobs
};