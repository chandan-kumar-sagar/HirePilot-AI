import ResumeBuilder from "../models/resumeBuilder.model.js";
import { generateResumeWithAI } from "../services/ai/resumeBuilder.service.js";
import NodeCache from "node-cache";

// Cache for 1 hour
const resumeCache = new NodeCache({ stdTTL: 3600 });

export const generateResume = async (req, res) => {
  try {
    const { jobTitle, yearsOfExperience, techStack } = req.body;

    if (!jobTitle || yearsOfExperience === undefined || !techStack) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const cacheKey = `resume_${req.user._id}_${jobTitle}_${yearsOfExperience}`;
    const cachedData = resumeCache.get(cacheKey);

    if (cachedData) {
      return res.status(200).json({
        success: true,
        message: "Resume generated from cache",
        data: cachedData,
      });
    }

    const aiGeneratedData = await generateResumeWithAI({ jobTitle, yearsOfExperience, techStack });

    // Combine input data with AI generated data
    const completeResumeData = {
      userId: req.user._id,
      jobTitle,
      yearsOfExperience,
      techStack,
      ...aiGeneratedData
    };

    // Store in cache
    resumeCache.set(cacheKey, completeResumeData);

    res.status(200).json({
      success: true,
      message: "Resume generated successfully",
      data: completeResumeData,
    });
  } catch (error) {
    console.error("Generate Resume Error:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

export const saveResume = async (req, res) => {
  try {
    const resumeData = { ...req.body, userId: req.user._id };
    
    // Determine if updating or creating
    let resume;
    if (req.body._id) {
      resume = await ResumeBuilder.findByIdAndUpdate(req.body._id, resumeData, { new: true });
    } else {
      resume = new ResumeBuilder(resumeData);
      await resume.save();
    }

    res.status(200).json({
      success: true,
      message: "Resume saved successfully",
      data: resume,
    });
  } catch (error) {
    console.error("Save Resume Error:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

export const getUserResumes = async (req, res) => {
  try {
    const resumes = await ResumeBuilder.find({ userId: req.user._id }).sort({ updatedAt: -1 });
    res.status(200).json({ success: true, data: resumes });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

export const getResumeById = async (req, res) => {
  try {
    const resume = await ResumeBuilder.findOne({ _id: req.params.id, userId: req.user._id });
    if (!resume) {
      return res.status(404).json({ success: false, message: "Resume not found" });
    }
    res.status(200).json({ success: true, data: resume });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

export const deleteResume = async (req, res) => {
  try {
    const resume = await ResumeBuilder.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!resume) {
      return res.status(404).json({ success: false, message: "Resume not found" });
    }
    res.status(200).json({ success: true, message: "Resume deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};
