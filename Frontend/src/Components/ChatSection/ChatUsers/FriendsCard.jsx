import React from "react";
import { useSelector } from "react-redux";
import { selectedConversation } from "../../../store/conversationSlice";
import { useSocket } from "../../../Context/Socket/useSocket";

const FriendsCard = ({ loading, friend }) => {
  const conversationId = useSelector(selectedConversation)
  const isSelected = conversationId?._id === friend?._id
  
  const { onlineUsers } = useSocket();

  const isOnline = onlineUsers.includes(friend?._id);
  
  return (
    <>
      {loading ? (
        <div className="bg-slate-200 shrink-0 h-32 md:h-38 w-full flex gap-4 rounded p-2 animate-pulse">
          <div className="flex items-center justify-center">
            <div className="h-22 w-21 md:h-26 md:w-25 rounded-full flex justify-center items-center overflow-hidden bg-slate-300">
              
            </div>
          </div>
          <div className="w-full flex flex-col gap-4 text-QuinaryText group-hover:text-white mt-6">
            <p className="bg-slate-300 py-2 md:py-3 w-full rounded-full"></p>
            <p className="bg-slate-300 py-2 md:py-2 w-20 rounded-full"></p>
          </div>
        </div>
      ) : (
        <div className={`h-32 md:h-38 shrink-0 w-full flex gap-2 md:gap-2 xl:gap-4 rounded p-2 transition-all duration-100 group hover:bg-Nonary cursor-pointer ${isSelected ? "bg-Nonary" : ""}`}>
          <div className="flex items-center justify-center">
            <div className="relative">
              <div className={`h-22 w-21 md:h-13 md:w-12 lg:h-20 lg:w-19 xl:h-26 xl:w-25 rounded-full flex justify-center items-center overflow-hidden border-3 group-hover:border-white ${isSelected ? "border-white" : "border-black"}`}>
              
              <p className={`text-3xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold group-hover:text-white capitalize ${isSelected ? "text-QuaternaryText" : "text-SenaryText"}`}>
                {friend?.fullName?.charAt(0)}
              </p>
              {
                isOnline && (
                  <div className="absolute z-50 right-4 top-1 bg-green-500 h-3 w-3 rounded-md"></div>
                )
              }
            </div>
            </div>
          </div>
          <div className={`min-w-0 flex flex-col mt-5 md:mt-11 xl:mt-6 ${isSelected ? "text-QuaternaryText" : "text-QuinaryText"}`}>
            <p className={`w-full text-xl md:text-xl lg:text-lg xl:text-2xl font-medium truncate group-hover:text-white ${isSelected ? "text-QuaternaryText" : "text-SenaryText"}`}>{friend?.fullName}</p>
            <p className={`md:text-[12px] lg:text-[14px] font-medium group-hover:text-white ${isSelected ? "text-QuaternaryText" : "text-QuinaryText"}`}>online</p>
          </div>
        </div>
      )}
    </>
  );
};

export default FriendsCard;
