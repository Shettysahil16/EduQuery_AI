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
}

export default summaryApi;