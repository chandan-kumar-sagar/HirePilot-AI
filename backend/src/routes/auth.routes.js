import express from "express";

import * as usercontroller from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import * as validation from "../validations/auth.validation.js";


const router = express.Router();

router.post("/register", validate(validation.registerSchema), usercontroller.registerUser);

router.post("/login", validate(validation.loginSchema), usercontroller.loginUser);

router.get("/data/getCurrentUser", protect, usercontroller.getCurrentUser);

export default router;