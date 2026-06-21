import groq from "../../config/groq.js";

export const generateResumeWithAI = async ({ jobTitle, yearsOfExperience, techStack }) => {
  const prompt = `
You are an expert technical recruiter and resume writer. 
Generate a highly professional, ATS-friendly software engineering resume based on the following details:

Job Title: ${jobTitle}
Years of Experience: ${yearsOfExperience}
Tech Stack: ${techStack.join(", ")}

The output must be formatted as a pure JSON object (no markdown, no markdown formatting like \`\`\`json, just the raw JSON object) matching the following exact structure:

{
  "professionalSummary": "A powerful 3-4 sentence professional summary focusing on engineering impact, scalable architecture, and achievements using the provided tech stack.",
  "skills": ["Skill 1", "Skill 2", "Skill 3"],
  "experience": [
    {
      "role": "Same as Job Title or relevant senior role",
      "company": "Tech Company Inc.",
      "duration": "Duration covering the specified years of experience",
      "responsibilities": [
        "Action-oriented bullet point 1 using STAR method (Situation, Task, Action, Result). Mention metrics.",
        "Bullet point 2 focusing on system architecture or optimization.",
        "Bullet point 3 focusing on collaboration or leadership."
      ]
    }
  ],
  "projects": [
    {
      "title": "Enterprise Scale Project Name",
      "url": "github.com/username/project",
      "description": "Brief 1-sentence description of the project.",
      "technologies": ["Tech 1", "Tech 2"],
      "highlights": [
        "Key achievement 1",
        "Key achievement 2"
      ]
    }
  ],
  "education": [
    {
      "degree": "Bachelor of Science in Computer Science",
      "institution": "University Name",
      "year": "Graduation Year"
    }
  ]
}

Focus heavily on making the bullets sound like a top-tier software engineer. Use strong action verbs (Architected, Spearheaded, Optimized, Engineered). Keep it completely realistic and directly relevant to the provided tech stack.
`;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
      temperature: 0.3,
      response_format: { type: "json_object" },
    });

    const responseContent = chatCompletion.choices[0]?.message?.content;
    
    if (!responseContent) {
      throw new Error("AI did not return any content.");
    }

    return JSON.parse(responseContent);
  } catch (error) {
    console.error("Error generating resume with AI:", error);
    throw new Error("Failed to generate resume content.");
  }
};
