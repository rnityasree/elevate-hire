const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const Employer = require("../models/Employer");

const registerEmployer = async (req, res) => {

    try {

        const {
            name,
            email,
            phone,
            password,
            companyName,
            companyEmail,
            industry,
            companySize,
            website,
            location,
            description,
            foundedYear
        } = req.body;

        const existingUser = await User.findOne({
            email
        });

        if (existingUser) {

            return res.status(400).json({
                message: "Email already registered."
            });

        }

        const hashedPassword = await bcrypt.hash(
            password,
            10
        );

        const user = await User.create({

            name,
            email,
            phone,
            password: hashedPassword,
            role: "employer"

        });

        await Employer.create({

            user: user._id,

            companyName,

            companyEmail,

            industry,

            companySize,

            website,

            location,

            description,

            foundedYear

        });

        res.status(201).json({

            message: "Employer registered successfully."

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            message: "Employer registration failed."

        });

    }

};


const loginEmployer = async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;

        const user = await User.findOne({

            email,
            role: "employer"

        });

        if (!user) {

            return res.status(401).json({

                message: "Invalid credentials."

            });

        }

        const isMatch = await bcrypt.compare(

            password,
            user.password

        );

        if (!isMatch) {

            return res.status(401).json({

                message: "Invalid credentials."

            });

        }

        const employer = await Employer.findOne({

            user: user._id

        });

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

            token,

            user: {

                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role

            },

            employer

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            message: "Employer login failed."

        });

    }

};

module.exports = {

    registerEmployer,
    loginEmployer

};