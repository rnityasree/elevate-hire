const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        // Basic Information
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        phone: {
            type: String,
            trim: true
        },

        password: {
            type: String,
            required: true
        },

        // User Role
        role: {
            type: String,
            enum: ["student", "employer", "mentor", "admin"],
            default: "student"
        },

        // Career Information
        experienceYears: {
            type: Number,
            default: 0,
            min: 0
        },

        // Optional Inclusion Information
        gender: {
            type: String,
            enum: ["female", "male", "non_binary", "prefer_not_to_say"],
            default: "prefer_not_to_say"
        },

        disabilityStatus: {
            type: String,
            enum: ["yes", "no", "prefer_not_to_say"],
            default: "prefer_not_to_say"
        },

        // Skills
        skills: [
            {
                name: String,
                level: {
                    type: String,
                    enum: ["beginner", "intermediate", "advanced"]
                }
            }
        ],

        // Education
        education: [
            {
                degree: String,
                institution: String,
                fieldOfStudy: String,
                graduationYear: Number
            }
        ],

        // Resume
        resume: {
            fileName: String,
            fileUrl: String,
            uploadedAt: Date
        },

        // Video Resume
        videoResume: {
            fileUrl: String,
            uploadedAt: Date
        },

        // Mentorship
        isAvailableAsMentor: {
            type: Boolean,
            default: false
        },

        // Password Reset
        resetPasswordToken: {
            type: String,
            default: null
        },

        resetPasswordExpires: {
            type: Date,
            default: null
        }
    },

    {
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;