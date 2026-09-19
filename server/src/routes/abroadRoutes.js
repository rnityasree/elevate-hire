const express = require("express");
const router = express.Router();
const University = require("../models/University");

const samplePrograms = [
  {
    universityName: "Technical University of Munich (TUM)",
    programName: "M.Sc. Data Engineering and Analytics",
    country: "Germany",
    city: "Munich",
    discipline: "Data Science",
    tuitionFeeUSD: 0,
    postStudyWorkVisaYears: 1.5,
    globalRanking: 28,
    examsRequired: { ieltsScore: 6.5, gre: false },
    officialWebsite: "https://www.tum.de",
  },
  {
    universityName: "Harvard University",
    programName: "Master of Engineering in Software Engineering",
    country: "United States",
    city: "Cambridge, MA",
    discipline: "Software Engineering",
    tuitionFeeUSD: 54000,
    postStudyWorkVisaYears: 3.0,
    globalRanking: 4,
    examsRequired: { ieltsScore: 7.5, gre: true },
    officialWebsite: "https://www.harvard.edu",
  },
  {
    universityName: "University of Toronto",
    programName: "M.Sc. in Computer Science",
    country: "Canada",
    city: "Toronto",
    discipline: "Computer Science",
    tuitionFeeUSD: 30000,
    postStudyWorkVisaYears: 3.0,
    globalRanking: 21,
    examsRequired: { ieltsScore: 7.0, gre: false },
    officialWebsite: "https://www.utoronto.ca",
  },
  {
    universityName: "University of Melbourne",
    programName: "Master of Information Technology (Cybersecurity)",
    country: "Australia",
    city: "Melbourne",
    discipline: "Cybersecurity",
    tuitionFeeUSD: 32000,
    postStudyWorkVisaYears: 4.0,
    globalRanking: 14,
    examsRequired: { ieltsScore: 6.5, gre: false },
    officialWebsite: "https://www.unimelb.edu.au",
  },
];

// GET /api/abroad
router.get("/", async (req, res) => {
  try {
    const { country, discipline, search } = req.query;
    let query = {};

    if (country && country !== "All") {
      query.country = new RegExp(`^${country}$`, "i");
    }

    if (discipline && discipline !== "All") {
      query.discipline = new RegExp(`^${discipline}$`, "i");
    }

    if (search) {
      query.$or = [
        { universityName: { $regex: search, $options: "i" } },
        { programName: { $regex: search, $options: "i" } },
        { city: { $regex: search, $options: "i" } },
      ];
    }

    const programs = await University.find(query).sort({ globalRanking: 1 });
    return res.status(200).json(programs);
  } catch (err) {
    console.error("GET /api/abroad Error:", err);
    return res.status(500).json({ message: "Server Error", error: err.message });
  }
});

// POST /api/abroad/seed
router.post("/seed", async (req, res) => {
  try {
    await University.deleteMany({});
    const seeded = await University.insertMany(samplePrograms);
    return res.status(201).json({
      message: "Successfully seeded sample programs!",
      count: seeded.length,
      data: seeded,
    });
  } catch (err) {
    console.error("POST /api/abroad/seed Error details:", err);
    return res.status(500).json({
      message: "Failed to seed sample programs",
      error: err.message,
    });
  }
});

module.exports = router;