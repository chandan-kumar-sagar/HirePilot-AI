import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import * as jobMatchController from "../controllers/jobMatch.controller.js";

const router = express.Router();

router.post("/data/generateJobMatch", protect, jobMatchController.createJobMatch);
router.get("/data/getAllJobMatches", protect, jobMatchController.getAllJobMatches);
router.get("/data/getJobMatchById/:id", protect, jobMatchController.getJobMatchById);
router.delete("/data/deleteJobMatch/:id", protect, jobMatchController.deleteJobMatch);

export default router;