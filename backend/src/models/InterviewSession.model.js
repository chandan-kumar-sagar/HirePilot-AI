import mongoose from "mongoose";

const interviewSessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    difficulty: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "intermediate",
    },
    questions: {
      type: [String],
      default: [],
    },
    currentQuestionIndex: {
      type: Number,
      default: 0,
    },
    totalQuestions: {
      type: Number,
      default: 5,
    },
    status: {
      type: String,
      enum: ["in-progress", "completed"],
      default: "in-progress",
    },
    overallScore: {
      type: Number,
      default: null,
    },
    strengths: {
      type: [String],
      default: [],
    },
    weaknesses: {
      type: [String],
      default: [],
    },
    badge: {
      type: String,
      enum: ["bronze", "silver", "gold", null],
      default: null,
    },
    startedAt: {
      type: Date,
      default: Date.now,
    },
    completedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

const InterviewSession = mongoose.model("InterviewSession", interviewSessionSchema);

export default InterviewSession;
