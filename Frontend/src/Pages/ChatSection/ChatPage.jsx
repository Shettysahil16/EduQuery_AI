import React, { useEffect, useRef, useState } from "react";
import InputBar from "../../Components/ChatSection/InputBar";
import TopUserInfo from "../../Components/ChatSection/TopUserInfo";
import ChatCard from "../../Components/ChatSection/ChatCard";
import { useSelector, useDispatch } from "react-redux";
import { selectedConversation } from "../../store/conversationSlice";
import { selectMessages, setMessages } from "../../store/messageSlice";
import EmptyChat from "../../Components/ChatSection/EmptyChat";
import MobileChatSection from "../../Components/MobileChatSection/ChatUsers";
import { toast } from "react-toastify";
import summaryApi from "../../common";
import MessageLoader from "../../assets/loaders/chats_loading.svg?react";
import NoChatIcon from "../../assets/icons/no_chat.svg?react";
import useGetSocketMessage from "../../Context/GetSocketMessage/useGetSocketMessage";

const ChatPage = () => {
  const [conversationId, setConversationId] = useState(null);
  const selectedFriend = useSelector(selectedConversation);

  // console.log("selecte user conversation id", conversationId);
  // console.log("conversation id", conversationId);

  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  const dispatch = useDispatch();
  //console.log("selectedFriend", selectedFriend);

  const messages = useSelector(selectMessages(conversationId));
  //console.log("messages in this conversation", messages);

  const fetchMessages = async () => {
    if (!selectedFriend?._id) return;

    setLoading(true);
    try {
      const response = await fetch(
        `${summaryApi.getMessage.url}/${selectedFriend?._id}`,
        {
          method: summaryApi.getMessage.method,
          credentials: "include",
          headers: {
            "content-type": "application/json",
          },
        }
      );
      //console.log("messages", response);
      const result = await response.json();
      //console.log("result", result);
      //console.log("messages of result data", result.data);

      if (result.success && result.conversationId) {
        setConversationId(result.conversationId);
        dispatch(setMessages(result.data || []));
      }

      if (result.success) {
        //console.log(result);
        const convId = result.conversationId;

        if (!convId) return;

        setConversationId(convId);
        dispatch(setMessages(result.data));
      }
    } catch (error) {
      toast.error("An error occurred while fetching messages.");
      console.log("error in chatPage page", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setConversationId(null);
    fetchMessages();
  }, [selectedFriend?._id]);

  useEffect(() => {
    if (messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
    }
  }, [messages]);

  function calculateConversationDate(dateString) {
    if (!dateString) return;

    const messageDate = new Date(dateString);
    const now = new Date();

    const isSameDay = messageDate.toDateString() === now.toDateString();

    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
    const isYesterday = messageDate.toDateString() === yesterday.toDateString();

    if (isSameDay) {
      return "Today";
    } else if (isYesterday) {
      return "Yesterday";
    } else {
      const day = String(messageDate.getDate()).padStart(2, "0");
      const month = String(messageDate.getMonth() + 1).padStart(2, "0");
      const year = messageDate.getFullYear();

      return `${day}-${month}-${year}`;
    }
  }

  let lastRenderedDate = null;

  useGetSocketMessage();

  return (
    <>
      {selectedFriend === null && (
        <>
          <div className="hidden md:flex h-full w-full">
            <EmptyChat />
          </div>

          <div className="flex h-full  min-h-0 w-full md:hidden">
            <MobileChatSection />
          </div>
        </>
      )}

      {selectedFriend !== null && (
        <div className="bg-Septenary h-screen flex flex-col overflow-hidden text-white">
          <TopUserInfo />

          <div className="flex-1 overflow-y-auto px-4 py-4 scrollbar-custom relative">
            <div className="min-h-full flex flex-col gap-4">
              {loading ? (
                <div className="absolute inset-0 flex justify-center items-center">
                  <MessageLoader />
                </div>
              ) : !messages || messages.length === 0 ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                  <NoChatIcon className="h-auto w-50" />
                  <p className="text-xl -mt-5">No Conversation yet</p>
                </div>
              ) : (
                messages.map((message, index) => {
                  const currentDateLabel = calculateConversationDate(message.createdAt);
                  const showDateSeparator =
                    currentDateLabel !== lastRenderedDate;

                  lastRenderedDate = currentDateLabel;
                  return (
                    <div key={index}>
                      <ChatCard message={message} isDateChanged={showDateSeparator} showDate={currentDateLabel}/>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <div className="h-16 px-2 pb-2 pt-1 bg-Septenary">
            <InputBar conversationId={conversationId}/>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatPage;
