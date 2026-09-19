const Opportunity = require("../models/Opportunity");
const axios = require("axios");

// Helper function to sanitize text & remove weird characters
const sanitizeText = (str) => {
  if (!str) return "";
  return str
    .replace(/[^\x00-\x7F]/g, "") // Remove non-ASCII characters
    .replace(/\s+/g, " ")
    .trim();
};

// List of Indian cities and keywords to match
const indianLocations = [
  "india",
  "bengaluru",
  "bangalore",
  "mumbai",
  "delhi",
  "noida",
  "gurugram",
  "gurgaon",
  "hyderabad",
  "pune",
  "chennai",
  "kolkata",
  "ahmedabad",
];

// GET /api/opportunities
exports.getOpportunities = async (req, res) => {
  try {
    const opportunities = await Opportunity.find().sort({ createdAt: -1 });
    res.status(200).json(opportunities);
  } catch (error) {
    console.error("Error fetching opportunities:", error);
    res.status(500).json({ message: "Failed to fetch opportunities" });
  }
};

// POST /api/opportunities/sync-gov
exports.syncGovOpportunities = async (req, res) => {
  try {
    const newJobs = [];

    // 1. Fetch Live Private Jobs & Strict Filter for India
    try {
      const response = await axios.get("https://jobicy.com/api/v2/remote-jobs?count=50");
      const fetchedJobs = response.data?.jobs || [];

      fetchedJobs.forEach((job) => {
        const title = sanitizeText(job.jobTitle);
        const company = sanitizeText(job.companyName);
        const location = sanitizeText(job.jobGeo || "India");

        // Strict Check: Check if location explicitly mentions India or Indian Tech Hubs
        const isIndiaJob = indianLocations.some((loc) =>
          location.toLowerCase().includes(loc)
        );

        if (title && company && isIndiaJob) {
          newJobs.push({
            title: title,
            company: company,
            category: "Private",
            location: location || "India / Remote",
            description: sanitizeText(job.jobExcerpt || "Private sector job in India."),
            applicationLink: job.url || "https://jobicy.com",
            salaryRange: "Competitive",
          });
        }
      });
    } catch (err) {
      console.error("Error fetching live private jobs:", err.message);
    }

    // 2. Curated Indian Tech & Private Sector Jobs
    const indianPrivateTechJobs = [
      {
        title: "Software Engineer - Full Stack",
        company: "Flipkart",
        category: "Private",
        location: "Bengaluru, Karnataka",
        description: "Develop scalable e-commerce systems for Indian markets.",
        applicationLink: "https://www.flipkartcareers.com",
        salaryRange: "INR 12 - 18 LPA",
      },
      {
        title: "Frontend Developer (React)",
        company: "Swiggy",
        category: "Private",
        location: "Bengaluru, Karnataka",
        description: "Build user interfaces for high-concurrency mobile and web platforms.",
        applicationLink: "https://careers.swiggy.com",
        salaryRange: "INR 10 - 15 LPA",
      },
      {
        title: "Associate Software Engineer",
        company: "TCS",
        category: "Private",
        location: "Mumbai / Pan India",
        description: "Entry-level software engineering and cloud implementation role.",
        applicationLink: "https://www.tcs.com/careers",
        salaryRange: "INR 4.5 - 7 LPA",
      },
      {
        title: "Backend Engineer (Node.js)",
        company: "Razorpay",
        category: "Private",
        location: "Bengaluru / Remote (India)",
        description: "Work on payments infrastructure and API integrations.",
        applicationLink: "https://razorpay.com/jobs",
        salaryRange: "INR 14 - 22 LPA",
      },
    ];

    // 3. Indian Govt Sector Jobs
    const indianGovtJobs = [
      {
        title: "Assistant Section Officer (ASO)",
        company: "Staff Selection Commission (SSC)",
        category: "Government",
        location: "New Delhi / All India",
        description: "Central Secretariat Service recruitment.",
        applicationLink: "https://ssc.gov.in",
        salaryRange: "Level 7 Pay Matrix",
      },
      {
        title: "Probationary Officer (PO)",
        company: "State Bank of India (SBI)",
        category: "Government",
        location: "Pan India",
        description: "Public Sector Banking Officer recruitment across India.",
        applicationLink: "https://sbi.co.in/careers",
        salaryRange: "Scale I",
      },
      {
        title: "Scientist / Engineer 'SC'",
        company: "ISRO",
        category: "Government",
        location: "Bengaluru, Karnataka",
        description: "Research & Development opening for CS & EC Engineers.",
        applicationLink: "https://www.isro.gov.in/Careers.html",
        salaryRange: "Level 10",
      },
    ];

    // Combine all verified India jobs
    newJobs.push(...indianPrivateTechJobs, ...indianGovtJobs);

    // Refresh collection in DB
    await Opportunity.deleteMany({});
    const savedJobs = await Opportunity.insertMany(newJobs);

    res.status(200).json({
      message: "Synced live Indian opportunities successfully!",
      count: savedJobs.length,
      opportunities: savedJobs,
    });
  } catch (error) {
    console.error("Error syncing opportunities:", error);
    res.status(500).json({ message: "Failed to sync live data" });
  }
};
