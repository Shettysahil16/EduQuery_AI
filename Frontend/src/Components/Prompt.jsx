import React, { useState, useRef, useEffect } from "react";
import SendIcon from "../assets/icons/message_send_icon.svg?react";
import summaryApi from "../common";
import { useDispatch } from "react-redux";
import {
  addMessage,
  updateMessage,
  updateMessageStatus,
} from "../store/messageSlice";
import { incrementNewConversation } from "../store/newConversation";
import { useNavigate } from "react-router-dom";

const Prompt = ({ conversationId, onConversationCreated, tutorId }) => {
  const [question, setQuestion] = useState("");
  const dispatch = useDispatch();
  const textareaRef = useRef(null);
  const navigate = useNavigate();

  const isDisabled = !question.trim();
  const tempConversationIdRef = useRef(null);

  // Focus input on mount
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const handleAskQuestion = async (e) => {
    if (e) e.preventDefault();
    if (isDisabled) return;

    const currentQuestion = question;
    setQuestion(""); // Clear input immediately

    // Create a temp conversation ID if needed
    if (!conversationId && !tempConversationIdRef.current) {
      tempConversationIdRef.current = `temp-${Date.now()}`;
    }
    const convIdToUse = conversationId || tempConversationIdRef.current;

    // Temporary IDs for user and AI messages
    const tempUserId = Date.now();
    const tempAIId = tempUserId + 1;

    // Add the user message
    dispatch(
      addMessage({
        _id: tempUserId,
        conversationId: convIdToUse,
        role: "user",
        content: currentQuestion,
        createdAt: new Date().toISOString(),
      }),
    );

    // Add an empty AI message for streaming
    dispatch(
      addMessage({
        _id: tempAIId,
        conversationId: convIdToUse,
        role: "ai",
        content: "",
        streaming: true,
      }),
    );

    try {
      const response = await fetch(summaryApi.askAI.url, {
        method: summaryApi.askAI.method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: currentQuestion,
          tutorId,
          conversationId: convIdToUse,
        }),
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let fullAnswer = "";
      let activeConvId = convIdToUse;
      let firstJsonReceived = false; // Track first valid JSON

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        // Split by SSE double newline
        const lines = buffer.split("\n\n");
        buffer = lines.pop(); // keep last incomplete line

        for (const line of lines) {
          if (!line.startsWith("data:")) continue;

          const jsonStr = line.replace("data:", "").trim();
          if (jsonStr === "[DONE]") continue;

          try {
            const data = JSON.parse(jsonStr);
            firstJsonReceived = true;

            // Replace temp conversation ID with real one on first chunk
            if (data.conversationId && !conversationId) {
              activeConvId = data.conversationId;
              onConversationCreated?.(activeConvId);

              navigate(`/chats/${activeConvId}`, { replace: true });

              dispatch(incrementNewConversation());

              dispatch(
                updateMessageStatus({
                  convId: convIdToUse,
                  tempId: tempUserId,
                  messageId: tempUserId,
                  updates: { conversationId: activeConvId },
                }),
              );
              dispatch(
                updateMessageStatus({
                  convId: convIdToUse,
                  tempId: tempAIId,
                  messageId: tempAIId,
                  updates: { conversationId: activeConvId },
                }),
              );
            }

            // Append token for streaming
            if (data.token) {
              fullAnswer += data.token;
              dispatch(
                addMessage({
                  _id: tempAIId,
                  conversationId: activeConvId,
                  role: "ai",
                  content: data.token,
                  append: true,
                  streaming: true,
                }),
              );
            }

            // Mark streaming complete
            if (data.done) {
              dispatch(
                updateMessage({
                  _id: tempAIId,
                  conversationId: activeConvId,
                  content: fullAnswer,
                  streaming: false,
                }),
              );
            }
          } catch (err) {
            if (!firstJsonReceived) {
              // Ignore partial or junk data at the very start
              continue;
            }
            console.error("Error parsing SSE chunk", err);
          }
        }
      }
    } catch (err) {
      console.error("Error fetching AI response:", err);
      dispatch(
        updateMessage({
          _id: tempAIId,
          conversationId: convIdToUse,
          content: "Error: Failed to get response",
          streaming: false,
        }),
      );
    }
  };

  const autoResizeTextarea = () => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`; // max ~5 lines
  };

  return (
    <div className="bg-Octonary w-full flex justify-center items-center text-white rounded-xl px-4 overflow-hidden">
      <textarea
        ref={textareaRef}
        rows={1}
        value={question}
        onChange={(e) => {
          setQuestion(e.target.value);
          autoResizeTextarea();
        }}
        className="w-full resize-none overflow-y-auto outline-none flex items-center py-4 pr-1 justify-center bg-transparent leading-5 scrollbar-custom"
        placeholder="Ask anything"
      />

      <SendIcon
        className={`w-8 h-auto transition-all ${
          isDisabled
            ? "fill-slate-400 opacity-50"
            : "cursor-pointer fill-Quinary hover:scale-105"
        }`}
        onClick={!isDisabled ? handleAskQuestion : undefined}
      />
    </div>
  );
};

export default Prompt;
