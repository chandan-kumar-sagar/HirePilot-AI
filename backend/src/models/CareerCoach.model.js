import mongoose from "mongoose";

const careerCoachSchema =
  new mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      question: {
        type: String,
        required: true,
      },

      answer: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

const CareerCoach = mongoose.model(
  "CareerCoach",
  careerCoachSchema
);

export default CareerCoach;