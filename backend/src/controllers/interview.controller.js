import Resume from "../models/Resume.model.js";
import Interview from "../models/Interview.model.js";


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

      const aiResponse = await generateInterviewQuestions(resume.extractedText);

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