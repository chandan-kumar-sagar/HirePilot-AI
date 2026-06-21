import mongoose from "mongoose";

const interviewAnswerSchema = new mongoose.Schema(
  {
    session: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "InterviewSession",
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
    feedback: {
      type: String,
      default: "",
    },
    improvements: {
      type: [String],
      default: [],
    },
    scores: {
      technicalAccuracy: { type: Number, default: 0 },
      communication: { type: Number, default: 0 },
      confidence: { type: Number, default: 0 },
      overall: { type: Number, default: 0 },
    },
    questionIndex: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const InterviewAnswer = mongoose.model("InterviewAnswer", interviewAnswerSchema);

export default InterviewAnswer;
