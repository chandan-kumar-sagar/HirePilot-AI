import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import * as coverLetterController from "../controllers/coverLetter.controller.js";

const router = express.Router();

router.post("/data/generateCoverLetter", protect, coverLetterController.createCoverLetter);
router.get("/data/getAllCoverLetters", protect, coverLetterController.getAllCoverLetters);
router.get("/data/getCoverLetterById/:id", protect, coverLetterController.getCoverLetterById);
router.delete("/data/deleteCoverLetter/:id", protect, coverLetterController.deleteCoverLetter);

export default router;