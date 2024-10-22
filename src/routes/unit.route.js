import { createUnit } from "../controllers/unit.controller.js";
import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
router
  .route("/createUnit/:courseId")
  .post(verifyJWT, createUnit);
export default router;
