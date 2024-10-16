import Router from 'express';
import { registerUser, loginUser, setUpUserProfile, logoutUser, refreshAccessToken, changeCurrentPassword, getCurrentUser } from '../controllers/user.controller.js';
import {verifyJWT} from "../middlewares/auth.middleware.js";
import {upload} from "../middlewares/mutler.middleware.js"
const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser)
router.route("/userProfile").post(verifyJWT, upload.single("avatar") ,setUpUserProfile)
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refreshToken").post(refreshAccessToken);
router.route("/changePassword").patch(verifyJWT, changeCurrentPassword);
router.route("/me").get(verifyJWT, getCurrentUser);
export default router;