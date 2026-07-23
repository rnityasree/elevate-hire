const dotenv = require("dotenv");
const mongoose = require("mongoose");

const connectDB = require("../config/db");
const Job = require("../models/Job");
const jobs = require("../seed/jobs");

dotenv.config();

const seedJobs = async () => {
    try {
        await connectDB();

        await Job.deleteMany();

        await Job.insertMany(jobs);

        console.log("Jobs seeded successfully.");

        mongoose.connection.close();
    } catch (error) {
        console.error(error);

        mongoose.connection.close();

        process.exit(1);
    }
};

seedJobs();