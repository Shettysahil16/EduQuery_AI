import express from 'express';
import userSignUpController from '../controller/userSignUp.js';
import userLoginController from '../controller/userLogin.js';
import authUserDetailsController from '../controller/authUserDetails.js';
import { authToken } from '../middleware/authToken.js';
import fetchChatFriendsController from '../controller/chatFriends.js';
import sendMessageController from '../controller/sendMessage.js';
import getMessageController from '../controller/getMessage.js';


const router = express.Router();

router.post("/signup", userSignUpController)
router.post("/login", userLoginController)
router.get("/user-details", authToken , authUserDetailsController)
router.get("/chat-friends", authToken , fetchChatFriendsController)

router.post("/send-message/:id", authToken, sendMessageController)
router.get("/get-messages/:id", authToken, getMessageController)

export default router
