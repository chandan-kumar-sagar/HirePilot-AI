import groq from "../../config/groq.js";
import NodeCache from "node-cache";

// ─── Question Cache ────────────────────────────────────────────────────────────
// Cache questions by category+difficulty for 12 hours to save AI tokens
const questionCache = new NodeCache({ stdTTL: 43200 });

// ─── Generate Questions ────────────────────────────────────────────────────────
export const generateQuestions = async ({ category, difficulty, totalQuestions = 5 }) => {
  const cacheKey = `questions_${category.toLowerCase()}_${difficulty}`;
  const cached = questionCache.get(cacheKey);

  if (cached) {
    console.log(`[MockInterview] Cache HIT for questions: ${cacheKey}`);
    return cached;
  }

  const prompt = `
You are a senior technical interviewer at a top tech company.
Generate exactly ${totalQuestions} unique, challenging interview questions for the following:

Topic/Category: ${category}
Difficulty Level: ${difficulty}

Rules:
- Questions must be technical, specific, and scenario-based.
- For "beginner": focus on fundamentals and basic concepts.
- For "intermediate": focus on real-world application and problem-solving.
- For "advanced": focus on system design, optimization, edge cases, and deep technical knowledge.
- Each question should be answerable in 2-4 minutes verbally.
- NO multiple-choice questions. Open-ended only.

Return ONLY a raw JSON array of exactly ${totalQuestions} question strings. No markdown. No explanation.
Example: ["Question 1", "Question 2", "Question 3"]
`;

  try {
    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      response_format: { type: "json_object" },
    });

    const raw = completion.choices[0]?.message?.content;
    if (!raw) throw new Error("No content from AI");

    const parsed = JSON.parse(raw);
    // Handle both { questions: [...] } and direct array formats
    const questions = Array.isArray(parsed) ? parsed : parsed.questions || Object.values(parsed)[0];

    if (!Array.isArray(questions) || questions.length === 0) {
      throw new Error("AI returned invalid questions format");
    }

    // Trim to requested count
    const result = questions.slice(0, totalQuestions);
    questionCache.set(cacheKey, result);

    console.log(`[MockInterview] Cache MISS — generated & cached questions for: ${cacheKey}`);
    return result;
  } catch (error) {
    console.error("[MockInterview] Error generating questions:", error);
    throw new Error("Failed to generate interview questions.");
  }
};

// ─── Evaluate Answer ───────────────────────────────────────────────────────────
export const evaluateAnswer = async ({ question, answer, category }) => {
  const prompt = `
You are a strict but fair technical interviewer evaluating a candidate's answer.

Category: ${category}
Question: ${question}
Candidate's Answer: ${answer}

Evaluate the answer on a scale of 1-10 for each dimension.
Return ONLY a raw JSON object (no markdown) with this exact structure:
{
  "feedback": "2-3 sentence overall assessment of the answer",
  "improvements": ["Specific improvement tip 1", "Specific improvement tip 2"],
  "scores": {
    "technicalAccuracy": <number 1-10>,
    "communication": <number 1-10>,
    "confidence": <number 1-10>,
    "overall": <number 1-10>
  }
}

Be honest. If the answer is incorrect or incomplete, say so clearly.
`;

  try {
    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
      temperature: 0.3,
      response_format: { type: "json_object" },
    });

    const raw = completion.choices[0]?.message?.content;
    if (!raw) throw new Error("No evaluation content from AI");

    return JSON.parse(raw);
  } catch (error) {
    console.error("[MockInterview] Error evaluating answer:", error);
    throw new Error("Failed to evaluate answer.");
  }
};

// ─── Generate Final Summary ────────────────────────────────────────────────────
export const generateFinalSummary = async ({ category, difficulty, answersData, overallScore }) => {
  const qaText = answersData
    .map((a, i) => `Q${i + 1}: ${a.question}\nAnswer: ${a.answer}\nScore: ${a.scores?.overall}/10`)
    .join("\n\n");

  const prompt = `
You are a senior technical interviewer providing a final summary of a mock interview.

Category: ${category}
Difficulty: ${difficulty}
Overall Score: ${overallScore}/10

Interview Q&A:
${qaText}

Based on this performance, return ONLY a raw JSON object (no markdown) with this structure:
{
  "strengths": ["Strength 1", "Strength 2", "Strength 3"],
  "weaknesses": ["Weakness 1", "Weakness 2", "Weakness 3"],
  "summary": "2-3 sentence overall performance summary"
}
`;

  try {
    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
      temperature: 0.4,
      response_format: { type: "json_object" },
    });

    const raw = completion.choices[0]?.message?.content;
    if (!raw) throw new Error("No summary content from AI");

    return JSON.parse(raw);
  } catch (error) {
    console.error("[MockInterview] Error generating final summary:", error);
    throw new Error("Failed to generate interview summary.");
  }
};
