import groq from "../../config/groq.js";
import { compressText, validatePromptSize } from "../../utils/aiContext.util.js";

export const analyzeResumeATS = async (
  resumeContext
) => {
  try {
    // Limit to 4000 chars max (~1000 tokens) — ATS analysis needs key info only
    const safeContext = compressText(resumeContext, 4000);

    const prompt = `
You are an expert ATS (Applicant Tracking System) Resume Analyzer.

Evaluate the following resume context (which may be structured data or truncated text) based on general ATS best practices, such as structure, keyword richness, quantifiable achievements, and clarity.
Calculate a realistic ATS score from 0 to 100 indicating how well-optimized this resume is for passing ATS filters.

Return ONLY valid JSON matching this exact structure:

{
  "atsScore": <number between 0 and 100>,
  "strengths": ["...", "..."],
  "missingSkills": ["...", "..."],
  "suggestions": ["...", "..."]
}

Resume Context:

${safeContext}
`;

    // Safety guard: validate token size before sending
    validatePromptSize(prompt, 9000);

    const response =
      await groq.chat.completions.create({
        model: "llama-3.1-8b-instant",

        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],

        temperature: 0.2,
      });

    let content = response.choices[0].message.content;
    content = content.replace(/```json\n?|\n?```/g, "").trim();
    return content;
  } catch (error) {
    console.error(
      "ATS Analysis Error:",
      error
    );

    throw error;
  }
};
