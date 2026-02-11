const backendDomain = "http://localhost:5050"

const summaryApi = {
    signUp : {
        url : `${backendDomain}/api/signup`,
        method : "post",
    },
    login : {
        url : `${backendDomain}/api/login`,
        method : "post",
    },
    authUserDetails : {
        url : `${backendDomain}/api/user-details`,
        method : "get",
    },
    chatFriends : {
        url : `${backendDomain}/api/chat-friends`,
        method : "get",
    },
    sendMessage : {
        url : `${backendDomain}/api/send-message`,
        method : "post",
    },
    getMessage : {
        url : `${backendDomain}/api/get-messages`,
        method : "get",
    },
    userLogout : {
        url : `${backendDomain}/api/user-logout`,
        method : "get",
    },
    getConversations : {
        url : `${backendDomain}/api/get-conversations`,
        method : "get",
    },
    askAI : {
        url : `${backendDomain}/api/ai/ask`,
        method : "post",
    },
    getTutors : {
        url : `${backendDomain}/api/tutors`,
        method : "get",
    },
    chatHistory : {
        url : `${backendDomain}/api/chat-history`,
        method : "get",
    },
    getAiMessages : {
        url : `${backendDomain}/api/get-ai-messages`,
        method : "get",
    },
    getChatPdf : {
        url : `${backendDomain}/api/pdf`,
        method : "get",
    },
    deleteConversation : {
        url : `${backendDomain}/api/delete-conversation`,
        method : "delete",
    },
    forget_password : {
        url : `${backendDomain}/api/forget-password`,
        method : "post",
    },
    verify_password : {
        url : `${backendDomain}/api/verify-password`,
        method : "post",
    },
    new_password : {
        url : `${backendDomain}/api/new-password`,
        method : "put",
    },
}

export default summaryApi;

