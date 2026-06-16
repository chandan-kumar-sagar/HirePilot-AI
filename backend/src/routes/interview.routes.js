import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import * as interviewController from "../controllers/interview.controller.js";

const router = express.Router();

router.post("/data/generate", protect,interviewController.createInterviewQuestions);
router.get("/", protect, interviewController.getAllInterviews);
router.get("/:id", protect, interviewController.getInterviewById);
router.delete("/:id", protect, interviewController.deleteInterview);

export default router;