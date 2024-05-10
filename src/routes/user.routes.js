import Router from 'express';
import { registerUser } from '../controllers/user.controller.js';
import {verifyJWT} from "../middlewares/auth.middleware.js";
import {upload} from "../middlewares/mutler.middleware.js"
const router = Router();

router.route("/register").post(registerUser);

export default router;