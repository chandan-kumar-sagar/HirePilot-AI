import groq from "../../config/groq.js";

export const generateInterviewQuestions =
  async (resumeText) => {
  const prompt = `
You are a Senior Technical Interviewer with 15+ years of experience at top tech companies.

Analyze the resume below and generate a comprehensive set of interview questions across multiple categories.

Return ONLY a valid JSON object with NO extra text, NO markdown, NO explanation.

Use exactly this structure:
{
  "nodejs": [],
  "javascript": [],
  "mysql": [],
  "postgresql": [],
  "mongodb": [],
  "react": [],
  "systemDesign": [],
  "behavioral": [],
  "llm": [],
  "hld": [],
  "lld": [],
  "deployments": [],
  "hrRound": []
}

Rules:
- Generate exactly 20 Node.js questions (async, event loop, streams, middleware, REST best practices)
- Generate exactly 20 JavaScript questions (closures, prototypes, promises, ES6+, event loop)
- Generate exactly 20 MySQL questions (joins, indexing, transactions, stored procedures, optimization)
- Generate exactly 20 PostgreSQL questions (JSONB, window functions, CTEs, indexing, performance)
- Generate exactly 20 MongoDB questions (aggregation, indexing, schema design, replication, sharding)
- Generate exactly 20 React questions (hooks, state management, performance, rendering, patterns)
- Generate exactly 20 System Design questions (scalability, load balancing, caching, CAP theorem, microservices)
- Generate exactly 20 Behavioral questions (STAR method, teamwork, conflict resolution, leadership, failure stories)
- Generate exactly 20 LLM/AI questions (prompt engineering, RAG, fine-tuning, embeddings, vector databases, LangChain, hallucination, token limits, model evaluation, AI safety)
- Generate exactly 20 High Level Design (HLD) questions (architecture patterns, API gateway, message queues, CDN, database selection, distributed systems, event-driven architecture)
- Generate exactly 20 Low Level Design (LLD) questions (OOP principles, design patterns, class diagrams, SOLID principles, data structures, algorithm complexity, code extensibility)
- Generate exactly 20 Deployments/DevOps questions (Docker, Kubernetes, CI/CD pipelines, GitHub Actions, Nginx, AWS/GCP/Azure, monitoring, logging, zero-downtime deployments)
- Generate exactly 20 HR Round questions (salary negotiation, career goals, why this company, work-life balance, strengths and weaknesses, job transitions, 5-year plan, team culture fit)

If a technology from the resume is not relevant to a category, still generate strong generic questions for that category.

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
        max_tokens: 32768,
      });

    let content = response.choices[0].message.content;
    content = content.replace(/```json\n?|\n?```/g, "").trim();
    return content;
  };