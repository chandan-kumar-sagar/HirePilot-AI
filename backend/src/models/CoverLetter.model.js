import mongoose from "mongoose";

const coverLetterSchema =
  new mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      resume: {
        type: mongoose.Schema.Types.ObjectId,
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

      content: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

const CoverLetter = mongoose.model(
  "CoverLetter",
  coverLetterSchema
);

export default CoverLetter;