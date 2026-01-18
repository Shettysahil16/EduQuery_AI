import React from "react";
//import userActiveImage from "../../assets/green_dot-modified.png";
import { useSelector, useDispatch } from "react-redux";
import {
  selectedConversation,
  clearSelectedConversation,
} from "../../store/conversationSlice";
import { FaArrowLeft } from "react-icons/fa6";
import { useSocket } from "../../Context/Socket/useSocket";

const TopUserInfo = () => {
  const friend = useSelector(selectedConversation);
  const dispatch = useDispatch(clearSelectedConversation);

  const { onlineUsers, typingUsers } = useSocket();

  const isOnline = onlineUsers.includes(friend?._id);
  const isTyping = typingUsers.has(friend?._id);

  return (
    <div className="bg-slate-900 h-16 w-full flex items-center gap-4 md:px-4 border-b-2 border-slate-600">
      <div className="pl-2 md:hidden">
        <FaArrowLeft
          className="h-7 w-7 text-white"
          onClick={() => dispatch(clearSelectedConversation())}
        />
      </div>
      <div className="flex">
        <div className="h-12 w-12 bg-Septenary flex justify-center items-center rounded-full relative border">
          <p className="text-2xl font-medium capitalize">
            {friend?.fullName.charAt(0)}
          </p>
        </div>
      </div>
      <div className="h-full flex flex-col justify-center">
        <div className="text-xl font-medium capitalize">{friend?.fullName}</div>
        <div className="">
          {isTyping && isOnline && (
            <div className="text-sm font-medium text-green-400">
              {" "}
              typing...{" "}
            </div>
          )}
          {isOnline && !isTyping && <div className="text-sm">online</div>}
        </div>
      </div>
    </div>
  );
};

export default TopUserInfo;

{
  /* 

  <div className="absolute right-1 top-0">
            <img src={userActiveImage} alt="image" className="h-auto w-2" />
  </div>
  
*/
}
