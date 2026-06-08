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

    extractedText: {
      type: String,
      default: "",
    },

    atsScore: {
      type: Number,
      default: 0,
    },

    skills: {
      type: [String],
      default: [],
    },

    experience: {
      type: [
        {
          company: String,
          role: String,
          startDate: String,
          endDate: String,
          description: String,
        },
      ],
      default: [],
    },

    education: {
      type: [
        {
          institution: String,
          degree: String,
          fieldOfStudy: String,
          startDate: String,
          endDate: String,
        },
      ],
      default: [],
    },

    version: {
      type: Number,
      default: 1,
    },

    parentResume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      default: null,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    atsAnalysis: {
     type: Object,
     default: {},
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