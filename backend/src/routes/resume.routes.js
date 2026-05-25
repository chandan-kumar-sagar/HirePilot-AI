import express from "express";

import { protect } from "../middlewares/auth.middleware.js";

import { upload } from "../middlewares/upload.middleware.js";

import { uploadResume } from "../controllers/resume.controller.js";

const router = express.Router();

router.post(
  "/data/uploadResume",
  protect,
  upload.single("resume"),
  uploadResume
);

export default router;