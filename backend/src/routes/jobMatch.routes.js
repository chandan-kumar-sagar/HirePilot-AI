import express from "express";

import { protect } from "../middlewares/auth.middleware.js";

import * as jobMatchController from "../controllers/jobMatch.controller.js";

const router = express.Router();

router.post("/data/generateJobMatch",protect,jobMatchController.createJobMatch);

export default router;