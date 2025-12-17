import React from "react";
import FriendsCard from "./FriendsCard";

const ChatUsers = () => {
  return (
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

      <div className="flex flex-1 flex-col gap-2 overflow-y-auto pr-1 scrollbar-custom">
          <FriendsCard />
          <FriendsCard />
          <FriendsCard />
          <FriendsCard />
      </div>
    </div>
  );
};

export default ChatUsers;
