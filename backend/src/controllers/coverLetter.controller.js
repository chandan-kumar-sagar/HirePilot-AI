import Resume from "../models/Resume.model.js";
import CoverLetter from "../models/CoverLetter.model.js";
import { cleanAiResponse } from "../utils/cleanAiResponse.js";
import { generateCoverLetter as generateAiCoverLetter } from "../services/ai/coverLetter.service.js";
import { getResumeContext } from "../utils/resumeFormatter.js";

export const createCoverLetter = async (req, res) => {
  try {
    const { resumeId, companyName, jobTitle, jobDescription } = req.body;

    if (!resumeId) {
      return res.status(400).json({
        success: false,
        message: "Resume ID is required to generate a cover letter",
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

    const resumeContext = getResumeContext(resume);
    const aiResponse = await generateAiCoverLetter({
      resumeContext,
      companyName,
      jobTitle,
      jobDescription,
    });

    const coverLetterContent = cleanAiResponse(aiResponse);

    const coverLetter = await CoverLetter.create({
      user: req.user._id,
      resume: resume._id,
      companyName: companyName || "General",
      jobTitle: jobTitle || "General Cover Letter",
      content: coverLetterContent,
    });

    res.status(201).json({
      success: true,
      message: "Cover letter generated successfully",
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

export const getAllCoverLetters = async (req, res) => {
  try {
    const coverLetters = await CoverLetter.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      coverLetters,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCoverLetterById = async (req, res) => {
  try {
    const coverLetter = await CoverLetter.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!coverLetter) {
      return res.status(404).json({
        success: false,
        message: "Cover letter not found",
      });
    }

    res.status(200).json({
      success: true,
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

export const deleteCoverLetter = async (req, res) => {
  try {
    const coverLetter = await CoverLetter.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!coverLetter) {
      return res.status(404).json({
        success: false,
        message: "Cover letter not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Cover letter deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};