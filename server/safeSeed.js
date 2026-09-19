const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

async function runSafeSeed() {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error("MONGO_URI is missing in server/.env");
    }

    console.log("Connecting to MongoDB Atlas...");
    await mongoose.connect(mongoUri);
    console.log("Connected successfully.\n");

    const db = mongoose.connection.db;

    // 1. Ensure Recruiter Exists (Upsert - Won't duplicate or overwrite if already present)
    const recruiterEmail = "recruiter@elevatehire.ai";
    let recruiter = await db.collection("users").findOne({ email: recruiterEmail });

    if (!recruiter) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash("Password@123", salt);
      const result = await db.collection("users").insertOne({
        name: "ElevateHire HR",
        email: recruiterEmail,
        password: hashedPassword,
        role: "employer",
        phone: "+919900112233",
        createdAt: new Date(),
        updatedAt: new Date()
      });
      recruiter = { _id: result.insertedId };
      console.log(" Created demo recruiter account (recruiter@elevatehire.ai)");
    } else {
      console.log(" Recruiter account already exists. Kept intact.");
    }

    // 2. Add realistic active jobs with <=48h urgent triggers
    const now = new Date();
    const urgentDate = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24h away (triggers urgent alert)
    const laterDate = new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000); // 5 days away

    const sampleJobs = [
      {
        title: "Senior Full Stack Engineer",
        company: "ElevateHire AI",
        location: "Bengaluru, India (Hybrid)",
        employmentType: "Full-time",
        salary: "₹8,50,000 - ₹12,00,000 / year",
        experienceLevel: "Entry-level",
        skills: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "JavaScript"],
        interviewDate: "Tomorrow at 10:30 AM",
        interviewTimestamp: urgentDate.toISOString(),
        applyLink: "/jobs",
        description: "Urgent recruitment drive for full-stack developers. Rapid 48h technical screening.",
        isActive: true,
        employer: recruiter._id,
        createdBy: recruiter._id,
        updatedAt: new Date()
      },
      {
        title: "Frontend UI Specialist",
        company: "PixelCraft Studio",
        location: "Remote",
        employmentType: "Internship",
        salary: "₹35,000 / month",
        experienceLevel: "Entry-level",
        skills: ["React", "JavaScript", "Tailwind CSS", "HTML5", "CSS3"],
        interviewDate: "Tomorrow at 3:00 PM",
        interviewTimestamp: urgentDate.toISOString(),
        applyLink: "/jobs",
        description: "Fast-track technical round for responsive UI components and interactive layouts.",
        isActive: true,
        employer: recruiter._id,
        createdBy: recruiter._id,
        updatedAt: new Date()
      },
      {
        title: "Backend Platform Engineer",
        company: "CloudScale Systems",
        location: "Bengaluru, India",
        employmentType: "Full-time",
        salary: "₹9,00,000 - ₹14,00,000 / year",
        experienceLevel: "Mid-level",
        skills: ["Node.js", "Express", "MongoDB", "Redis", "Docker"],
        interviewDate: "Next Week Wednesday",
        interviewTimestamp: laterDate.toISOString(),
        applyLink: "/jobs",
        description: "Scale distributed microservices, REST APIs, and database query throughput.",
        isActive: true,
        employer: recruiter._id,
        createdBy: recruiter._id,
        updatedAt: new Date()
      }
    ];

    console.log("\nSeeding Job Postings without overwriting existing data...");
    for (const job of sampleJobs) {
      await db.collection("jobs").updateOne(
        { title: job.title, company: job.company },
        { 
          $set: job,$setOnInsert: { createdAt: new Date() }
        },
        { upsert: true }
      );
      console.log(` Job synced: "${job.title}" at ${job.company}`);
    }

    console.log("\n Safe seeding complete! Existing user accounts and resumes were preserved.");
    process.exit(0);
  } catch (error) {
    console.error("\n Seeding failed:", error);
    process.exit(1);
  }
}

runSafeSeed();