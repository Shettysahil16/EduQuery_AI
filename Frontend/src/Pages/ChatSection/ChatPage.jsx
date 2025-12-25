import React from "react";
import InputBar from "../../Components/ChatSection/InputBar";
import TopUserInfo from "../../Components/ChatSection/TopUserInfo";
import ChatCard from "../../Components/ChatSection/ChatCard";
import { useSelector } from "react-redux";
import { selectedConversation } from "../../store/conversationSlice";
import EmptyChat from "../../Components/ChatSection/EmptyChat";

const ChatPage = () => {
  const selectedFriend = useSelector(selectedConversation);
  return (
    <>
      {selectedFriend === null && <EmptyChat />}

      {selectedFriend !== null && (
        <div className="bg-Septenary h-screen flex flex-col overflow-hidden text-white">
          <TopUserInfo />

          <div className="flex-1 overflow-y-auto px-4 py-4 scrollbar-custom">
            <div className="min-h-full flex flex-col gap-4 justify-end">
              <ChatCard />
              <ChatCard />
              <ChatCard />
              <ChatCard />
            </div>
          </div>

          <div className="h-16 px-2 pb-2 pt-1 bg-Septenary">
            <InputBar />
          </div>
        </div>
      )}
    </>
  );
};

export default ChatPage;
