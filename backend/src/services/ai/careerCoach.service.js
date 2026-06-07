import groq from "../../config/groq.js";

export const askCareerCoach = async ({ resumeText, question }) => {
    const prompt = `
You are an expert career coach.

Analyze the candidate's resume and answer the question.

Resume:
${resumeText}

Question:
${question}

Provide detailed and actionable advice.
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

        temperature: 0.5,
      });

    return response.choices[0]
      .message.content;
  };