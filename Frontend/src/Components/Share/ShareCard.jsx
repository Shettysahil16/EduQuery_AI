import React, { useEffect, useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import FriendsCard from "./FriendsCard";
import summaryApi from "../../common";
import { toast } from "react-toastify";
import { addMessage, updateMessageStatus } from "../../store/messageSlice";
import { selectUser } from "../../store/userSlice";

const ShareCard = ({ onClose, message, userQuestion }) => {
  console.log("message inside shareCard", message);

  const [loading, setLoading] = useState(false);
  //const [conversationId, setConversationId] = useState([]);
  const [allFriends, setAllFriends] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedConversationIds, setSelectedConversationIds] = useState([]);
  const showSendButton = selectedIds.length !== 0;
  const [searchTerm, setSearchTerm] = useState("");

  const capitalizeFirstLetter = (text) => {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const formattedQuestion = capitalizeFirstLetter(userQuestion || "");
  const shareText = userQuestion
    ? `# **Q . ${formattedQuestion}**\n\n${message}`
    : message;

  const dispatch = useDispatch();
  const loggedUser = useSelector(selectUser);

  const fetchChatFriends = async () => {
    setLoading(true);
    try {
      const response = await fetch(summaryApi.chatFriends.url, {
        method: summaryApi.chatFriends.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      });
      const friends = await response.json();
      setAllFriends(friends.data);
      setLoading(false);
      //console.log("friends in chatUsers", friends.data);
    } catch (error) {
      console.log("error in fetching share friends", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchChatFriends();
  }, []);
  //console.log("conversationId", conversationId);

  const handleSelectedFriend = (id, conversationId) => {
    setSelectedIds((prev) => {
      const set = new Set(prev);

      if (set.has(id)) {
        set.delete(id);
      } else {
        set.add(id);
      }

      return Array.from(set);
    });

    setSelectedConversationIds((prev) => {
      const set = new Set(prev);

      if (set.has(conversationId)) {
        set.delete(conversationId);
      } else {
        set.add(conversationId);
      }

      return Array.from(set);
    });
  };
  //console.log("conversationsIds", selectedConversationIds);
  //console.log("selectedIds", selectedIds);

  const handleSendMessage = async () => {
    if (!selectedIds.length) return;

    const tempMap = {};

    selectedConversationIds.forEach((convId, index) => {
      const tempId = Date.now() + index;
      tempMap[convId] = tempId;

      dispatch(
        addMessage({
          _id: tempId,
          conversationId: convId,
          senderId: loggedUser._id,
          receiverId: selectedIds[index],
          message: message,
          status: "sending",
          createdAt: new Date().toISOString(),
        }),
      );
    });
    try {
      setLoading(true);
      const response = await fetch(summaryApi.sendMessage.url, {
        method: summaryApi.sendMessage.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          message: shareText,
          receiverIds: selectedIds,
        }),
      });

      const dataResponse = await response.json();
      const messages = dataResponse.data;
      onClose();

      messages.forEach((msg) => {
        dispatch(
          updateMessageStatus({
            convId: msg.conversationId,
            tempId: tempMap[msg.conversationId],
            messageId: msg._id,
            updates: {
              ...msg,
              status: "sent",
            },
          }),
        );
      });
    } catch (error) {
      toast.error("An error occurred while sending message.");
      console.log("error in ShareCard component", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = allFriends.filter((friend) =>
    friend?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="bg-slate-800/30 backdrop-blur-xs h-full w-full fixed inset-0 z-10 flex justify-center items-center">
      <div className="bg-Primary w-full h-full max-w-xl max-h-[80%] rounded-4xl shadow-md flex flex-col">
        <div className="w-fit ml-auto pt-4 px-2">
          <MdOutlineCancel
            onClick={onClose}
            className="text-3xl hover:text-red-500 cursor-pointer"
          />
        </div>
        <div className="py-4 px-2 text-white">
          <input
            type="text"
            placeholder="search friend here..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full outline-none border-Tertiary border-3 rounded-md py-2 px-2 placeholder-white"
          />
        </div>
        <div className="px-2 flex-1">
          <div className="flex flex-wrap gap-4">
            {filteredUsers.map((friend, index) => {
              return (
                <div
                  key={index}
                  onClick={() =>
                    handleSelectedFriend(friend._id, friend.conversationId)
                  }
                >
                  <FriendsCard friend={friend} selectedIds={selectedIds} />
                </div>
              );
            })}
          </div>
        </div>
        {showSendButton && (
          <div className="px-4 pb-6">
            <div
              onClick={handleSendMessage}
              className="bg-blue-500 py-3 text-center rounded font-medium cursor-pointer text-lg"
            >
              Send
            </div>
          </div>
        )}

        {!loading && filteredUsers.length === 0 && (
          <div className="h-full w-full flex justify-center text-white mt-4 font-medium">
            No friends found
          </div>
        )}
      </div>
    </div>
  );
};

export default ShareCard;
