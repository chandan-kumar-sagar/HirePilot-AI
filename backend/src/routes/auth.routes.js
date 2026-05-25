import express from "express";

import * as usercontroller from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";


const router = express.Router();

router.post("/register", usercontroller.registerUser);

router.post("/login", usercontroller.loginUser);

router.get("/data/getCurrentUser", protect, usercontroller.getCurrentUser);

export default router;