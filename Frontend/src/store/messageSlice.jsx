import { createSlice } from "@reduxjs/toolkit";

const EMPTY_ARRAY = [];

const initialState = {
  conversation: {},
};

export const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setMessages: (state, action) => {
      const messages = action.payload;
      state.conversation = {}

      messages.forEach((msg) => {
        const convId = msg.conversationId;

        if (!state.conversation[convId]) {
          state.conversation[convId] = [];
        }

        state.conversation[convId].push(msg);
      })
      
    },
    addMessage: (state, action) => {
       const msg = action.payload;
      const convId = msg.conversationId;

      if (!state.conversation[convId]) {
        state.conversation[convId] = [];
      }

      state.conversation[convId].push(msg);
    },
  },
});

export const { setMessages, addMessage } = messageSlice.actions;

export const selectMessages = (conversationId) => (state) => state.messages.conversation[conversationId] ?? EMPTY_ARRAY;

export default messageSlice.reducer;


