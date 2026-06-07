import groq from "../../config/groq.js";

export const analyzeJobMatch =
  async ({
    resumeText,
    jobDescription,
  }) => {
    const prompt = `
Analyze the candidate resume against the job description.

Return ONLY valid JSON.

{
  "matchScore": 0,
  "strengths": [],
  "missingSkills": [],
  "recommendations": []
}

Resume:
${resumeText}

Job Description:
${jobDescription}
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