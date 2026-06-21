import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { aiLimiter } from "../middlewares/rateLimit.middleware.js";
import {
  startSession,
  submitAnswer,
  finishSession,
  getSessionHistory,
  getSessionDetails,
} from "../controllers/mockInterview.controller.js";

const router = express.Router();

// All routes require authentication
router.use(protect);

// AI routes — rate-limited
router.post("/start", aiLimiter, startSession);
router.post("/answer", aiLimiter, submitAnswer);
router.post("/finish", aiLimiter, finishSession);

// Non-AI routes — no rate limiting
router.get("/history", getSessionHistory);
router.get("/:id", getSessionDetails);

export default router;
