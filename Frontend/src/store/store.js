import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice.jsx'
import conversationReducer from './conversationSlice.jsx'
import messagesReducer from './messageSlice.jsx'

export const store =  configureStore({
    reducer : {
        user : userReducer,
        conversation : conversationReducer,
        messages : messagesReducer,
    }
})
