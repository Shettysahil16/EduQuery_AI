import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedConversation : null
}

export const conversationSlice = createSlice({
    name : 'conversation',
    initialState,
    reducers : {
        setSelectedConversation : (state, action) => {
            state.selectedConversation = action.payload
        },

        clearSelectedConversation : (state) => {
            state.selectedConversation = null
        },
    },
});

export const { setSelectedConversation, clearSelectedConversation } = conversationSlice.actions;

export const selectedConversation = (state) => state.conversation.selectedConversation

export default conversationSlice.reducer;