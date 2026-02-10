import React, { useState, useRef, useEffect } from "react";
import SendIcon from "../assets/icons/message_send_icon.svg?react";
import StopIcon from "../assets/icons/stop-circle-svgrepo-com.svg?react";
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
  const [isGenerating, setIsGenerating] = useState(false); // New state
  const abortControllerRef = useRef(null);

  const isDisabled = !question.trim();
  const tempConversationIdRef = useRef(null);

  // Focus input on mount
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const handleStopStreaming = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsGenerating(false);
    }
  };

  const handleAskQuestion = async (e) => {
  if (e) e.preventDefault();
  if (isDisabled || isGenerating) return;

  abortControllerRef.current = new AbortController();
  setIsGenerating(true);

  const currentQuestion = question;
  setQuestion("");

  if (!conversationId && !tempConversationIdRef.current) {
    tempConversationIdRef.current = `temp-${Date.now()}`;
  }
  const convIdToUse = conversationId || tempConversationIdRef.current;

  const tempUserId = Date.now();
  const tempAIId = tempUserId + 1;

  dispatch(addMessage({
    _id: tempUserId,
    conversationId: convIdToUse,
    role: "user",
    content: currentQuestion,
    createdAt: new Date().toISOString(),
  }));

  dispatch(addMessage({
    _id: tempAIId,
    conversationId: convIdToUse,
    role: "ai",
    content: "",
    streaming: true,
  }));

  let fullAnswer = "";
  let aborted = false;

  try {
    const response = await fetch(summaryApi.askAI.url, {
      method: summaryApi.askAI.method,
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      signal: abortControllerRef.current.signal,
      body: JSON.stringify({
        question: currentQuestion,
        tutorId,
        conversationId: convIdToUse,
      }),
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let activeConvId = convIdToUse;
    let firstJsonReceived = false;

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      const lines = buffer.split("\n\n");
      buffer = lines.pop();

      for (const line of lines) {
        if (!line.startsWith("data:")) continue;

        const jsonStr = line.replace("data:", "").trim();
        if (jsonStr === "[DONE]") continue;

        const data = JSON.parse(jsonStr);
        firstJsonReceived = true;

        if (data.conversationId && !conversationId) {
          activeConvId = data.conversationId;
          onConversationCreated?.(activeConvId);
          navigate(`/chats/${activeConvId}`, { replace: true });
          dispatch(incrementNewConversation());

          dispatch(updateMessageStatus({
            convId: convIdToUse,
            tempId: tempUserId,
            messageId: tempUserId,
            updates: { conversationId: activeConvId },
          }));

          dispatch(updateMessageStatus({
            convId: convIdToUse,
            tempId: tempAIId,
            messageId: tempAIId,
            updates: { conversationId: activeConvId },
          }));
        }

        if (data.token) {
          fullAnswer += data.token;

          dispatch(addMessage({
            _id: tempAIId,
            conversationId: activeConvId,
            role: "ai",
            content: data.token,
            append: true,
            streaming: true,
          }));
        }

        if (data.done) {
          setIsGenerating(false);
          dispatch(updateMessage({
            _id: tempAIId,
            conversationId: activeConvId,
            content: fullAnswer,
            streaming: false,
          }));
        }
      }
    }
  } catch (err) {
    if (err.name === "AbortError") {
      aborted = true;
      console.log("User aborted the stream");
    } else {
      console.error("Error fetching AI response:", err);
    }
  } finally {
    setIsGenerating(false);
    abortControllerRef.current = null;

    // ❌ DO NOT overwrite on abort
    if (!aborted && !fullAnswer) {
      dispatch(updateMessage({
        _id: tempAIId,
        conversationId: convIdToUse,
        content: "Error: Failed to get response",
        streaming: false,
      }));
    }
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
        placeholder={isGenerating ? "AI is typing..." : "Ask anything"}
      />
      {isGenerating ? (
        <StopIcon 
            onClick={handleStopStreaming}
            className='w-8 h-auto transition-all cursor-pointer fill-Quinary hover:scale-105'/>
      ) : (
        <SendIcon
          className={`w-8 h-auto transition-all ${
            isDisabled ? "fill-slate-400 opacity-50" : "cursor-pointer fill-Quinary hover:scale-105"
          }`}
          onClick={!isDisabled ? handleAskQuestion : undefined}
        />
      )}
    </div>
  );
};

export default Prompt;


