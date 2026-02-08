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

      if (!messages || messages.length === 0) return;

      const convId = messages[0].conversationId;

      if (!state.conversation[convId]) {
        state.conversation[convId] = [];
      }

      const existingIds = new Set(state.conversation[convId].map((m) => m._id));

      const newMessages = messages.filter((msg) => !existingIds.has(msg._id));

      // prepend batch (preserves order)
      state.conversation[convId] = [
        ...newMessages,
        ...state.conversation[convId],
      ];
    },
    addMessage: (state, action) => {
      const msg = action.payload;
      const convId = msg.conversationId;

      if (!state.conversation[convId]) {
        state.conversation[convId] = [];
      }

      const existing = state.conversation[convId].find(
        (m) => m._id === msg._id,
      );

      // 🔥 STREAM APPEND MODE
      if (existing && msg.append) {
        existing.content += msg.content || "";
        return;
      }

      // 🔹 UPDATE MODE (flags, status, ids, etc.)
      if (existing && !msg.append) {
        Object.assign(existing, msg);
        return;
      }

      state.conversation[convId].push(msg);
    },

    clearConversation: (state, action) => {
      const convId = action.payload;
      if (convId) {
        delete state.conversation[convId];
      }
    },

    updateMessage: (state, action) => {
      const { _id, conversationId, content, streaming } = action.payload;

      const messages = state.conversation[conversationId];
      if (!messages) return;

      const msg = messages.find((m) => m._id === _id);
      if (!msg) return;

      msg.content = content;

      if (streaming !== undefined) {
        msg.streaming = streaming;
      }
    },

    updateMessageStatus: (state, action) => {
      const { convId, tempId, messageId, updates } = action.payload;

      const messages = state.conversation[convId];
      if (!messages) return;

      const index = messages.findIndex(
        (m) => m._id === tempId || m._id === messageId,
      );

      if (index !== -1) {
        messages[index] = { ...messages[index], ...updates };
      }

      if (tempId && messageId) {
        messages[index]._id = messageId;
      }
    },
  },
});

export const {
  setMessages,
  addMessage,
  clearConversation,
  updateMessage,
  updateMessageStatus,
} = messageSlice.actions;

export const selectMessages = (conversationId) => (state) =>
  state.messages.conversation[conversationId] ?? EMPTY_ARRAY;

export default messageSlice.reducer;

{
  /*

  setMessages: (state, action) => {
      const messages = action.payload;
      //state.conversation = {}

      messages.forEach((msg) => {
        const convId = msg.conversationId;

        if (!state.conversation[convId]) {
          state.conversation[convId] = [];
        }

        const exists = state.conversation[convId].some(
          (m) => m._id === msg._id
        );
        if (!exists) {
          // Prepend older messages
          state.conversation[convId] = [msg, ...state.conversation[convId]];
        }
      });
    },
  
*/
}

