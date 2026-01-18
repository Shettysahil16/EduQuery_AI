import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/userSlice";
import { LuClock3 } from "react-icons/lu";
import MessageSentIcon from '../../assets/icons/tick-svgrepo-com.svg?react'
import MessageDeliveredIcon from '../../assets/icons/seen-svgrepo-com.svg?react'

const ChatCard = ({ message, isDateChanged, showDate }) => {
  //console.log("message", message);

  const isMessageSent = message.status === 'sent'
  //const isMessageDelivered = message.status === 'delivered'
  
  const loggedUser = useSelector(selectUser);
  const messageSenderId = message?.senderId;
  const loggedUserId = loggedUser?._id;

  const isSender = loggedUserId === messageSenderId;

  const messageTime = new Date(message.createdAt).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  let statusIcon = null;
  if (isSender) {
    if (message.status === "sent") {
      statusIcon = <MessageSentIcon className="h-auto w-4" />;
    } else if (message.status === "delivered") {
      statusIcon = <MessageDeliveredIcon className="h-auto w-4" />;
    }
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        {isDateChanged && (
          <div className="w-fit mx-auto my-4 text-PrimaryText bg-Denary py-1 px-3 rounded-md ">
            {showDate}
          </div>
        )}
        <div
          className={`${isSender ? "bg-Primary" : "bg-Secondary"} ${
            isSender ? "ml-auto" : ""
          } flex gap-2 max-w-[50%] w-fit rounded px-1`}
        >
          <div className="flex flex-wrap items-end gap-x-2">

            <div className="wrap-break-word whitespace-pre-wrap py-2">
              {message?.message}
            </div>

            <div className="flex items-center justify-center gap-1">
              {isMessageSent && <div className="text-xs whitespace-nowrap self-end pb-1">{messageTime}</div>}

            <div className="text-xs whitespace-nowrap self-end pb-1">
              {isSender && (
              <div className="text-xs whitespace-nowrap self-end pb-1">{statusIcon}</div>
            )}
            </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatCard;
