const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const User = require("../models/User");

const { sendEmail } = require("../services/emailService");
const { welcomeTemplate } = require("../utils/emailTemplates");
const {
    resetPasswordTemplate
} = require("../utils/resetPasswordTemplate");


// =========================
// Register
// =========================

const registerUser = async (req, res) => {

    try {

        const {
            name,
            email,
            phone,
            password,
            experienceYears,
            gender,
            disabilityStatus
        } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email and password are required"
            });
        }

        const existingUser = await User.findOne({
            email
        });

        if (existingUser) {
            return res.status(400).json({
                message: "User with this email already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            phone,
            password: hashedPassword,
            experienceYears: experienceYears || 0,
            gender,
            disabilityStatus
        });

        try {

            await sendEmail({
                to: user.email,
                subject: "Welcome to ElevateHire 🚀",
                html: welcomeTemplate(user.name)
            });

        } catch (err) {

            console.log("Welcome Email Error:", err.message);

        }

        res.status(201).json({

            message: "User registered successfully",

            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server error during registration"
        });

    }

};


// =========================
// Login
// =========================

const loginUser = async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;

        if (!email || !password) {

            return res.status(400).json({
                message: "Email and password are required"
            });

        }

        const user = await User.findOne({
            email
        });

        if (!user) {

            return res.status(401).json({
                message: "Invalid email or password"
            });

        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {

            return res.status(401).json({
                message: "Invalid email or password"
            });

        }

        const token = jwt.sign(

            {
                id: user._id,
                role: user.role
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "7d"
            }

        );

        res.status(200).json({

            message: "Login successful",

            token,

            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server error during login"
        });

    }

};


// =========================
// Forgot Password
// =========================

const forgotPassword = async (req, res) => {

    try {

        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        const resetToken = crypto
            .randomBytes(32)
            .toString("hex");

        user.resetPasswordToken = resetToken;

        user.resetPasswordExpires =
            Date.now() + 15 * 60 * 1000;

        await user.save();

        await sendEmail({

            to: user.email,

            subject: "Reset your ElevateHire Password",

            html: resetPasswordTemplate(
                user.name,
                resetToken
            )

        });

        res.status(200).json({

            message:
                "Password reset email sent successfully."

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            message:
                "Unable to send reset email."

        });

    }

};
// =========================
// Reset Password
// =========================

const resetPassword = async (req, res) => {

    try {

        const { token } = req.params;

        const { password } = req.body;

        if (!password) {

            return res.status(400).json({
                message: "Password is required"
            });

        }

        const user = await User.findOne({

            resetPasswordToken: token,

            resetPasswordExpires: {
                $gt: Date.now()
            }

        });

        if (!user) {

            return res.status(400).json({

                message: "Reset link is invalid or has expired."

            });

        }

        const hashedPassword = await bcrypt.hash(
            password,
            10
        );

        user.password = hashedPassword;

        user.resetPasswordToken = null;

        user.resetPasswordExpires = null;

        await user.save();

        res.status(200).json({

            message: "Password reset successful."

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            message: "Unable to reset password."

        });

    }

};


// =========================
// Exports
// =========================

module.exports = {

    registerUser,

    loginUser,

    forgotPassword,

    resetPassword

};