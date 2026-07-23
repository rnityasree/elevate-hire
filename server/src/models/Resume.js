const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        fileName: {
            type: String,
            required: true
        },

        filePath: {
            type: String,
            required: true
        },

        extractedText: {
            type: String,
            default: ""
        },

        skills: [
            {
                type: String
            }
        ],

        projects: [
            {
                type: String
            }
        ],

        education: [
            {
                type: String
            }
        ],

        certifications: [
            {
                type: String
            }
        ],

        experience: [
            {
                type: String
            }
        ],

        atsScore: {
            type: Number,
            default: 0
        },

        analysisCompleted: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Resume", resumeSchema);