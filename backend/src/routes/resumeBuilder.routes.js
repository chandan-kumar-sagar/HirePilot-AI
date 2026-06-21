import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { aiLimiter } from "../middlewares/rateLimit.middleware.js";
import {
  generateResume,
  saveResume,
  getUserResumes,
  getResumeById,
  deleteResume,
} from "../controllers/resumeBuilder.controller.js";

const router = express.Router();

router.use(protect); // All routes require authentication

router.post("/generate", aiLimiter, generateResume);
router.post("/", saveResume);
router.get("/", getUserResumes);
router.get("/:id", getResumeById);
router.delete("/:id", deleteResume);

export default router;
