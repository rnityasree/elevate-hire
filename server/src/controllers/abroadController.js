const University = require("../models/University");

// GET /api/abroad - Fetch programs with flexible Country-First & Course-First filtering
exports.getPrograms = async (req, res) => {
  try {
    const { country, discipline, maxTuition, search } = req.query;
    let query = {};

    // Country-First Filter
    if (country && country !== "All") {
      query.country = new RegExp(`^${country}$`, "i");
    }

    // Course / Discipline Filter
    if (discipline && discipline !== "All") {
      query.discipline = new RegExp(`^${discipline}$`, "i");
    }

    // Budget / Tuition Filter
    if (maxTuition) {
      query.tuitionFeeUSD = { $lte: Number(maxTuition) };
    }

    // Keyword Search (Name or Program Title)
    if (search) {
      query.$or = [
        { universityName: new RegExp(search, "i") },
        { programName: new RegExp(search, "i") },
      ];
    }

    const programs = await University.find(query).sort({ globalRanking: 1 });
    res.status(200).json(programs);
  } catch (error) {
    console.error("Error fetching programs:", error);
    res.status(500).json({ message: "Failed to fetch university programs" });
  }
};

// POST /api/abroad/seed - Pre-populate database with initial global CS/IT programs
exports.seedPrograms = async (req, res) => {
  try {
    const samplePrograms = [
      {
        universityName: "Technical University of Munich (TUM)",
        country: "Germany",
        city: "Munich",
        globalRanking: 28,
        programName: "M.Sc. in Informatics (Computer Science)",
        discipline: "Computer Science",
        durationMonths: 24,
        tuitionFeeUSD: 6000,
        examsRequired: { gre: false, ieltsScore: 6.5, toeflScore: 88 },
        postStudyWorkVisaYears: 1.5,
        applicationDeadline: "May 31 (Winter Intake)",
        officialWebsite: "https://www.tum.de/en/",
      },
      {
        universityName: "RWTH Aachen University",
        country: "Germany",
        city: "Aachen",
        globalRanking: 90,
        programName: "M.Sc. in Software Systems Engineering",
        discipline: "Software Engineering",
        durationMonths: 24,
        tuitionFeeUSD: 0,
        examsRequired: { gre: true, ieltsScore: 6.5, toeflScore: 90 },
        postStudyWorkVisaYears: 1.5,
        applicationDeadline: "March 1 (Winter Intake)",
        officialWebsite: "https://www.rwth-aachen.de",
      },
      {
        universityName: "Northeastern University",
        country: "United States",
        city: "Boston, MA",
        globalRanking: 200,
        programName: "M.S. in Computer Science (Align)",
        discipline: "Computer Science",
        durationMonths: 24,
        tuitionFeeUSD: 38000,
        examsRequired: { gre: false, ieltsScore: 7.0, toeflScore: 100 },
        postStudyWorkVisaYears: 3.0,
        applicationDeadline: "April 15",
        officialWebsite: "https://www.northeastern.edu",
      },
      {
        universityName: "University of Toronto",
        country: "Canada",
        city: "Toronto",
        globalRanking: 21,
        programName: "Master of Science in Applied Computing (MScAC)",
        discipline: "Data Science",
        durationMonths: 16,
        tuitionFeeUSD: 29000,
        examsRequired: { gre: false, ieltsScore: 7.0, toeflScore: 93 },
        postStudyWorkVisaYears: 3.0,
        applicationDeadline: "December 1",
        officialWebsite: "https://www.utoronto.ca",
      },
      {
        universityName: "University of Melbourne",
        country: "Australia",
        city: "Melbourne",
        globalRanking: 14,
        programName: "Master of Information Technology",
        discipline: "Cybersecurity",
        durationMonths: 24,
        tuitionFeeUSD: 33000,
        examsRequired: { gre: false, ieltsScore: 6.5, toeflScore: 79 },
        postStudyWorkVisaYears: 2.0,
        applicationDeadline: "November 30",
        officialWebsite: "https://www.unimelb.edu.au",
      },
    ];

    await University.deleteMany({});
    const inserted = await University.insertMany(samplePrograms);

    res.status(200).json({
      message: "Seeded international university programs successfully!",
      count: inserted.length,
      programs: inserted,
    });
  } catch (error) {
    console.error("Error seeding programs:", error);
    res.status(500).json({ message: "Failed to seed programs" });
  }
};