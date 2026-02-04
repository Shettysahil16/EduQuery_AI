import React from "react";
import SendIcon from "../assets/icons/message_send_icon.svg?react";
import summaryApi from "../common";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addMessage } from "../store/messageSlice";
import { useRef } from "react";
import { useEffect } from "react";

const Prompt = ({ conversationId }) => {
  //console.log("conversationId in prompt", conversationId);

  const [question, setQuestion] = useState("");
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const isDisabled = !question.trim();

  
  const handleAskQuestion = async (e) => {
    const tempId = Date.now();

    e.preventDefault();

    if (!question.trim()) return;

    const payload = { question };
    if (conversationId) {
      payload.conversationId = conversationId;
    }
    dispatch(addMessage({
      _id : tempId,
      conversationId,
      role : 'user',
      content : question,
      createdAt: new Date().toISOString(),
    }));

    setQuestion("");

    const response = await fetch(summaryApi.askAI.url, {
      method: summaryApi.askAI.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const answer = await response.json();
    dispatch(addMessage(answer));
    
    console.log("answer", answer);
  };


  useEffect(() => {
    inputRef.current?.focus();
  }, []);


  return (
    <div className="h-14 bg-Octonary w-full flex justify-center items-center text-white rounded-full px-4">
      <input
      ref={inputRef}
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="h-full w-full rounded-full outline-none px-2"
        placeholder="Ask anything"
      />
      <SendIcon
        className={`w-8 h-auto transition-all ${isDisabled ? " fill-slate-400 opacity-50" : "cursor-pointer fill-Quinary hover:scale-105"}`}
        onClick={!isDisabled ? handleAskQuestion : undefined}
      />
    </div>
  );
};

export default Prompt;
