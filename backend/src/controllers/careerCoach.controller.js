import Resume from "../models/Resume.model.js";
import CareerCoach from "../models/CareerCoach.model.js";
import { askCareerCoach } from "../services/ai/careerCoach.service.js";
import { cleanAiResponse } from "../utils/cleanAiResponse.js";
import { getResumeContext } from "../utils/resumeFormatter.js";

export const createCareerAdvice = async (req, res) => {
  try {
    const { resumeId, question } = req.body;

    if (!question) {
      return res.status(400).json({
        success: false,
        message: "Question is required",
      });
    }

    let resumeContext = null;
    if (resumeId) {
      const resume = await Resume.findOne({
        _id: resumeId,
        user: req.user._id,
      });
      if (resume) {
        resumeContext = getResumeContext(resume);
      }
    }

    const aiResponse = await askCareerCoach({ resumeContext, question });
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

export const getAllCareerAdvice = async (req, res) => {
  try {
    const adviceList = await CareerCoach.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json({
      success: true,
      adviceList,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteCareerAdvice = async (req, res) => {
  try {
    const advice = await CareerCoach.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!advice) {
      return res.status(404).json({
        success: false,
        message: "Career advice not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Career advice deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};