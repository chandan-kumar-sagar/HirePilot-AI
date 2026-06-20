import Resume from "../models/Resume.model.js";
import Interview from "../models/Interview.model.js";
import { getResumeContext } from "../utils/resumeFormatter.js";

import {
  generateInterviewQuestions,
} from "../services/ai/interviewQuestion.service.js";

import { parseAiJson } from "../utils/cleanAiResponse.js";


export const createInterviewQuestions = async (req, res) => {
    try {
      const { resumeId } = req.body;

      const resume = await Resume.findOne({
          _id: resumeId,
          user: req.user._id,
        });

      if (!resume) {
        return res.status(404).json({
          success: false,
          message: "Resume not found",
        });
      }

      const resumeContext = getResumeContext(resume);
      const aiResponse = await generateInterviewQuestions(resumeContext);

      const questions = parseAiJson(aiResponse);
      const interview = await Interview.create({
          user: req.user._id,
          resume: resume._id,
          categories: questions,
        });

      res.status(201).json({
        success: true,
        interview,
      });
    } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
  };

export const getAllInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find({ user: req.user._id })
      .populate("resume", "title")
      .sort({ _id: -1 });
    
    res.status(200).json({
      success: true,
      interviews,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getInterviewById = async (req, res) => {
  try {
    const interview = await Interview.findOne({ _id: req.params.id, user: req.user._id })
      .populate("resume", "title");

    if (!interview) {
      return res.status(404).json({ success: false, message: "Interview not found" });
    }

    res.status(200).json({
      success: true,
      interview,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteInterview = async (req, res) => {
  try {
    const interview = await Interview.findOneAndDelete({ _id: req.params.id, user: req.user._id });

    if (!interview) {
      return res.status(404).json({ success: false, message: "Interview not found" });
    }

    res.status(200).json({
      success: true,
      message: "Interview deleted successfully"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};