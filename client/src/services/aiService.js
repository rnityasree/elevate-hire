import API from "./api";

// ======================================
// Resume Improvement
// ======================================

export const getResumeImprovement = async () => {
    const { data } = await API.get("/ai/resume-improvement");
    return data;
};

// ======================================
// Job Match
// ======================================

export const getJobMatch = async (jobDescription) => {
    const { data } = await API.post("/ai/job-match", {
        jobDescription
    });

    return data;
};

// ======================================
// Cover Letter
// ======================================

export const generateCoverLetter = async (jobDescription) => {
    const { data } = await API.post("/ai/cover-letter", {
        jobDescription
    });

    return data;
};

// ======================================
// Interview Questions
// ======================================

export const generateInterviewQuestions = async (jobDescription) => {
    const { data } = await API.post("/ai/interview", {
        jobDescription
    });

    return data;
};

// ======================================
// Mock Interview
// ======================================

export const startMockInterview = async (jobDescription) => {

    const { data } = await API.post(
        "/ai/mock-interview/start",
        {
            jobDescription
        }
    );

    return data;

};

export const continueMockInterview = async ({
    jobDescription,
    history,
    answer,
    questionNumber
}) => {

    const { data } = await API.post(
        "/ai/mock-interview/continue",
        {
            jobDescription,
            history,
            answer,
            questionNumber
        }
    );

    return data;

};