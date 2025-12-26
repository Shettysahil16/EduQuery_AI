import React from "react";
import EmptyChatIcon from "../../assets/icons/empty_chat.svg?react";

const EmptyChat = () => {
  return (
    <div className="h-full w-full bg-Septenary text-slate-400 flex justify-center items-center">
      <div className="flex flex-col items-center gap-2">
        <div>
          <EmptyChatIcon className="h-auto w-20" />
        </div>

        <div className="mt-4 flex flex-col gap-4">
          <div className="text-slate-300 text-4xl font-medium">
            EduQuery Chat for Windows
          </div>

          <div>
            <div>
              Send and receive messages without keeping your phone online.
            </div>

            <div className="text-center">Select a chat to start conversation.</div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyChat;
