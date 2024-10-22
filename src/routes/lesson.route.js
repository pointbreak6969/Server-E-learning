import { upload } from "../middlewares/mutler.middleware.js";
import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createLesson } from "../controllers/lesson.controller.js";

const router = Router();
router
  .route("/createLesson/:unitId")
  .post(verifyJWT, upload.single("lessonVideo"), createLesson);
export default router;