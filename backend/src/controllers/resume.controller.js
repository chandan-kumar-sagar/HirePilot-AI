import Resume from "../models/Resume.model.js";

export const uploadResume = async (req,res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const resume = await Resume.create({
      user: req.user._id,

      title: req.body.title,

      resumeUrl: req.file.path,

      originalFileName:
        req.file.originalname,

      fileSize: req.file.size,
    });

    res.status(201).json({
      success: true,
      message:
        "Resume uploaded successfully",
      resume,
    });
  } catch (error) {
    console.error("Error in uploadResume:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};