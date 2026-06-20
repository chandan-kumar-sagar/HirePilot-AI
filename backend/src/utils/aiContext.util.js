/**
 * Utility to compress and prepare resume text before sending to AI.
 * Prevents hitting Groq's 12k TPM limit.
 */

/**
 * Compresses raw resume text: removes extra whitespace and truncates.
 * Use this when you only have raw extractedText available.
 *
 * @param {string} text - Raw extracted resume text
 * @param {number} maxChars - Maximum characters (default 4000 = ~1000 tokens)
 * @returns {string}
 */
export const prepareResumeContext = (text, maxChars = 4000) => {
  if (!text) return "";
  return text
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxChars);
};

/**
 * Compresses a text string (e.g., job description) to fit within token limits.
 *
 * @param {string} text - Any long text
 * @param {number} maxChars - Maximum characters (default 2500)
 * @returns {string}
 */
export const compressText = (text, maxChars = 2500) => {
  if (!text) return "";
  return text.replace(/\s+/g, " ").trim().slice(0, maxChars);
};

/**
 * Builds a lean resume summary string from structured fields.
 * Preferred over raw text for AI prompts.
 *
 * @param {Object} resume - Mongoose resume document
 * @returns {string} A compact resume summary for AI consumption
 */
export const buildStructuredSummary = (resume) => {
  if (!resume) return "";

  const lines = [];

  // Try to extract candidate name from extractedText (usually appears in first 200 chars)
  // This ensures the AI knows the real name and won't generate "[Your Name]" placeholders
  if (resume.extractedText) {
    const firstLine = resume.extractedText
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 200);
    lines.push(`Candidate Name/Header: ${firstLine}`);
  }

  if (resume.skills && resume.skills.length > 0) {
    lines.push(`\nSkills: ${resume.skills.join(", ")}`);
  }

  if (resume.experience && resume.experience.length > 0) {
    lines.push("\nExperience:");
    resume.experience.forEach((exp) => {
      lines.push(
        `- ${exp.role} at ${exp.company} (${exp.startDate || ""} – ${exp.endDate || "Present"}): ${(exp.description || "").slice(0, 200)}`
      );
    });
  }

  if (resume.education && resume.education.length > 0) {
    lines.push("\nEducation:");
    resume.education.forEach((edu) => {
      lines.push(
        `- ${edu.degree} in ${edu.fieldOfStudy} from ${edu.institution} (${edu.startDate || ""} – ${edu.endDate || ""})`
      );
    });
  }

  // If structured data exists, return it (very compact, ~300-600 tokens)
  if (lines.length > 0) {
    return lines.join("\n");
  }

  // Fallback: compress raw text
  return prepareResumeContext(resume.extractedText, 4000);
};

/**
 * Estimates the approximate number of tokens in a string.
 * Rule of thumb: 1 token ≈ 4 characters in English.
 *
 * @param {string} text
 * @returns {number}
 */
export const estimateTokens = (text) => {
  if (!text) return 0;
  return Math.ceil(text.length / 4);
};

/**
 * Validates that a prompt does not exceed the safe token limit before sending to Groq.
 * Throws an error if too large.
 *
 * @param {string} prompt - The full prompt string to validate
 * @param {number} maxTokens - The limit (default 9000 to leave buffer below 12k)
 * @throws {Error} if prompt is too large
 */
export const validatePromptSize = (prompt, maxTokens = 9000) => {
  const estimated = estimateTokens(prompt);
  if (estimated > maxTokens) {
    throw new Error(
      `Prompt too large: ~${estimated} estimated tokens (limit: ${maxTokens}). Reduce resume or input text size.`
    );
  }
  return estimated;
};
