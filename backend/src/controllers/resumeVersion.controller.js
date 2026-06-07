import Resume from "../models/Resume.model.js";

export const createResumeVersion = async (req, res) => {
    try {
      const { resumeId } = req.body;

      const oldResume = await Resume.findOne({
          _id: resumeId,
          user: req.user._id,
        });

      if (!oldResume) {
        return res.status(404).json({
          success: false,
          message: "Resume not found",
        });
      }

      const newResume = await Resume.create({
          user: oldResume.user,
          title: oldResume.title,
          resumeUrl: oldResume.resumeUrl,
          originalFileName: oldResume.originalFileName,
          fileSize: oldResume.fileSize,
          atsScore: oldResume.atsScore,
          extractedText: oldResume.extractedText,
          version: oldResume.version + 1,
          parentResume: oldResume.parentResume || oldResume._id,
        });

      res.status(201).json({
        success: true,
        resume:
          newResume,
      });
    } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
  };


  export const getResumeVersions = async (req, res) => {
    try {
      const { resumeId } = req.body;

      const resume = await Resume.findById(
          resumeId
        );

      if (!resume) {
        return res.status(404).json({
          success: false,
          message: "Resume not found",
        });
      }

      const rootId = resume.parentResume || resume._id;

      const versions = await Resume.find({
          $or: [
            { _id: rootId },
            { parentResume: rootId },
          ],
        }).sort({ version: 1 });

      res.status(200).json({
        success: true,
        versions,
      });
    } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
  };

