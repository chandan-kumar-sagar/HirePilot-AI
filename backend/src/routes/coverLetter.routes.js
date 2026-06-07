import express from "express";

import { protect } from "../middlewares/auth.middleware.js";

import * as coverLetterController from "../controllers/coverLetter.controller.js";

const router = express.Router();

router.post("/data/generateCoverLetter",protect,coverLetterController.createCoverLetter);

export default router;