const Resume = require("../models/Resume");
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const generateCoverLetter = async (req, res) => {
    try {
        const { jobDescription } = req.body;

        if (!jobDescription || jobDescription.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Job description is required.",
            });
        }

        const resume = await Resume.findOne({
            user: req.user.id,
        });

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "Resume not found.",
            });
        }

        const prompt = `
You are an expert Career Coach and Technical Recruiter.

Using the resume and job description below, write a professional cover letter.

Requirements:

- Professional tone
- Around 350–450 words
- Tailored specifically to the job
- Highlight matching skills
- Mention measurable achievements when possible
- End with a strong closing paragraph

Return ONLY the cover letter text.

Resume:

${resume.extractedText}

Job Description:

${jobDescription}
`;

        const response = await ai.models.generateContent({
            model: "gemini-flash-latest",
            contents: prompt,
        });

        res.json({
            success: true,
            coverLetter: response.text.trim(),
        });
    } catch (err) {
        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

module.exports = {
    generateCoverLetter,
};