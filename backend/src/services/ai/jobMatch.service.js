import groq from "../../config/groq.js";
import { compressText } from "../../utils/aiContext.util.js";

export const analyzeJobMatch =
  async ({
    resumeContext,
    jobDescription,
  }) => {
    // Strictly limit both inputs: 2500 chars each = ~625 tokens each = ~1250 tokens total (safe)
    const safeResume = compressText(resumeContext, 2500);
    const safeJD = compressText(jobDescription, 2500);

    const prompt = `
Analyze the candidate resume context against the job description.

Return ONLY valid JSON.

{
  "matchScore": 85,
  "strengths": [],
  "missingSkills": [],
  "recommendations": []
}

Resume Context:
${safeResume}

Job Description:
${safeJD}
`;

    const response =
      await groq.chat.completions.create({
        model:
          "llama-3.3-70b-versatile",

        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],

        temperature: 0.3,
      });

    return response.choices[0]
      .message.content;
  };