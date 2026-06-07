export const cleanAiResponse = (
  response
) => {
  if (!response) return "";

  return response
    .replace(/```json/g, "")
    .replace(/```text/g, "")
    .replace(/```/g, "")
    .trim();
};

export const parseAiJson = (
  response
) => {
  try {
    const cleaned =
      cleanAiResponse(response);

    return JSON.parse(cleaned);
  } catch (error) {
    console.error(
      "AI JSON Parse Error:",
      error
    );

    return null;
  }
};