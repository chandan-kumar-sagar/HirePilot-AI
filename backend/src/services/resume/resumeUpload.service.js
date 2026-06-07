import Resume from "../../models/Resume.model.js";

export const saveResume = async ({ userId, title, filePath, originalFileName, fileSize, extractedText }) => {
  const resume = await Resume.create({
    user: userId,
    title,
    resumeUrl: filePath,
    originalFileName,
    fileSize,
    extractedText,
  });

  return resume;
};
