import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    resumeUrl: {
      type: String,
      required: true,
    },

    originalFileName: {
      type: String,
      required: true,
    },

    fileSize: {
      type: Number,
    },

    atsScore: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Resume = mongoose.model(
  "Resume",
  resumeSchema
);

export default Resume;