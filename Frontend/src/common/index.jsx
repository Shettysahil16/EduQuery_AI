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
}

export default summaryApi;

