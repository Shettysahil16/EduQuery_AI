import express from 'express';
import userSignUpController from '../controller/userSignUp.js';
import userLoginController from '../controller/userLogin.js';


const router = express.Router();

router.post("/signup", userSignUpController)
router.post("/login", userLoginController)

export default router