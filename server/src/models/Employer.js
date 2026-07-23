const mongoose = require("mongoose");

const employerSchema = new mongoose.Schema(

    {

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },

        companyName: {
            type: String,
            required: true,
            trim: true
        },

        companyEmail: {
            type: String,
            required: true,
            lowercase: true,
            trim: true
        },

        companyLogo: {
            type: String,
            default: ""
        },

        industry: {
            type: String,
            default: ""
        },

        companySize: {
            type: String,
            enum: [
                "1-10",
                "11-50",
                "51-200",
                "201-500",
                "500+"
            ],
            default: "1-10"
        },

        website: {
            type: String,
            default: ""
        },

        location: {
            type: String,
            default: ""
        },

        description: {
            type: String,
            default: ""
        },

        foundedYear: {
            type: Number
        },

        socialLinks: {

            linkedin: {
                type: String,
                default: ""
            },

            twitter: {
                type: String,
                default: ""
            },

            github: {
                type: String,
                default: ""
            }

        },

        isVerified: {
            type: Boolean,
            default: false
        }

    },

    {
        timestamps: true
    }

);

module.exports = mongoose.model("Employer", employerSchema);