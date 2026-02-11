// store/conversationSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  counter: 0, // increments whenever a new conversation is created
};

const newConversationSlice = createSlice({
  name: "newConversation",
  initialState,
  reducers: {
    incrementNewConversation: (state) => {
      state.counter += 1;
    },
  },
});

export const { incrementNewConversation } = newConversationSlice.actions;
export const selectNewConversationCounter = (state) =>
  state.newConversation.counter;

export default newConversationSlice.reducer;
