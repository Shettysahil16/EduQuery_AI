import express from 'express';
import userSignUpController from '../controller/userSignUp.js';
import userLoginController from '../controller/userLogin.js';
import authUserDetailsController from '../controller/authUserDetails.js';
import { authToken } from '../middleware/authToken.js';


const router = express.Router();

router.post("/signup", userSignUpController)
router.post("/login", userLoginController)
router.get("/user-details", authToken ,authUserDetailsController)

export default router