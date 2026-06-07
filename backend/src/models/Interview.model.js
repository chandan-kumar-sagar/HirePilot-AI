import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  resume: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resume",
  },

  categories: {
    nodejs: [String],
    javascript: [String],
    mysql: [String],
    postgresql: [String],
    mongodb: [String],
    react: [String],
    systemDesign: [String],
    behavioral: [String],
  },
});

const Interview = mongoose.model("Interview", interviewSchema);

export default Interview;