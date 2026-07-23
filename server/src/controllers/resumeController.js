const fs = require("fs");
const { PDFParse } = require("pdf-parse");
const Resume = require("../models/Resume");

const uploadResume = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({
                message: "Please upload a PDF resume"
            });
        }

        const pdfBuffer = fs.readFileSync(req.file.path);

        const parser = new PDFParse({
            data: pdfBuffer
        });

        const pdfData = await parser.getText();

        await parser.destroy();

        const text = pdfData.text;

        // ------------------------
        // Skills
        // ------------------------

        const skillKeywords = [
            "Java",
            "Python",
            "C",
            "C++",
            "JavaScript",
            "React",
            "Node.js",
            "NodeJS",
            "Express",
            "MongoDB",
            "MySQL",
            "SQL",
            "HTML",
            "CSS",
            "Git",
            "GitHub",
            "REST API"
        ];

        const skills = skillKeywords.filter(skill =>
            text.toLowerCase().includes(skill.toLowerCase())
        );

        // ------------------------
        // Projects
        // ------------------------

        const projects = [];

        if (text.includes("DigiOnWheels"))
            projects.push("DigiOnWheels");

        if (text.includes("Civic Lens"))
            projects.push("Civic Lens");

        // ------------------------
        // Education
        // ------------------------

        const education = [];

        if (text.includes("Bachelor"))
            education.push("Bachelor");

        if (text.includes("XII"))
            education.push("PUC");

        if (text.includes("Xth"))
            education.push("SSLC");

        // ------------------------
        // Certifications
        // ------------------------

        const certifications = [];

        const certificationKeywords = [
            "NPTEL",
            "Cloud Computing",
            "Cyber Security",
            "Ethical Hacking",
            "Programming In Java",
            "IoT",
            "AR/VR",
            "MAD"
        ];

        certificationKeywords.forEach(cert => {

            if (
                text.toLowerCase().includes(cert.toLowerCase())
            ) {
                certifications.push(cert);
            }

        });

        // ------------------------
        // Experience
        // ------------------------

        const experience = [];

        if (text.toLowerCase().includes("intern"))
            experience.push("Internship");

        // ------------------------
        // ATS Score
        // ------------------------

        let atsScore = 40;

        atsScore += skills.length * 3;
        atsScore += projects.length * 8;
        atsScore += certifications.length * 2;
        atsScore += education.length * 5;

        if (atsScore > 100)
            atsScore = 100;

        const resumeData = {

            user: req.user.id,

            fileName: req.file.filename,

            filePath: req.file.path,

            extractedText: text,

            skills,

            projects,

            education,

            certifications,

            experience,

            atsScore,

            analysisCompleted: true

        };

        const existingResume = await Resume.findOne({
            user: req.user.id
        });

        let resume;

        if (existingResume) {

            if (
                fs.existsSync(existingResume.filePath)
            ) {
                fs.unlinkSync(existingResume.filePath);
            }

            Object.assign(existingResume, resumeData);

            resume = await existingResume.save();

        } else {

            resume = await Resume.create(resumeData);

        }

        res.status(201).json({

            message: "Resume uploaded successfully",

            resume

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            message: "Resume upload failed",

            error: error.message

        });

    }
};

module.exports = {
    uploadResume
};