import groq from "../../config/groq.js";

export const generateInterviewQuestions =
  async (resumeText) => {
  const prompt = `
You are a Senior Technical Interviewer.

Analyze the resume and identify the technologies mentioned.

Generate interview questions categorized by technology.

Return ONLY valid JSON.

{
  "nodejs": [],
  "javascript": [],
  "mysql": [],
  "postgresql": [],
  "mongodb": [],
  "react": [],
  "systemDesign": [],
  "behavioral": []
}

Rules:
- Generate 20 Node.js questions
- Generate 20 JavaScript questions
- Generate 20 MySQL questions
- Generate 20 PostgreSQL questions
- Generate 20 MongoDB questions
- Generate 20 React questions
- Generate 20 System Design questions
- Generate 20 Behavioral questions

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

        temperature: 0.3,
      });

    let content = response.choices[0].message.content;
    content = content.replace(/```json\n?|\n?```/g, "").trim();
    return content;
  };