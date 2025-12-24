import React from "react";
import FriendsCard from "./FriendsCard";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useState } from "react";
import summaryApi from "../../../common";
import FriendsLoader from "../../../assets/loaders/FriendsLoader.svg?react";

const ChatUsers = () => {
  const [loading, setLoading] = useState(false);
  const [friendsData, setFriendsData] = useState([]);
  const loadingCards = Array(4).fill(null);

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

  return (
    <>
      
      <div className="h-full flex flex-col gap-4 overflow-hidden">
        <div className="text-5xl font-medium">Friends</div>
        <div>
          <div className="bg-Nonary rounded-md">
            <input
              type="text"
              className="w-full h-12 border-3 border-Primary rounded-md p-2 outline-none text-white placeholder-white font-medium"
              placeholder="🔍 Search"
            />
          </div>
          <div className="h-0.75 bg-Secondary mt-4 rounded-full" />
        </div>

        <div className="flex flex-1 flex-col gap-1 overflow-y-auto pr-1 scrollbar-custom">
          {
            loading ? (
              loadingCards.map((_,index) => {
            return <FriendsCard loading={loading} key={index} />;
          })
            )
            :
            (
              friendsData.map((friend) => {
            return <FriendsCard loading={loading} friend={friend} key={friend?._id} />;
          })
            )
          }
        </div>
        
      </div>
    </>
  );
};

export default ChatUsers;
