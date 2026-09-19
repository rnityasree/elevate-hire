const Resume = require("../models/Resume");
const Job = require("../models/Job");
const User = require("../models/User");
const { sendJobEmailNotification, sendJobSMSNotification } = require("../utils/notificationService");

/**
 * @desc    Get recommended jobs for the logged-in student based on resume skills
 * @route   GET /api/jobs
 * @access  Private (Student)
 */
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

/**
 * @desc    Create a new job post and AUTOMATICALLY alert matching candidates
 * @route   POST /api/jobs
 * @access  Private (Employer)
 */
const createJob = async (req, res) => {
    try {
        const {
            title,
            company,
            location,
            employmentType,
            salary,
            experienceLevel,
            applyLink,
            description,
            skills,
            interviewDate,
            interviewTimestamp
        } = req.body;

        // 1. Save new job in MongoDB
        const newJob = new Job({
            title,
            company,
            location,
            employmentType,
            salary,
            experienceLevel,
            applyLink,
            description,
            skills: skills || [],
            interviewDate,
            interviewTimestamp,
            isActive: true,
            createdBy: req.user.id
        });

        const savedJob = await newJob.save();

        // =========================================================
        // 🚀 AUTOMATIC BACKGROUND NOTIFICATION ENGINE
        // =========================================================
        
        const jobSkillsLower = (skills || []).map(s => s.trim().toLowerCase());

        // Calculate if interview is within 48-Hour Urgent Window
        let isUrgent = false;
        if (interviewTimestamp) {
            const hoursRemaining = (new Date(interviewTimestamp) - new Date()) / (1000 * 60 * 60);
            if (hoursRemaining > 0 && hoursRemaining <= 48) {
                isUrgent = true;
            }
        }

        const jobDetails = {
            title: savedJob.title,
            company: savedJob.company,
            skills: savedJob.skills,
            interviewDate: savedJob.interviewDate,
            isUrgent
        };

        // Fetch all resumes populated with student user details
        const resumes = await Resume.find().populate("user", "name email phone");

        // Asynchronously notify candidates without slowing down the HTTP response
        resumes.forEach(async (resume) => {
            if (!resume.user || !resume.user.email) return;

            const studentSkillsLower = (resume.skills || []).map(s => s.trim().toLowerCase());
            
            // Check if student has at least 1 skill matching the job
            const isMatch = studentSkillsLower.some(skill => jobSkillsLower.includes(skill));

            if (isMatch) {
                // 1. Always send Email for every skill match
                await sendJobEmailNotification(resume.user.email, resume.user.name || "Candidate", jobDetails);

                // 2. Send WhatsApp/SMS ONLY if interview falls within 48 hours
                if (isUrgent && resume.user.phone) {
                    await sendJobSMSNotification(resume.user.phone, resume.user.name || "Candidate", jobDetails);
                }
            }
        });

        // =========================================================

        return res.status(201).json({
            success: true,
            message: "Job created successfully! Matching candidates are being notified automatically.",
            job: savedJob
        });

    } catch (error) {
        console.error("Error creating job:", error);
        return res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    getRecommendedJobs,
    createJob
};