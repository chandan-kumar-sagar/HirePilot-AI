import { buildStructuredSummary, prepareResumeContext } from "./aiContext.util.js";

/**
 * Builds the best possible AI context from a resume document.
 *
 * Priority order:
 * 1. resume.summary (AI-generated compact summary, stored during upload)
 * 2. Structured fields (skills + experience + education) → buildStructuredSummary
 * 3. Fallback: compressed raw extractedText (max 4000 chars)
 *
 * @param {Object} resume - Mongoose resume document or plain object
 * @returns {string} The optimal context string for AI prompts
 */
export const getResumeContext = (resume) => {
  if (!resume) return "";

  // 1. Best: Use the AI-generated summary stored during upload (~400 words, ~600 tokens)
  if (resume.summary && resume.summary.trim().length > 50) {
    return resume.summary.trim();
  }

  // 2. Good: Build compact summary from structured MongoDB fields (~300-600 tokens)
  const hasStructuredData =
    (resume.skills && resume.skills.length > 0) ||
    (resume.experience && resume.experience.length > 0) ||
    (resume.education && resume.education.length > 0);

  if (hasStructuredData) {
    return buildStructuredSummary(resume);
  }

  // 3. Fallback: compress raw extracted text to 4000 chars (~1000 tokens)
  return prepareResumeContext(resume.extractedText, 4000);
};
