import express from "express";

import { protect } from "../middlewares/auth.middleware.js";

import * as profileController from "../controllers/userProfile.controller.js";
import * as validation from "../validations/profile.validation.js";
import { validate } from "../middlewares/validate.middleware.js";

const router = express.Router();

router.get("/data/get-profile", protect, profileController.getProfile);

router.put("/data/update-profile", protect, validate(validation.updateProfileSchema), profileController.updateProfile);

router.put("/data/update-skills", protect, validate(validation.updateSkillsSchema), profileController.updateSkills);

router.put("/data/update-experience", protect, validate(validation.updateExperienceSchema), profileController.updateExperienceLevel);


export default router;