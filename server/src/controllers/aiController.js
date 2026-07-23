const Resume = require("../models/Resume");
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const improveResume = async (req, res) => {
    try {
        const resume = await Resume.findOne({
            user: req.user.id,
        });

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "Resume not found.",
            });
        }

        const resumeText = resume.extractedText;

        if (!resumeText || resumeText.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Resume text is empty.",
            });
        }

        const prompt = `
You are an expert Resume Reviewer, Senior Technical Recruiter, ATS Optimization Specialist and Career Coach.

Analyze the following resume.

Return ONLY valid JSON.

{
  "resumeScore":90,
  "professionalSummary":"...",
  "improvedExperience":["...","...","..."],
  "missingSkills":["...","...","..."],
  "atsSuggestions":["...","...","..."],
  "recruiterFeedback":["...","...","..."],
  "keywords":["...","...","..."]
}

Resume:

${resumeText}
`;

        const response = await ai.models.generateContent({
            model: "gemini-flash-latest",
            contents: prompt,
        });

        let text = response.text;

        text = text.replace(/```json/g, "");
        text = text.replace(/```/g, "");
        text = text.trim();

        const aiResponse = JSON.parse(text);

        res.json({
            success: true,
            resumeLength: resumeText.length,
            atsScore: resume.atsScore,
            resumeScore: aiResponse.resumeScore,
            professionalSummary: aiResponse.professionalSummary,
            improvedExperience: aiResponse.improvedExperience,
            missingSkills: aiResponse.missingSkills,
            atsSuggestions: aiResponse.atsSuggestions,
            recruiterFeedback: aiResponse.recruiterFeedback,
            keywords: aiResponse.keywords,
        });
    } catch (err) {
        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

const jobMatch = async (req, res) => {
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
You are a Senior Technical Recruiter.

Compare the resume with the job description.

Return ONLY valid JSON.

{
  "matchScore":85,
  "strengths":[
    "...",
    "...",
    "..."
  ],
  "missingSkills":[
    "...",
    "...",
    "..."
  ],
  "recommendations":[
    "...",
    "...",
    "..."
  ],
  "hiringProbability":"High"
}

Resume:

${resume.extractedText}

Job Description:

${jobDescription}
`;

        const response = await ai.models.generateContent({
            model: "gemini-flash-latest",
            contents: prompt,
        });

        let text = response.text;

        text = text.replace(/```json/g, "");
        text = text.replace(/```/g, "");
        text = text.trim();

        const result = JSON.parse(text);

        res.json({
            success: true,
            matchScore: result.matchScore,
            strengths: result.strengths,
            missingSkills: result.missingSkills,
            recommendations: result.recommendations,
            hiringProbability: result.hiringProbability,
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
    improveResume,
    jobMatch,
};