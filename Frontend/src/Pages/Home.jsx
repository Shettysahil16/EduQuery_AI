import React, { useEffect, useRef, useState } from "react";
import Prompt from "../Components/Prompt";
import { useSelector, useDispatch } from "react-redux";
import { selectMessages, setMessages } from "../store/messageSlice";
import summaryApi from "../common";
import HistoryPageCard from "./HistoryPage/HistoryPageCard";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const dispatch = useDispatch();
  const messagesEndRef = useRef(null);
  console.log("conversationId", conversationId);

  // Get messages for current conversation
  const messages = useSelector((state) =>
    conversationId ? selectMessages(conversationId)(state) : [],
  );

  useEffect(() => {
    if (!conversationId) return;

    const fetchAiMessages = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${summaryApi.getAiMessages.url}/${conversationId}`,
          {
            method: summaryApi.getAiMessages.method,
            credentials: "include",
            headers: { "content-type": "application/json" },
          },
        );

        const result = await response.json();
        const existingTempMessages = messages.filter((msg) =>
          msg.conversationId.startsWith("temp-"),
        );

        dispatch(setMessages([...existingTempMessages, ...result.data]));
      } catch (error) {
        console.log("error fetching messages", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAiMessages();
  }, [conversationId, dispatch]);

  useEffect(() => {
    if (messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
    }
  }, [messages.length]);

  console.log("messages", messages);

  return (
    <div className="bg-Septenary h-screen w-full text-white flex flex-col overflow-hidden">
      {messages.length === 0 && !loading && (
        <div className="w-full h-full md:min-h-[40vh] flex flex-col gap-4 md:gap-10 justify-center items-center text-2xl md:text-3xl lg:text-5xl py-2">
          <div className="flex gap-4 text-5xl md:text-6xl lg:text-7xl font-bold bg-linear-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            <p className="capitalize w-fit">Ready when you are.</p>
          </div>
        </div>
      )}
      <div className="flex-1 overflow-y-auto scrollbar-custom">
        <div className="mx-auto w-full max-w-[60%] px-2  mb-16 flex flex-col gap-4">
          {messages.map((message) => {
            return (
              <HistoryPageCard
                message={message}
                key={message._id}
                loading={loading}
              />
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="h-16 w-full shrink-0 flex justify-center items-center pb-8 z-10">
        <div className="w-full max-w-[60%] px-2">
          <Prompt
            conversationId={conversationId}
            onConversationCreated={(newId) => {
              setConversationId(newId);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;

{
  /* <Prompt
            conversationId={conversationId}
            onConversationCreated={(newId) => setConversationId(newId)}
          /> */
}
