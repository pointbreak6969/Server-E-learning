import Router from "express";
import { uploadVideo } from "../controllers/video.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/mutler.middleware.js";
const router = Router();
router
  .route("/uploadVideo")
  .post(verifyJWT, upload.single("video"), uploadVideo);

export default router;