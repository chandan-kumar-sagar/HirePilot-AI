import express from "express";

import { protect } from "../middlewares/auth.middleware.js";

import { upload, handleUploadError } from "../middlewares/upload.middleware.js";

import * as resumeController from "../controllers/resume.controller.js";

const router = express.Router();

router.post("/data/uploadResume", protect, upload.single("resume"), handleUploadError, resumeController.uploadResume);

router.post("/data/resume-analyze",protect,resumeController.analyzeResume);

router.get("/data/getAllResumes",protect,resumeController.getAllResumes);

router.get("/data/getResumeById/:id",protect,resumeController.getResumeById);

router.delete("/data/deleteResume/:id",protect,resumeController.deleteResume);

export default router;