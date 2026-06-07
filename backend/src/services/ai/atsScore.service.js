import groq from "../../config/groq.js";

export const analyzeResumeATS = async (
  resumeText
) => {
  try {
    const prompt = `
You are an ATS Resume Analyzer.

Analyze the following resume.

Return ONLY valid JSON.

{
  "atsScore": 0,
  "strengths": [],
  "missingSkills": [],
  "suggestions": []
}

Resume:

${resumeText}
`;

    const response =
      await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",

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
