import express from 'express';
import userSignUpController from '../controller/userSignUp.js';
import userLoginController from '../controller/userLogin.js';
import authUserDetailsController from '../controller/authUserDetails.js';
import { authToken } from '../middleware/authToken.js';
import fetchChatFriendsController from '../controller/chatFriends.js';
import sendMessageController from '../controller/sendMessage.js';
import getMessageController from '../controller/getMessage.js';
import logoutController from '../controller/userLogout.js';
import getConversationsController from '../controller/getConversations.js';


const router = express.Router();

router.post("/signup", userSignUpController)
router.post("/login", userLoginController)
router.get("/user-details", authToken , authUserDetailsController)
router.get("/chat-friends", authToken , fetchChatFriendsController)
router.get("/user-logout", logoutController);

router.post("/send-message/:id", authToken, sendMessageController)
router.get("/get-messages/:id", authToken, getMessageController)
router.get("/get-conversations", authToken, getConversationsController)

export default router
