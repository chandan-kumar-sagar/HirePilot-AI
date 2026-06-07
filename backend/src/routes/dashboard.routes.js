import express from "express";

import { protect } from "../middlewares/auth.middleware.js";

import * as dashboardController from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get("/data/dashboardStats", protect, dashboardController.getDashboardStats);
router.get("/data/recentActivity", protect, dashboardController.getRecentActivity);

export default router;