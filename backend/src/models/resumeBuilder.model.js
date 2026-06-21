import mongoose from "mongoose";

const resumeBuilderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    jobTitle: {
      type: String,
      required: true,
    },
    yearsOfExperience: {
      type: Number,
      required: true,
    },
    techStack: {
      type: [String],
      required: true,
    },
    professionalSummary: {
      type: String,
    },
    projects: [
      {
        title: String,
        description: String,
        technologies: [String],
        highlights: [String],
      },
    ],
    experience: [
      {
        role: String,
        company: String,
        duration: String,
        responsibilities: [String],
      },
    ],
    education: [
      {
        degree: String,
        institution: String,
        year: String,
      },
    ],
    skills: {
      type: [String],
    },
  },
  { timestamps: true }
);

const ResumeBuilder = mongoose.model("ResumeBuilder", resumeBuilderSchema);

export default ResumeBuilder;
