const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
    {
        employer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employer",
            required: true
        },

        // NEW: Opportunity Type
        opportunityType: {
            type: String,
            enum: [
                "Job",
                "Internship",
                "Freelancing"
            ],
            default: "Job"
        },

        title: {
            type: String,
            required: true,
            trim: true
        },

        company: {
            type: String,
            required: true,
            trim: true
        },

        location: {
            type: String,
            required: true,
            trim: true
        },

        employmentType: {
            type: String,
            enum: [
                "Full Time",
                "Part Time",
                "Internship",
                "Contract",
                "Remote",
                "Hybrid"
            ],
            default: "Full Time"
        },

        description: {
            type: String,
            default: ""
        },

        requirements: {
            type: String,
            default: ""
        },

        responsibilities: {
            type: String,
            default: ""
        },

        skills: [
            {
                type: String,
                trim: true
            }
        ],

        experienceLevel: {
            type: String,
            enum: [
                "Entry Level",
                "Mid Level",
                "Senior Level"
            ],
            default: "Entry Level"
        },

        salary: {
            type: String,
            default: "Not Disclosed"
        },

        vacancies: {
            type: Number,
            default: 1
        },

        applicationDeadline: {
            type: Date
        },

        applyLink: {
            type: String,
            default: ""
        },

        source: {
            type: String,
            default: "ElevateHire"
        },

        status: {
            type: String,
            enum: [
                "Draft",
                "Open",
                "Closed"
            ],
            default: "Open"
        },

        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Job", jobSchema);