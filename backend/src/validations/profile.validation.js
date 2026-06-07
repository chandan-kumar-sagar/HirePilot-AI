import { z } from "zod";

export const updateProfileSchema = z.object({
    fullName: z.string().min(3).optional(),

    bio: z.string().max(500).optional(),

    linkedinUrl: z.string().url().optional().or(z.literal("")),

    githubUrl: z.string().url().optional().or(z.literal("")),

    portfolioUrl: z.string().url().optional().or(z.literal("")),

    targetRole: z.string().optional(),

    targetSalary: z.string().optional(),

    preferredLocation: z.string().optional(),
    
  });

export const updateSkillsSchema = z.object({
    skills: z.array(z.string()),
  });

export const updateExperienceSchema = z.object({
    experienceLevel: z.enum([
        "fresher",
        "junior",
        "mid",
        "senior",
      ]),
  });