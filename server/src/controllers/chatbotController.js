const Resume = require("../models/Resume");
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const MAX_QUESTIONS = 10;

const startInterview = async (req, res) => {

    try {

        const { jobDescription } = req.body;

        if (!jobDescription) {

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

The candidate's resume is:

${resume.extractedText}

The target job description is:

${jobDescription}

Start a professional interview.

Rules:

1. Welcome the candidate.
2. Ask ONLY ONE interview question.
3. Start with "Tell me about yourself."
4. Return JSON ONLY.

JSON format:

{
    "question":"...",
    "questionNumber":1,
    "totalQuestions":${MAX_QUESTIONS}
}

`;

        const response = await ai.models.generateContent({

            model: "gemini-flash-latest",

            contents: prompt

        });

        let text = response.text;

        text = text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        const result = JSON.parse(text);

        return res.json({

            success: true,

            finished: false,

            ...result

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Unable to start interview."

        });

    }

};

const continueInterview = async (req, res) => {

    try {

        const {

            jobDescription,

            history,

            answer,

            questionNumber

        } = req.body;

        if (!jobDescription || !answer) {

            return res.status(400).json({

                success: false,

                message: "Missing required fields."

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

        const interviewHistory = (history || [])
            .map((item) => {

                return `

Question:
${item.question}

Answer:
${item.answer}

`;

            })
            .join("\n");

        if (questionNumber >= MAX_QUESTIONS) {

            const finalPrompt = `

You are a senior hiring manager.

Resume:

${resume.extractedText}

Job Description:

${jobDescription}

Interview Conversation:

${interviewHistory}

Final Answer:

${answer}

Evaluate the complete interview.

Return ONLY JSON.

{
    "overallScore":90,
    "communication":92,
    "technical":88,
    "confidence":91,
    "problemSolving":89,
    "strengths":[
        "...",
        "...",
        "..."
    ],
    "improvements":[
        "...",
        "...",
        "..."
    ],
    "feedback":"...",
    "recommendation":"..."
}

`;

            const response = await ai.models.generateContent({

                model: "gemini-flash-latest",

                contents: finalPrompt

            });

            let text = response.text;

            text = text
                .replace(/```json/g, "")
                .replace(/```/g, "")
                .trim();

            const report = JSON.parse(text);

            return res.json({

                success: true,

                finished: true,

                report

            });

        }

        const prompt = `

You are conducting a professional interview.

Candidate Resume:

${resume.extractedText}

Job Description:

${jobDescription}

Previous Conversation:

${interviewHistory}

Latest Candidate Answer:

${answer}

Evaluate ONLY the latest answer.

Then ask ONE next interview question.

Return ONLY JSON.

{
    "feedback":"...",
    "score":8,
    "strengths":[
        "...",
        "..."
    ],
    "improvements":[
        "...",
        "..."
    ],
    "nextQuestion":"...",
    "questionNumber":${questionNumber + 1},
    "totalQuestions":${MAX_QUESTIONS}
}

`;
        const response = await ai.models.generateContent({

            model: "gemini-flash-latest",

            contents: prompt

        });

        let text = response.text;

        text = text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        const result = JSON.parse(text);

        return res.json({

            success: true,

            finished: false,

            feedback: result.feedback,

            score: result.score,

            strengths: result.strengths,

            improvements: result.improvements,

            question: result.nextQuestion,

            questionNumber: result.questionNumber,

            totalQuestions: result.totalQuestions

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Interview failed."

        });

    }

};

module.exports = {

    startInterview,

    continueInterview

};