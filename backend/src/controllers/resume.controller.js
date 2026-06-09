import Resume from "../models/Resume.model.js";
import { extractResumeText } from "../services/resume/resumeParser.service.js";
import { saveResume } from "../services/resume/resumeUpload.service.js";
import { analyzeResumeATS } from "../services/ai/atsScore.service.js";
import { extractStructuredData } from "../services/ai/extractResumeData.service.js";
import { analyzeResumeSchema } from "../validations/resume.validation.js";
import fs from "fs";

import { parseAiJson } from "../utils/cleanAiResponse.js";


export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const extractedText = await extractResumeText(req.file.path);

    // Save resume first so user gets instant response
    const resume = await saveResume({
      userId: req.user._id,
      title: req.body.title,
      filePath: req.file.path,
      originalFileName: req.file.originalname,
      fileSize: req.file.size,
      extractedText,
    });

    // Run AI structured extraction in the background (non-blocking)
    extractStructuredData(extractedText)
      .then(async (structuredData) => {
        await Resume.findByIdAndUpdate(resume._id, {
          skills: structuredData.skills || [],
          experience: structuredData.experience || [],
          education: structuredData.education || [],
        });
        console.log(`[Resume] Structured data extracted for resume: ${resume._id}`);
      })
      .catch((err) => {
        console.error(`[Resume] Background extraction failed for ${resume._id}:`, err.message);
      });

    res.status(201).json({
      success: true,
      message: "Resume uploaded successfully. AI extraction is running in the background.",
      resume,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
      stack: error.stack,
    });
  }
};

export const analyzeResume = async (req, res) => {
  try {
    const validatedData = analyzeResumeSchema.parse(req.body);
    const { resumeId } = validatedData;

    const resume =
      await Resume.findById(
        resumeId
      );

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    const aiResult = await analyzeResumeATS(resume.extractedText);

    const parsedResult = parseAiJson(aiResult);

    resume.atsScore = parsedResult.atsScore;
    resume.atsAnalysis = parsedResult;

    await resume.save();

    res.status(200).json({
      success: true,
      analysis: parsedResult,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({
      user: req.user._id,
    })
      .select("title atsScore originalFileName fileSize skills experience education createdAt")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: resumes.length,
      resumes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getResumeById = async (req, res) => {
  try {
    const { id } = req.params;

    const resume = await Resume.findOne({
        _id: id,
        user: req.user._id,
      });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    res.status(200).json({
      success: true,
      resume,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteResume = async (req, res) => {
  try {
    const { id } = req.params;

    const resume = await Resume.findOne({
        _id: id,
        user: req.user._id,
      });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    if (resume.resumeUrl && fs.existsSync(resume.resumeUrl)) {
      fs.unlinkSync(resume.resumeUrl);
    }

await resume.deleteOne();
    res.status(200).json({
      success: true,
      message:
        "Resume deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};