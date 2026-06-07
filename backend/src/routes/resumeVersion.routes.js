import express from "express";

import { protect } from "../middlewares/auth.middleware.js";

import * as resumeVersionController from "../controllers/resumeVersion.controller.js";

const router = express.Router();

router.post("/data/create-version", protect, resumeVersionController.createResumeVersion);

router.post("/data/versions", protect, resumeVersionController.getResumeVersions);

export default router;