import groq from "../../config/groq.js";

export const generateCoverLetter =
  async ({
    resumeText,
    companyName,
    jobTitle,
    jobDescription,
  }) => {
    const prompt = `
Create a professional cover letter.

Company: ${companyName}

Job Title: ${jobTitle}

Job Description:
${jobDescription}

Candidate Resume:
${resumeText}

Return only the cover letter text.
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