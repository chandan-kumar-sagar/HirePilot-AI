import fs from "fs";
import { PDFParse } from "pdf-parse";

export const extractResumeText = async (filePath) => {
  try {
    const pdfBuffer = fs.readFileSync(filePath);
    const parser = new PDFParse({ data: pdfBuffer });
    const result = await parser.getText();
    const text = result.text || "";
    await parser.destroy();
    
    // PDFs often contain massive garbage strings. 
    // Truncate to 15,000 chars (~3,000 tokens) to stay safely under Groq's 12k TPM limit
    return text.trim().substring(0, 15000);
  } catch (error) {
    console.error("Resume Parsing Error:", error);
    throw error;
  }
};
