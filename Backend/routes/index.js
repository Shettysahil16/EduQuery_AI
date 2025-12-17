import express from 'express';
import userSignUpController from '../controller/userSignUp.js';
const router = express.Router();

router.post("/signup", userSignUpController)

export default router