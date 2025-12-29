import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/userSlice";

const ChatCard = ({ message }) => {
  
  const loggedUser = useSelector(selectUser);
  const messageSenderId = message?.senderId;
  const loggedUserId = loggedUser?._id;

  const isSender = loggedUserId === messageSenderId

  return (
    <div className="flex flex-col gap-4">
      <div className={`${isSender ? "bg-Primary" : "bg-Secondary"} max-w-[50%] w-fit ${isSender ? "ml-auto" : ""} rounded p-2`}>
          {message?.message}
      </div>
    </div>
  );
};

export default ChatCard;