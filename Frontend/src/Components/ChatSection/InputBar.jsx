import React from "react";
import MessageSendIcon from '../../assets/icons/message_send_icon.svg?react'

const InputBar = () => {
  return (
  <div className="bg-Octonary h-full flex rounded-sm shadow-md">
    <div className="flex h-full w-full p-1">
      <input type="text" className="w-full h-full outline-none" />
    </div>
      <div className="flex items-center pr-2">
        <MessageSendIcon className="w-8 h-auto cursor-pointer fill-Quinary"/>
      </div>
  </div>
)
};

export default InputBar;
