import React from "react";
import FriendsCard from "./FriendsCard";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useState } from "react";
import summaryApi from "../../../common";
import { useDispatch } from "react-redux";
import { setSelectedConversation } from "../../../store/conversationSlice";

const ChatUsers = () => {
  const [loading, setLoading] = useState(false);
  const [friendsData, setFriendsData] = useState([]);
  const loadingCards = Array(4).fill(null);

  const dispatch = useDispatch();

  const fetchChatUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(summaryApi.chatFriends.url, {
        method: summaryApi.chatFriends.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      });

      const friends = await response.json();

      if (friends.success) {
        setFriendsData(friends.data);
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
    dispatch(setSelectedConversation(friendInfo))
  }

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
          {
            loading ? 
            (
              loadingCards.map((_,index) => {
              return <FriendsCard loading={loading} key={index} />;
              })
            )
            :
            (
              friendsData.map((friend) => {
              return(
                <div key={friend?._id} onClick={() => handleSetSelectedConversation(friend)}>
                  <FriendsCard loading={loading} friend={friend}/>
                </div>
              )
              })
            )
          }
        </div> 
      </div>
    </>
  );
};

export default ChatUsers;


// friendsData.map((friend) => {
//               return <FriendsCard loading={loading} friend={friend} key={friend?._id} />;
//               })