import groq from "../../config/groq.js";

export const extractStructuredData = async (resumeText) => {
  try {
    const prompt = `
You are a Resume Parsing AI.

Extract the following structured data from the provided resume text.

Return ONLY valid JSON matching this schema exactly, with no additional formatting, markdown blocks, or text outside the JSON:

{
  "skills": ["skill1", "skill2"],
  "experience": [
    {
      "company": "Company Name",
      "role": "Job Title",
      "startDate": "YYYY-MM",
      "endDate": "YYYY-MM or Present",
      "description": "Brief description of responsibilities and achievements"
    }
  ],
  "education": [
    {
      "institution": "University/School Name",
      "degree": "Degree Name",
      "fieldOfStudy": "Major/Field",
      "startDate": "YYYY-MM",
      "endDate": "YYYY-MM or Present"
    }
  ]
}

If any section or field is missing in the resume, return an empty array for lists, or an empty string for text fields.

Resume Text:

${resumeText}
`;

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.1,
    });

    let content = response.choices[0].message.content;
    content = content.replace(/```json\n?|\n?```/g, "").trim();
    
    return JSON.parse(content);
  } catch (error) {
    console.error("Structured Data Extraction Error:", error);
    // Return empty fallback structure if AI fails
    return {
      skills: [],
      experience: [],
      education: [],
    };
  }
};
