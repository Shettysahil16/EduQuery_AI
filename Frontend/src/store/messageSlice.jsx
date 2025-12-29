import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    messages : [],
}

export const messageSlice = createSlice({
    name : 'messages',
    initialState,
    reducers :{
        setMessages : (state, action) => {
            state.messages = action.payload
        },
        addMessage : (state, action) => {
            state.messages.push(action.payload);
        }
    }
})

export const {setMessages, addMessage} = messageSlice.actions;

export const selectMessages = (state) => state.messages.messages ?? []

export default messageSlice.reducer;