import { z } from "zod";

export const analyzeResumeSchema =
  z.object({
    resumeId: z.string().min(1),
  });