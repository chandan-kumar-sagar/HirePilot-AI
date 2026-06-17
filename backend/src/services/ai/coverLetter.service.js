import groq from "../../config/groq.js";

export const generateCoverLetter = async ({
  resumeText,
  companyName,
  jobTitle,
  jobDescription,
}) => {
  const isGeneral = !companyName && !jobTitle && !jobDescription;

  const prompt = isGeneral
    ? `
Create a professional, general-purpose cover letter for the following candidate based on their resume.
The cover letter should highlight their key skills, experiences, and overall value proposition.
It should be adaptable so the candidate can use it for various job applications in their field.

Candidate Resume:
${resumeText}

Return only the cover letter text.
`
    : `
Create a professional cover letter.

Company: ${companyName || "Any Company"}

Job Title: ${jobTitle || "Any Role"}

Job Description:
${jobDescription || "Not provided."}

Candidate Resume:
${resumeText}

Return only the cover letter text.
`;

  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.5,
  });

  return response.choices[0].message.content;
};