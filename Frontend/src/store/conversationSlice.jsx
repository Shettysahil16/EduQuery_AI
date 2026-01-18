import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedConversation: null,
  conversationId: null,
};

export const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    setSelectedConversation: (state, action) => {
      state.selectedConversation = action.payload;
    },

    setConversationId: (state, action) => {
      state.conversationId = action.payload;
    },

    clearSelectedConversation: (state) => {
      state.selectedConversation = null;
    },
  },
});

export const { setSelectedConversation, clearSelectedConversation, setConversationId } =
  conversationSlice.actions;

export const selectedConversation = (state) =>
  state.conversation.selectedConversation;

export const selectedConversationId = (state) =>
  state.conversation.selectedConversation;

export default conversationSlice.reducer;
