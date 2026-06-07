import Resume from "../models/Resume.model.js";
import CoverLetter from "../models/CoverLetter.model.js";
import { cleanAiResponse } from "../utils/cleanAiResponse.js";
import { generateCoverLetter } from "../services/ai/coverLetter.service.js";

export const createCoverLetter = async (req, res) => {

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
        message: "Resume not found",
      });
    }

    const aiResponse =  await generateCoverLetter({
    resumeText: resume.extractedText,

    companyName,

    jobTitle,

    jobDescription,
  });

const coverLetterContent = cleanAiResponse(aiResponse);

    const coverLetter = await CoverLetter.create({
        user: req.user._id,

        resume: resume._id,

        companyName,

        jobTitle,

        content:
          coverLetterContent,
      });

    res.status(201).json({
      success: true,

      message:
        "Cover letter generated successfully",

      coverLetter,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};