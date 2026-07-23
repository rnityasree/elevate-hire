const Employer = require("../models/Employer");
const Job = require("../models/Job");

// =========================================
// Create Opportunity
// =========================================
const createJob = async (req, res) => {

    try {

        const employer = await Employer.findOne({
            user: req.user.id
        });

        if (!employer) {

            return res.status(404).json({
                success: false,
                message: "Employer profile not found."
            });

        }

        const {
            opportunityType = "Job",
            title,
            location,
            employmentType,
            description,
            requirements,
            responsibilities,
            skills,
            experienceLevel,
            salary,
            vacancies,
            applicationDeadline,
            applyLink,
            source,
            status,
            isActive
        } = req.body;

        const job = await Job.create({

            employer: employer._id,

            company: employer.companyName,

            opportunityType,

            title,
            location,
            employmentType,
            description,
            requirements,
            responsibilities,
            skills,
            experienceLevel,
            salary,
            vacancies,
            applicationDeadline,
            applyLink,
            source,
            status,
            isActive

        });

        res.status(201).json({

            success: true,

            message: "Opportunity created successfully.",

            job

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// =========================================
// Get Employer Opportunities
// =========================================
const getEmployerJobs = async (req, res) => {

    try {

        const employer = await Employer.findOne({
            user: req.user.id
        });

        if (!employer) {

            return res.status(404).json({
                success: false,
                message: "Employer profile not found."
            });

        }

        const jobs = await Job.find({

            employer: employer._id

        }).sort({

            createdAt: -1

        });

        res.json({

            success: true,

            count: jobs.length,

            jobs

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// =========================================
// Get Single Opportunity
// =========================================
const getJobById = async (req, res) => {

    try {

        const employer = await Employer.findOne({
            user: req.user.id
        });

        if (!employer) {

            return res.status(404).json({
                success: false,
                message: "Employer profile not found."
            });

        }

        const job = await Job.findOne({

            _id: req.params.id,

            employer: employer._id

        });

        if (!job) {

            return res.status(404).json({

                success: false,

                message: "Opportunity not found."

            });

        }

        res.json({

            success: true,

            job

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// =========================================
// Update Opportunity
// =========================================
const updateJob = async (req, res) => {

    try {

        const employer = await Employer.findOne({
            user: req.user.id
        });

        if (!employer) {

            return res.status(404).json({
                success: false,
                message: "Employer profile not found."
            });

        }

        const job = await Job.findOneAndUpdate(

            {

                _id: req.params.id,

                employer: employer._id

            },

            req.body,

            {

                new: true,
                runValidators: true

            }

        );

        if (!job) {

            return res.status(404).json({

                success: false,

                message: "Opportunity not found."

            });

        }

        res.json({

            success: true,

            message: "Opportunity updated successfully.",

            job

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// =========================================
// Delete Opportunity
// =========================================
const deleteJob = async (req, res) => {

    try {

        const employer = await Employer.findOne({
            user: req.user.id
        });

        if (!employer) {

            return res.status(404).json({
                success: false,
                message: "Employer profile not found."
            });

        }

        const job = await Job.findOneAndDelete({

            _id: req.params.id,

            employer: employer._id

        });

        if (!job) {

            return res.status(404).json({

                success: false,

                message: "Opportunity not found."

            });

        }

        res.json({

            success: true,

            message: "Opportunity deleted successfully."

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

module.exports = {

    createJob,

    getEmployerJobs,

    getJobById,

    updateJob,

    deleteJob

};