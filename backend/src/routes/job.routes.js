import express from "express";

import { protect } from "../middlewares/auth.middleware.js";

import * as jobcontroller from "../controllers/job.controller.js";

const router = express.Router();

router.post("/data/createJob",protect,jobcontroller.createJob);

router.get("/data/getAllJobs",protect,jobcontroller.getAllJobs);

router.get("/data/getJobStats",protect,jobcontroller.getJobStats);

router.get("/data/getJobById/:id",protect,jobcontroller.getJobById);

router.patch("/data/updateJobStatus",protect,jobcontroller.updateJobStatus);

router.delete("/data/deleteJob/:id",protect,jobcontroller.deleteJob);


export default router;