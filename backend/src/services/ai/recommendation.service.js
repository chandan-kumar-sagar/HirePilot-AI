import groq from "../../config/groq.js";
import { parseAiJson } from "../../utils/cleanAiResponse.js";

/**
 * Hybrid Recommendation AI Service
 * Instead of searching through jobs, the AI only REASONS and RANKS pre-filtered jobs.
 */
export const rankJobOpportunities = async ({ candidateProfile, availableJobs }) => {
  const prompt = `
You are an expert AI Career Recommendation Engine.
Analyze the candidate profile and compare it against the available job opportunities.

Candidate Information:
${JSON.stringify(candidateProfile, null, 2)}

Available Jobs:
${JSON.stringify(availableJobs, null, 2)}

Instructions:
1. Score each job from 0-100 based strictly on skill overlap and relevance.
2. CRITICAL: DO NOT recommend jobs that require core technologies the candidate does not have (e.g., do not recommend a Python job if they only know JS).
3. ONLY recommend jobs with a match score of 60 or higher. You may return fewer than 5 jobs if they are not a strong match.
4. Explain why the job matches.
5. Identify missing skills.
6. Return ONLY valid JSON matching this exact structure:

{
  "recommendations": [
    {
      "jobId": "...",
      "matchScore": 92,
      "reasons": [
        "...",
        "..."
      ],
      "missingSkills": [
        "..."
      ]
    }
  ]
}
`;

  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.2, // Low temperature for consistent JSON output
      response_format: { type: "json_object" },
    });

    const content = response.choices[0].message.content;
    const parsed = parseAiJson(content);
    
    return parsed?.recommendations || [];
  } catch (error) {
    console.error("AI Ranking Error:", error);
    throw new Error("Failed to rank jobs via AI");
  }
};
