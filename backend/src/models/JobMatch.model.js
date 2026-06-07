import mongoose from "mongoose";

const jobMatchSchema =
  new mongoose.Schema(
    {
      user: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      resume: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Resume",
        required: true,
      },

      companyName: {
        type: String,
        required: true,
      },

      jobTitle: {
        type: String,
        required: true,
      },

      matchScore: {
        type: Number,
        default: 0,
      },

      strengths: [String],

      missingSkills: [String],

      recommendations: [String],
    },
    {
      timestamps: true,
    }
  );

const JobMatch = mongoose.model(
  "JobMatch",
  jobMatchSchema
);

export default JobMatch;