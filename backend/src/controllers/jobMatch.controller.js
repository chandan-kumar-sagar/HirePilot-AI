import Resume from "../models/Resume.model.js";

import JobMatch from "../models/JobMatch.model.js";

import { analyzeJobMatch } from "../services/ai/jobMatch.service.js";

import {
  parseAiJson,
} from "../utils/cleanAiResponse.js";

export const createJobMatch = async (req, res) => {
    try {
      const {
        resumeId,
        companyName,
        jobTitle,
        jobDescription,
      } = req.body;

      if (
        !resumeId ||
        !companyName ||
        !jobTitle ||
        !jobDescription
      ) {
        return res.status(400).json({
          success: false,
          message:
            "All fields are required",
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

      const aiResponse = await analyzeJobMatch({
          resumeText: resume.extractedText,
          jobDescription,
        });

      const analysis =
        parseAiJson(aiResponse);

      if (!analysis) {
        return res.status(500).json({
          success: false,
          message:
            "Failed to parse AI response",
        });
      }

    let matchScore = Number(analysis.matchScore);

    if (isNaN(matchScore)) matchScore = 0;

    if (matchScore <= 1) matchScore *= 100;

    matchScore = Math.round(matchScore);

    if (matchScore > 100) matchScore = 100;

    if (matchScore < 0) matchScore = 0;

    const jobMatch = await JobMatch.create({
          user: req.user._id,
          resume: resume._id,
          companyName,

          jobTitle,

          matchScore: matchScore,

          strengths:
            analysis.strengths || [],

          missingSkills:
            analysis.missingSkills ||
            [],

          recommendations:
            analysis.recommendations ||
            [],
        });

      res.status(201).json({
        success: true,
        jobMatch,
      });
    } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
  };