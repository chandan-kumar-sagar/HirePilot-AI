import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { aiLimiter } from "../middlewares/rateLimit.middleware.js";
import { getRecommendations } from "../controllers/recommendation.controller.js";

const router = express.Router();

// Apply auth middleware to all routes
router.use(protect);

// Apply strict AI rate limit (e.g. 10 req/min)
router.post("/", aiLimiter, getRecommendations);

export default router;
