import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import summaryApi from "../../common";
import { useEffect } from "react";
import Prompt from "../../Components/Prompt";
import HistoryPageCard from "./HistoryPageCard";
import { useDispatch, useSelector } from "react-redux";
import { selectMessages, setMessages } from "../../store/messageSlice";

const HistoryPage = () => {
  const { conversationId } = useParams();
  //console.log("conversationId", conversationId);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const messages = useSelector(selectMessages(conversationId));
  const messagesEndRef = useRef(null);

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
        }
      );

      const result = await response.json();
      dispatch(setMessages(result.data));
    } catch (error) {
      console.log("error fetching messages", error);
    } finally {
      setLoading(false);
    }
  };

  fetchAiMessages();
}, [conversationId]); // ❌ remove dispatch from deps



  useEffect(() => {
      if (messages.length > 0) {
        messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
      }
    }, [messages]);

  return (
    <div className="bg-Septenary h-screen w-full text-white flex flex-col overflow-hidden">

  
  <div className="flex-1 overflow-y-auto scrollbar-custom">
    <div className="mx-auto w-full max-w-[60%] px-2  mb-16 flex flex-col gap-4">
      {
        messages.map((message, index) => {
          const previousUserMessage = message.role === "ai" && messages[index - 1]?.role === "user" ? messages[index - 1] : null;
          
          return(
            <HistoryPageCard message={message} key={message._id} loading={loading} userQuestion={previousUserMessage}/>
          )
        })
      }
      <div ref={messagesEndRef} />
    </div>
  </div>

  
  <div className="h-16 w-full shrink-0 flex justify-center items-center pb-8 z-10">
    <div className="w-full max-w-[60%] px-2">
      <Prompt conversationId={conversationId}/>
    </div>
  </div>

</div>

  );
};

export default HistoryPage;
