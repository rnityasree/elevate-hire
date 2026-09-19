const mongoose = require("mongoose");

const universitySchema = new mongoose.Schema(
  {
    universityName: { type: String, required: true },
    programName: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, default: "" },
    discipline: { type: String, default: "" },
    tuitionFeeUSD: { type: Number, default: 0 },
    postStudyWorkVisaYears: { type: Number, default: 0 },
    globalRanking: { type: Number },
    examsRequired: {
      ieltsScore: { type: Number, default: 6.5 },
      gre: { type: Boolean, default: false },
    },
    officialWebsite: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("University", universitySchema);