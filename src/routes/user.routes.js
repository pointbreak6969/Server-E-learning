import Router from 'express';
import { registerUser, loginUser, setUpUserProfile, logOutUser } from '../controllers/user.controller.js';
import {verifyJWT} from "../middlewares/auth.middleware.js";
import {upload} from "../middlewares/mutler.middleware.js"
const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser)
router.route("/userProfile").post(verifyJWT, upload.single("avatar") ,setUpUserProfile)
router.route("/logoutUser").post(verifyJWT, logOutUser);
export default router;