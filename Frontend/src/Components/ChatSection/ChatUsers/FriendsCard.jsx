import React from "react";

const FriendsCard = () => {
  return (
    <div className="h-38 shrink-0 w-full bg-Nonary text-white flex gap-4 rounded p-2">
      <div className="flex items-center justify-center">
        <div className="h-26 w-25 rounded-full flex justify-center items-center overflow-hidden border-3 border-white">
          <p className="text-4xl font-semibold text-white">D</p>
        </div>
      </div>
      <div className="flex flex-col text-white mt-6">
        <p className="text-2xl font-medium">Developer</p>
        <p className="text-base">online</p>
      </div>
    </div>
  );
};

export default FriendsCard;
