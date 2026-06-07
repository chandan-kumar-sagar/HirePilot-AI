import fs from "fs";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");

export const extractResumeText = async (filePath) => {
  try {
    const pdfBuffer = fs.readFileSync(filePath);
    const result = await pdfParse(pdfBuffer);
    return result.text;
  } catch (error) {
    console.error("Resume Parsing Error:", error);
    throw error;
  }
};
