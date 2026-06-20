import groq from "../../config/groq.js";

/**
 * Generates a concise AI summary of a resume to store in MongoDB.
 * This summary is used in place of the full extractedText for all AI prompts.
 * Uses the fast 8b model — this is a simple summarization task.
 *
 * @param {string} extractedText - Raw PDF text (already truncated to 15k chars from parser)
 * @returns {Promise<string>} - A compact summary (~400-600 tokens)
 */
export const generateResumeSummary = async (extractedText) => {
  try {
    if (!extractedText || extractedText.trim().length < 50) {
      return "";
    }

    // Only send first 6000 chars to the summary model — enough to understand the resume
    const safeText = extractedText
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 6000);

    const prompt = `You are a resume summarizer.

Read the resume below and create a compact, structured summary covering:
- Name and title/role (if visible)
- Top skills (list as comma-separated)
- Work experience (company, role, dates, 1-line description each)
- Education (degree, institution)
- Notable projects or achievements (brief)

Keep the summary under 400 words. Be factual and concise.

Resume:
${safeText}

Return plain text summary only. No JSON. No headers like "Summary:".`;

    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.1,
      max_tokens: 600,
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error("[ResumeSummary] Failed to generate summary:", error.message);
    // Non-critical — fallback to empty, resumeFormatter will use extractedText slice
    return "";
  }
};
