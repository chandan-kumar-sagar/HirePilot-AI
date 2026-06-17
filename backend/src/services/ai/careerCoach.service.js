// Also update the AI service to handle optional resumeText
import groq from "../../config/groq.js";

export const askCareerCoach = async ({ resumeText, question }) => {
  const resumeSection = resumeText
    ? `\nCandidate Resume:\n${resumeText}\n`
    : "\n(No resume provided — give general expert career guidance.)\n";

  const prompt = `You are an expert AI Career Coach with deep knowledge of software engineering, tech industry trends, career growth paths, and job hunting strategies.

${resumeSection}
User Question:
${question}

Provide detailed, actionable, and well-structured career advice. Use numbered steps or bullet points where relevant. Be motivating and practical. Do not use JSON format — respond in plain text.`;

  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.6,
  });

  return response.choices[0].message.content;
};