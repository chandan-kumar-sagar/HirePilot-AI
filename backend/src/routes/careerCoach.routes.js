import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import * as careerCoachController from "../controllers/careerCoach.controller.js";

const router = express.Router();

router.post("/data/ask-advice", protect, careerCoachController.createCareerAdvice);
router.get("/data/getAllAdvice", protect, careerCoachController.getAllCareerAdvice);
router.delete("/data/deleteAdvice/:id", protect, careerCoachController.deleteCareerAdvice);

export default router;