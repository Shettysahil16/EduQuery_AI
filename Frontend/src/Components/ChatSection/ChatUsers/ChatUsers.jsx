import React from "react";
import FriendsCard from "./FriendsCard";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useState } from "react";
import summaryApi from "../../../common";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedConversation } from "../../../store/conversationSlice";
import { allSortedUsers, setAllSortedUsers } from "../../../store/allUsersSlice";
import { Link } from "react-router-dom";

const ChatUsers = () => {
  const [loading, setLoading] = useState(false);
  const loadingCards = Array(4).fill(null);

  const dispatch = useDispatch();
  const sortedUsers = useSelector(allSortedUsers);
  //console.log("sortedUsers", sortedUsers);
  

  const fetchChatUsers = async () => {
    try {
      setLoading(true);
      const userResponse = await fetch(summaryApi.chatFriends.url, {
        method: summaryApi.chatFriends.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      });

      const friends = await userResponse.json();
      //console.log("friends in chatUsers", friends);

      const convResponse = await fetch(summaryApi.getConversations.url, {
        method: summaryApi.getConversations.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      });

      const conversations = await convResponse.json();
      //console.log("conversations", conversations);

      if (friends.success) {
        const allUsers = friends.data || [];
        const allConvData = conversations.data || [];
        //console.log("allUsers", allUsers);
        //console.log("allConvData", allConvData);

        const mergedList = allUsers.map((user) => {
          //console.log("inside allUsers", user._id);

          const conv = allConvData.find((conversation) =>
            conversation.participants.some(
              (participant) => participant._id === user._id
            )
          );
          return conv
            ? {
                ...user,
                conversationId: conv._id,
                lastMessage: conv.lastMessage,
              }
            : user;
        });

        //console.log("mergedList", mergedList);

        const sortedList = [...mergedList].sort((a, b) => {
          const aDate = a?.lastMessage?.createdAt ? new Date(a.lastMessage.createdAt) : 0;
          const bDate = b?.lastMessage?.createdAt ? new Date(b.lastMessage.createdAt) : 0;

          return bDate - aDate
        })
    
        dispatch(setAllSortedUsers(sortedList));
      }

      if (friends.error) {
        toast.error("An error occurred while fetching friends.");
      }
    } catch (error) {
      toast.error("An error occurred while fetching friends.");
      console.log("error in fetching chat friends", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchChatUsers();
  }, []);

  const handleSetSelectedConversation = (friendInfo) => {
    //console.log("fine", friendInfo);
    dispatch(setSelectedConversation(friendInfo));
  };

  return (
    <>
      <div className="h-full flex flex-col gap-4 overflow-hidden">
        <div className="text-5xl font-medium px-2">Friends</div>
        <div className="px-2">
          <div className="bg-Nonary rounded-md">
            <input
              type="text"
              className="w-full h-12 border-3 border-Primary rounded-md p-2 outline-none text-white placeholder-white font-medium"
              placeholder="🔍 Search"
            />
          </div>
          <div className="h-0.75 bg-Secondary mt-4 rounded-full" />
        </div>

        <div className="flex flex-1 flex-col gap-1 overflow-y-auto scrollbar-custom">
          {loading
            ? loadingCards.map((_, index) => {
                return <FriendsCard loading={loading} key={index} />;
              })
            : sortedUsers.map((friend) => {
                return (
                  <Link to={'chats'}
                    key={friend?._id}
                    onClick={() => handleSetSelectedConversation(friend)}
                  >
                    <FriendsCard loading={loading} friend={friend} />
                  </Link>
                );
              })}
        </div>
      </div>
    </>
  );
};

export default ChatUsers;

// friendsData.map((friend) => {
//               return <FriendsCard loading={loading} friend={friend} key={friend?._id} />;
//               })
