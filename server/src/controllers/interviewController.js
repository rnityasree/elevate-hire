const Resume = require("../models/Resume");
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const generateInterviewQuestions = async (req, res) => {

    try {

        const { jobDescription } = req.body;

        if (!jobDescription || !jobDescription.trim()) {

            return res.status(400).json({
                success: false,
                message: "Job description is required."
            });

        }

        const resume = await Resume.findOne({
            user: req.user.id
        });

        if (!resume) {

            return res.status(404).json({
                success: false,
                message: "Resume not found."
            });

        }

        const prompt = `
You are an expert technical interviewer.

Using the resume and job description below, generate interview preparation questions.

Return ONLY valid JSON in this exact format:

{
  "technical":[
    {
      "question":"",
      "answer":"",
      "difficulty":"Easy"
    }
  ],
  "behavioral":[
    {
      "question":"",
      "answer":""
    }
  ],
  "hr":[
    {
      "question":"",
      "answer":""
    }
  ]
}

Generate:

- 5 Technical Questions
- 5 Behavioral Questions
- 5 HR Questions

Resume:

${resume.extractedText}

Job Description:

${jobDescription}
`;

        const response = await ai.models.generateContent({
            model: "gemini-flash-latest",
            contents: prompt,
        });

        let text = response.text.trim();

        text = text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        const result = JSON.parse(text);

        res.json({
            success: true,
            ...result
        });

    }

    catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

module.exports = {
    generateInterviewQuestions,
};