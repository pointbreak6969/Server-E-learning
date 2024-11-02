import { createCourse , getUserCourse} from "../controllers/course.controller.js";
import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/mutler.middleware.js";

const router = Router();
router
  .route("/createCourse")
  .post(verifyJWT, upload.single("thumbnail"), createCourse);
  router.route("/getUserCourse").get(verifyJWT, getUserCourse)
export default router;
