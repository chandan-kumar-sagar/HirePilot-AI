import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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

    jobUrl: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: [
        "saved",
        "applied",
        "interview",
        "offer",
        "rejected",
      ],
      default: "saved",
    },

    location: {
      type: String,
      default: "",
    },

    notes: {
      type: String,
      default: "",
    },

    appliedDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model(
  "Job",
  jobSchema
);

export default Job;