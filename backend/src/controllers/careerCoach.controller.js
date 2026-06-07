import Resume from "../models/Resume.model.js";

import CareerCoach from "../models/CareerCoach.model.js";

import { askCareerCoach } from "../services/ai/careerCoach.service.js";

import { cleanAiResponse } from "../utils/cleanAiResponse.js";

export const createCareerAdvice = async (req, res) => {
    try {
      const { resumeId, question } = req.body;

      if (!resumeId || !question) {
        return res.status(400).json({
          success: false,
          message: "Resume ID and question are required",
        });
      }

      const resume = await Resume.findOne({
          _id: resumeId,
          user: req.user._id,
        });

      if (!resume) {
        return res.status(404).json({
          success: false,
          message:
            "Resume not found",
        });
      }

      const aiResponse = await askCareerCoach({
          resumeText: resume.extractedText,
          question,
        });

      const answer = cleanAiResponse(aiResponse);

      const careerAdvice = await CareerCoach.create({
          user: req.user._id,
          question,
          answer,
        });

      res.status(201).json({
        success: true,
        careerAdvice,
      });
    } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
  };