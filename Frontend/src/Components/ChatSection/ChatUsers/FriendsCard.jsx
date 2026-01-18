import React from "react";
import { useSelector } from "react-redux";
import { selectedConversation } from "../../../store/conversationSlice";
import { useSocket } from "../../../Context/Socket/useSocket";

const FriendsCard = ({ loading, friend }) => {
  const lastMessage = friend?.lastMessage?.message;
  //console.log("last message", lastMessage);

  const conversationId = useSelector(selectedConversation);

  const isSelected = conversationId?._id === friend?._id;

  const { onlineUsers, typingUsers } = useSocket();

  const isOnline = onlineUsers.includes(friend?._id);
  const isTyping = !isSelected && typingUsers.has(friend?._id);

  function calculateMessageDate(dateString) {
    if (!dateString) return;

    const messageDate = new Date(dateString);
    const now = new Date();

    const isSameDay = messageDate.toDateString() === now.toDateString();

    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
    const isYesterday = messageDate.toDateString() === yesterday.toDateString();

    if (isSameDay) {
      return messageDate.toLocaleTimeString("en-us", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    } else if (isYesterday) {
      return "Yesterday";
    } else {
      const day = String(messageDate.getDate()).padStart(2, "0");
      const month = String(messageDate.getMonth() + 1).padStart(2, "0");
      const year = messageDate.getFullYear();

      return `${day}-${month}-${year}`;
    }
  }

  return (
    <>
      {loading ? (
        <div className="bg-slate-900 shrink-0 h-32 md:h-38 w-full flex gap-4 rounded p-2 animate-pulse">
          <div className="flex items-center justify-center">
            <div className="h-22 w-21 md:h-26 md:w-25 rounded-full overflow-hidden bg-slate-700"></div>
          </div>
          <div className="w-full flex flex-col gap-4 mt-6">
            <p className="bg-slate-700 py-2 md:py-3 w-full rounded-full"></p>
            <p className="bg-slate-700 py-2 md:py-2 w-20 rounded-full"></p>
          </div>
        </div>
      ) : (
        <div
          className={`min-h-26 sm:min-h-28 shrink-0 w-full flex gap-2 md:gap-1 xl:gap-2 rounded py-2 transition-all duration-100 group hover:bg-Nonary cursor-pointer relative ${
            isSelected ? "bg-Nonary" : ""
          }`}
        >
          <div className="flex items-center justify-center">
            <div className="relative pl-1">
              <div
                className={`relative h-22 w-21 md:h-9 md:w-9 lg:h-12 lg:w-11 xl:h-22 xl:w-21 rounded-full flex justify-center items-center border-3 group-hover:border-white ${
                  isSelected ? "border-white" : "border-black"
                }`}
              >
                {isOnline && (
                  <div className="absolute z-50 right-2 top-0 md:right-0 md:-top-0.5 lg:right-0 lg:top-0 xl:right-1 xl:top-1 bg-green-500 h-3 w-3 md:h-2 md:w-2 xl:h-3 xl:w-3 rounded-full"></div>
                )}
                <p
                  className={`text-3xl md:text-lg lg:text-xl xl:text-4xl font-semibold group-hover:text-white capitalize ${
                    isSelected ? "text-QuaternaryText" : "text-SenaryText"
                  }`}
                >
                  {friend?.fullName?.charAt(0)}
                </p>
                
              </div>
            </div>
          </div>
          <div className="h-22 w-full flex flex-col gap-1 md:gap-0 pt-3 md:pt-8 lg:pt-6 xl:pt-4 pr-1 text-black">
            <div className="w-full grid grid-cols-[1fr_auto] items-center gap-2 min-w-0">
              {/* Name */}
              <div
                className={`min-w-0 truncate text-2xl md:text-xs lg:text-lg font-medium group-hover:text-white ${
                  isSelected ? "text-QuaternaryText" : "text-SenaryText"
                }`}
              >
                {friend?.fullName}
              </div>

              {/* Date */}
              <div className="text-sm md:text-[10px] lg:text-sm xl:text-md font-medium text-slate-700 whitespace-nowrap">
                {calculateMessageDate(friend?.lastMessage?.createdAt)}
              </div>
            </div>

            <div className="min-w-0 grid grid-cols-[1fr_auto] mt-2">
              {!isTyping && (
                <p
                  className={`min-w-0 truncate font-medium text-sm md:text-xs lg:text-sm group-hover:text-white ${
                    isSelected ? "text-QuaternaryText" : "text-SenaryText"
                  }`}
                >
                  {lastMessage}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FriendsCard;

{
  /* 
  
   <div
            className={`w-full min-w-0 flex flex-col lg:gap-0 xl:gap-1 py-2 pr-2 ${
              isSelected ? "text-QuaternaryText" : "text-QuinaryText"
            }`}
          >
            <div
              className={`w-full text-sm sm:text-base md:text-lg flex items-center gap-6 xl:gap-8 font-medium group-hover:text-white ${
                isSelected ? "text-QuaternaryText" : "text-SenaryText"
              }`}
            >
              <p className="truncate max-w-[70%]">{friend?.fullName}</p>
              <p className="ml-auto text-xs whitespace-nowrap">
                {calculateMessageDate(friend?.lastMessage?.createdAt)}
              </p>
            </div>
            <div>
              {isTyping && (
                <p className="bg-green-500 text-sm font-medium text-green-400">
                  {" "}
                  typing...{" "}
                </p>
              )}
              {!isTyping && (
                <p className="text-sm md:text-xs lg:text-sm truncate">
                  {lastMessage}
                </p>
              )}
            </div>
          </div>





          
  
  */
}
