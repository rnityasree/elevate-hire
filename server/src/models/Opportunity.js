const mongoose = require("mongoose");

const opportunitySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["Government", "Private"],
      default: "Government",
    },
    location: {
      type: String,
      default: "Remote / Various",
    },
    description: {
      type: String,
      default: "",
    },
    applicationLink: {
      type: String,
      required: true,
    },
    salaryRange: {
      type: String,
      default: "Not Specified",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Opportunity", opportunitySchema);