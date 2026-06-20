import groq from "../../config/groq.js";
import { compressText } from "../../utils/aiContext.util.js";

export const generateCoverLetter = async ({
  resumeContext,
  companyName,
  jobTitle,
  jobDescription,
}) => {
  const isGeneral = !companyName && !jobTitle && !jobDescription;

  // Compress context to max 3000 chars to stay within token limits
  const safeContext = compressText(resumeContext, 3000);
  const safeJD = compressText(jobDescription, 1500);

  const commonRules = `
CRITICAL RULES — YOU MUST FOLLOW THESE:
- NEVER use placeholder text like [Your Name], [Company Name], [Date], [Address], [City], [Recipient's Name], or any text inside square brackets.
- Extract the candidate's real name, skills, and experience directly from the resume context provided.
- Write the letter as if you ARE the candidate — use first person ("I", "my", "me").
- Start the letter directly with "Dear Hiring Manager," or "Dear ${companyName || "Hiring Manager"},"
- Do NOT include postal addresses, dates, or formal letter headers at the top.
- The letter MUST be complete, specific, and personalized — not a generic template.
- Use concrete details from the resume (actual skills, actual technologies, actual experience).
- End with a professional closing like "Sincerely, [Candidate's Real Name from Resume]".
`;

  const prompt = isGeneral
    ? `
You are a professional cover letter writer.

Write a complete, ready-to-send cover letter for the candidate based on their resume.

${commonRules}

Candidate Resume Context:
${safeContext}

The letter should:
1. Open with a strong hook about the candidate's background
2. Highlight their most impressive skills and real experiences from the resume
3. Mention their key technologies/tools (e.g., Node.js, React, MongoDB — whatever is in the resume)
4. Close with enthusiasm and a call to action

Return ONLY the cover letter text. No explanations, no notes.
`
    : `
You are a professional cover letter writer.

Write a complete, ready-to-send cover letter for the candidate applying to the following role.

${commonRules}

Target Role:
- Company: ${companyName}
- Job Title: ${jobTitle}
- Job Description: ${safeJD || "Not provided."}

Candidate Resume Context:
${safeContext}

The letter should:
1. Open by expressing interest in the ${jobTitle} role at ${companyName}
2. Connect the candidate's real skills/experience from their resume to the job requirements
3. Mention 2–3 specific technologies or achievements from the resume
4. Close with enthusiasm and a call to action

Return ONLY the cover letter text. No explanations, no notes.
`;

  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.4,
  });

  return response.choices[0].message.content;
};