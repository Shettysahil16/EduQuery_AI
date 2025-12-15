import React from "react";
import SendIcon from '../assets/icons/message_send_icon.svg?react'

const Prompt = () => {
  return (
    <div className="h-14 bg-Octonary w-full flex justify-center items-center text-white rounded-full px-4">
      <input type="text" className="h-full w-full rounded-full outline-none px-2" placeholder="Ask anything" />
      <SendIcon className="w-8 h-auto cursor-pointer fill-Quinary"/>
    </div>
  );
};

export default Prompt;
