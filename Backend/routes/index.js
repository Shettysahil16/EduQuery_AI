import express from 'express';
import userSignUpController from '../controller/Users/userSignUp.js';
import userLoginController from '../controller/Users/userLogin.js';
import authUserDetailsController from '../controller/Users/authUserDetails.js';
import fetchChatFriendsController from '../controller/Users/chatFriends.js';
import logoutController from '../controller/Users/userLogout.js';
import sendMessageController from '../controller/Messages/sendMessage.js';
import getMessageController from '../controller/Messages/getMessage.js';
import getConversationsController from '../controller/Messages/getConversations.js';
import { authToken } from '../middleware/authToken.js';
import { askAIController } from '../controller/AI/askAI.js';
import { getTutorsController } from '../controller/AI/getTutors.js';
import { getAiConversationsController } from '../controller/AI/getConversations.js';
import { getAiMessagesController } from '../controller/AI/getMessages.js';
import { chatPdfController } from '../controller/chatPdf.js';
import { deleteConversationController } from '../controller/AI/deleteConversation.js';
import { sendVerificationCodeController } from '../controller/Password/sendVerificationCode.js';
import { verifyVerificationCodeController } from '../controller/Password/verifyVerificationCode.js';
import { setNewPasswordController } from '../controller/Password/newPassword.js';


const router = express.Router();

//Users
router.post("/signup", userSignUpController)
router.post("/login", userLoginController)
router.get("/user-details", authToken , authUserDetailsController)
router.get("/chat-friends", authToken , fetchChatFriendsController)
router.get("/user-logout", logoutController);

//Chat Messages
router.post("/send-message", authToken, sendMessageController)
router.get("/get-messages/:id", authToken, getMessageController)
router.get("/get-conversations", authToken, getConversationsController)

//Ai Messages
router.post("/ai/ask", authToken, askAIController)
router.get("/tutors", authToken, getTutorsController)
router.get("/chat-history", authToken, getAiConversationsController)
router.get("/get-ai-messages/:id", authToken, getAiMessagesController)
router.delete("/delete-conversation", authToken, deleteConversationController)

//Pdf Convertion
router.get("/pdf/:conversationId", authToken, chatPdfController);

//Froget Password
router.post("/forget-password", sendVerificationCodeController);
router.post("/verify-password", verifyVerificationCodeController);
router.put("/new-password", setNewPasswordController);


export default router
