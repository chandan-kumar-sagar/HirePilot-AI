import mongoose from "mongoose";

const jobOpportunitySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      default: "Remote",
    },
    minSalary: {
      type: Number,
      default: 0,
    },
    maxSalary: {
      type: Number,
      default: 0,
    },
    experienceLevel: {
      type: String,
      enum: ["fresher", "junior", "mid", "senior"],
      default: "mid",
    },
    jobType: {
      type: String,
      enum: ["Full-time", "Contract", "Internship"],
      default: "Full-time",
    },
    requiredSkills: {
      type: [String],
      default: [],
      index: true, // Crucial for $in queries
    },
    jobUrl: {
      type: String,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const JobOpportunity = mongoose.model("JobOpportunity", jobOpportunitySchema);

export default JobOpportunity;
